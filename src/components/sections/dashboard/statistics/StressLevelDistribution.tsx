import { Box, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import Papa, { ParseResult } from 'papaparse';

// Register the necessary ECharts components
echarts.use([PieChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

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

const StressLevelDistribution = () => {
  const [data, setData] = useState<IReminderData[]>([]);
  const [stressCount, setStressCount] = useState<{ [key: string]: number }>({
    Low: 0,
    Moderate: 0,
    High: 0,
  });
  console.log(data.length);

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

        // Count the number of students in each stress level
        const counts = { Low: 0, Moderate: 0, High: 0 };

        formattedData.forEach((row) => {
          const stressLevel = row.stress; // stress is a string
          if (stressLevel === 'Low') {
            counts.Low += 1;
          } else if (stressLevel === 'Moderate') {
            counts.Moderate += 1;
          } else if (stressLevel === 'High') {
            counts.High += 1;
          }
        });

        setStressCount(counts);
      },
    });
  }, []);

  const pieChartOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Stress Level',
        type: 'pie',
        radius: '50%',
        data: [
          { value: stressCount.Low, name: 'Low' },
          { value: stressCount.Moderate, name: 'Moderate' },
          { value: stressCount.High, name: 'High' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Stress Level Distribution
        </Typography>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <EChartsReactCore
              echarts={echarts}
              option={pieChartOption}
              style={{ height: '400px', width: '100%' }}
            />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default StressLevelDistribution;
