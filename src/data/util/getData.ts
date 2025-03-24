import Papa, { ParseResult } from 'papaparse';

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

export interface IReminderData {
  id: number;
  student: string;
  study: string;
  extra: string;
  sleep: string;
  social: string;
  physical: string;
  gpa: string;
  stress: string;
}

const stressLevelMap: Record<string, number> = {
  Low: 1,
  Moderate: 2,
  High: 3,
};

export const parseCSV = async (csvUrl: string, index?: number): Promise<IReminderData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<CSVRow>(csvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CSVRow>) => {
        const formattedData: IReminderData[] = results.data.map((row, idx) => ({
          id: idx + 1,
          student: row.Student_ID,
          study: row.Study_Hours_Per_Day,
          extra: row.Extracurricular_Hours_Per_Day,
          sleep: row.Sleep_Hours_Per_Day,
          social: row.Social_Hours_Per_Day,
          physical: row.Physical_Activity_Hours_Per_Day,
          gpa: row.GPA,
          stress: row.Stress_Level,
        }));

        if (index !== undefined) {
          const selectedStudent = formattedData.find((student) => student.id === index);
          resolve(selectedStudent ? [selectedStudent] : []);
        } else {
          resolve(formattedData);
        }
      },
      error: (error) => reject(error),
    });
  });
};

export const calculateAverages = (data: IReminderData[]) => {
  const averageGPA = data.reduce((sum, row) => sum + parseFloat(row.gpa), 0) / data.length;
  const averageStudyHours = data.reduce((sum, row) => sum + parseFloat(row.study), 0) / data.length;
  const averageStressLevel =
    data.reduce((sum, row) => sum + stressLevelMap[row.stress], 0) / data.length;

  return {
    averageGPA: parseFloat(averageGPA.toFixed(2)),
    averageStudyHours: parseFloat(averageStudyHours.toFixed(2)),
    averageStressLevel: parseFloat(averageStressLevel.toFixed(2)),
  };
};
