// import { factors as initialFactors } from './Factors';
import { IFactor } from 'types/types';
import Papa from 'papaparse';

// Define a type for the dataset
interface StudentData {
  Student_ID: number;
  Study_Hours_Per_Day: number;
  Extracurricular_Hours_Per_Day: number;
  Sleep_Hours_Per_Day: number;
  Social_Hours_Per_Day: number;
  Physical_Activity_Hours_Per_Day: number;
  GPA: number;
  Stress_Level: 'Low' | 'Moderate' | 'High';
}

// Utility function to parse CSV file
const parseCSV = (csvFilePath: string): Promise<StudentData[]> => {
  return new Promise((resolve, reject) => {
    fetch(csvFilePath)
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<StudentData>(csvText, {
          header: true,
          complete: (results) => {
            resolve(results.data);
          },
          error: (error) => reject(error),
        });
      });
  });
};

// Function to calculate factor values from dataset
const calculateFactors = (data: any[]): IFactor[] => {
  const totalStudents = data.length;
  const averageGPA =
    data.reduce((acc, student) => acc + parseFloat(student.GPA), 0) / totalStudents;
  const stressLevels = { Low: 0, Moderate: 0, High: 0 };
  const overallEngagement = data.reduce(
    (acc, student) =>
      acc +
      parseFloat(student.Extracurricular_Hours_Per_Day) +
      parseFloat(student.Social_Hours_Per_Day) +
      parseFloat(student.Physical_Activity_Hours_Per_Day),
    0,
  );
  const averageStudyTime =
    data.reduce((acc, student) => acc + parseFloat(student.Study_Hours_Per_Day), 0) / totalStudents;

  data.forEach((student) => {
    if (stressLevels[student.Stress_Level] !== undefined) {
      stressLevels[student.Stress_Level] += 1;
    }
  });

  const updatedFactors = initialFactors.map((factor) => {
    switch (factor.title) {
      case 'Average GPA':
        return { ...factor, value: averageGPA };
      case 'Stress Level Distribution':
        return { ...factor, value: (stressLevels.High / totalStudents) * 100 }; // Example for high stress level
      case 'Overall Engagement':
        return { ...factor, value: overallEngagement / totalStudents };
      case 'Average Study Time':
        return { ...factor, value: averageStudyTime };
      default:
        return factor;
    }
  });

  return updatedFactors;
};

export { parseCSV, calculateFactors };
