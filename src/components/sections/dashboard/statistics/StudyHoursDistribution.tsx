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

const StudyHoursDistribution = () => {
  const [data, setData] = useState<IReminderData[]>([]);
  const [studyHoursDistribution, setStudyHoursDistribution] = useState([
    { range: '0-5 Hours', count: 0 },
    { range: '5-8 Hours', count: 0 },
    { range: '8+ Hours', count: 0 },
  ]);
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

        // Categorize study hours into ranges
        const distribution = [
          { range: '0-5 Hours', count: 0 },
          { range: '5-8 Hours', count: 0 },
          { range: '8+ Hours', count: 0 },
        ];

        formattedData.forEach((row) => {
          const studyHours = parseFloat(row.study);
          if (studyHours <= 5) {
            distribution[0].count += 1;
          } else if (studyHours <= 8) {
            distribution[1].count += 1;
          } else {
            distribution[2].count += 1;
          }
        });

        setStudyHoursDistribution(distribution);
      },
    });
  }, []);

  const barChartOption = {
    xAxis: {
      type: 'category',
      data: studyHoursDistribution.map((item) => item.range),
      name: 'Study Hours Range',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: 'Number of Students',
      nameLocation: 'middle',
      nameGap: 30,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: { value: number }) => {
        return `Number of Students: ${params.value}`;
      },
    },
    series: [
      {
        type: 'bar',
        data: studyHoursDistribution.map((item) => item.count),
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
          Study Hours Per Day Distribution
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

export default StudyHoursDistribution;
