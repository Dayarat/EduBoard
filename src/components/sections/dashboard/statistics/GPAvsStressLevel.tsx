import { Box, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import Papa, { ParseResult } from 'papaparse';

// Register the necessary ECharts components
echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

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

interface IReminderData {
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

const GPAvsStressLevel = () => {
  const [data, setData] = useState<IReminderData[]>([]);
  const [stressGPAData, setStressGPAData] = useState<{ [key: string]: number }>({
    Low: 0,
    Moderate: 0,
    High: 0,
  });
  const [stressCount, setStressCount] = useState<{ [key: string]: number }>({
    Low: 0,
    Moderate: 0,
    High: 0,
  });

  console.log(data.length);
  console.log(stressCount.length);

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
          study: row.Study_Hours_Per_Day, // Keep as string
          extra: row.Extracurricular_Hours_Per_Day, // Keep as string
          sleep: row.Sleep_Hours_Per_Day, // Keep as string
          social: row.Social_Hours_Per_Day, // Keep as string
          physical: row.Physical_Activity_Hours_Per_Day, // Keep as string
          gpa: row.GPA, // Keep as string
          stress: row.Stress_Level, // Keep as string
        }));
        setData(formattedData);

        // Categorize by stress level and calculate average GPA
        const gpaSums = { Low: 0, Moderate: 0, High: 0 };
        const counts = { Low: 0, Moderate: 0, High: 0 };

        formattedData.forEach((row) => {
          const stressLevel = row.stress; // stress is a string
          const gpa = parseFloat(row.gpa);

          // Categorize by stress levels
          if (stressLevel === 'Low') {
            gpaSums.Low += gpa;
            counts.Low += 1;
          } else if (stressLevel === 'Moderate') {
            gpaSums.Moderate += gpa;
            counts.Moderate += 1;
          } else if (stressLevel === 'High') {
            gpaSums.High += gpa;
            counts.High += 1;
          }
        });

        // Calculate average GPA for each category
        setStressGPAData({
          Low: counts.Low > 0 ? gpaSums.Low / counts.Low : 0,
          Moderate: counts.Moderate > 0 ? gpaSums.Moderate / counts.Moderate : 0,
          High: counts.High > 0 ? gpaSums.High / counts.High : 0,
        });

        // Store the number of students in each category for potential additional use
        setStressCount(counts);
      },
    });
  }, []);

  const barChartOption = {
    xAxis: {
      type: 'category',
      data: ['Low Stress', 'Moderate Stress', 'High Stress'],
      name: 'Stress Level',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: 'Average GPA',
      nameLocation: 'middle',
      nameGap: 30,
      min: 0,
      max: 4.0,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: { value: number }) => {
        return `Average GPA: ${params.value.toFixed(2)}`;
      },
    },
    series: [
      {
        type: 'bar',
        data: [stressGPAData.Low, stressGPAData.Moderate, stressGPAData.High],
        itemStyle: {
          color: '#5470C6',
        },
      },
    ],
  };

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          GPA vs. Stress Level
        </Typography>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <EChartsReactCore
              echarts={echarts}
              option={barChartOption}
              style={{ height: '400px', width: '100%' }}
            />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default GPAvsStressLevel;
