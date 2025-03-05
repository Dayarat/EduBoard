import React, { useState, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import ReminderTable from '../sections/dashboard/ReminderTable';
import { IReminderData } from '../sections/dashboard/ReminderTable';
import { factors as initialFactors } from 'data/dashboard/factors';

interface CSVRow {
  Student_ID: string;
  Study_Hours_Per_Day: string;
  Extracurricular_Hours_Per_Day: string;
  Sleep_Hours_Per_Day: string;
  Social_Hours_Per_Day: string;
  Physical_Activity_Hours_Per_Day: string;
  GPA: string;
  Stress_Level: string;
}

interface CsvViewerProps {
  index?: number;
  onFactorsChange?: (updatedFactors: typeof initialFactors) => void;
}

const CsvViewer: React.FC<CsvViewerProps> = ({ index, onFactorsChange }) => {
  const [data, setData] = useState<IReminderData[]>([]);
  const stressLevelMap: Record<string, number> = {
    Low: 1,
    Moderate: 2,
    High: 3,
  };

  useEffect(() => {
    Papa.parse<CSVRow>('/student_lifestyle_dataset.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CSVRow>) => {
        // Map CSV data to IReminderData format
        const formattedData: IReminderData[] = results.data.map((row, index) => ({
          id: index + 1,
          student: row.Student_ID,
          study: row.Study_Hours_Per_Day,
          extra: row.Extracurricular_Hours_Per_Day,
          sleep: row.Sleep_Hours_Per_Day,
          social: row.Social_Hours_Per_Day,
          physical: row.Physical_Activity_Hours_Per_Day,
          gpa: row.GPA,
          stress: row.Stress_Level,
        }));

        setData(formattedData);

        if (index !== undefined) {
          const selectedStudent = formattedData.find((student) => student.id === index);

          if (selectedStudent) {
            const updatedFactors = [...initialFactors];
            updatedFactors[0].value = parseFloat(selectedStudent.gpa);
            updatedFactors[3].value = parseFloat(selectedStudent.study);
            updatedFactors[1].value = stressLevelMap[selectedStudent.stress];

            if (onFactorsChange) onFactorsChange(updatedFactors);
          }
        } else {
          const averageGPA =
            results.data.reduce((sum, row) => sum + parseFloat(row.GPA), 0) / results.data.length;
          const averageStudyHours =
            results.data.reduce((sum, row) => sum + parseFloat(row.Study_Hours_Per_Day), 0) /
            results.data.length;

          const averageStressLevel =
            results.data.reduce((sum, row) => sum + stressLevelMap[row.Stress_Level], 0) /
            results.data.length;

          const updatedFactors = [...initialFactors];
          updatedFactors[0].value = parseFloat(averageGPA.toFixed(2));
          updatedFactors[3].value = parseFloat(averageStudyHours.toFixed(2));
          updatedFactors[1].value = parseFloat(averageStressLevel.toFixed(2));

          if (onFactorsChange) onFactorsChange(updatedFactors);
        }
      },
    });
  }, [index, onFactorsChange]);
  const filteredData = index !== undefined ? data.filter((student) => student.id === index) : data;

  return (
    <div>
      <h1>{index ? `Student Data for ID ${index}` : 'Student Data Table'}</h1>
      <ReminderTable rows={filteredData} />
    </div>
  );
};

export default CsvViewer;
