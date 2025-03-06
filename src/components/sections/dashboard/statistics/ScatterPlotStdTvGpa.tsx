import { Box, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import Papa, { ParseResult } from 'papaparse';

// Register the necessary ECharts components
echarts.use([ScatterChart, GridComponent, TooltipComponent, LegendComponent, CanvasRenderer]);

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

const ScatterPlotStdTvGpa = () => {
  const [data, setData] = useState<IReminderData[]>([]);
  const [scatterData, setScatterData] = useState<[number, number][]>([]);
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

        // Prepare scatter plot data: [study hours, GPA]
        const scatterData: [number, number][] = formattedData.map((row) => [
          parseFloat(row.study), // Convert back to number for scatter plot
          parseFloat(row.gpa), // Convert back to number for scatter plot
        ]);
        setScatterData(scatterData);
      },
    });
  }, []);

  const scatterPlotOption = {
    xAxis: {
      type: 'value',
      name: 'Study Hours Per Day',
      nameLocation: 'middle',
      nameGap: 30,
      max: 11,
    },
    yAxis: {
      type: 'value',
      name: 'GPA',
      nameLocation: 'middle',
      nameGap: 30,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: { value: [number, number] }) => {
        return `Study Hours: ${params.value[0]}<br>GPA: ${params.value[1]}`;
      },
    },
    series: [
      {
        type: 'scatter',
        data: scatterData,
        symbolSize: 10,
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
          Study Time vs GPA
        </Typography>
        <Stack direction="row" spacing={2}>
          <Box sx={{ flex: 1 }}>
            <EChartsReactCore
              echarts={echarts}
              option={scatterPlotOption}
              style={{ height: '400px', width: '100%' }}
            />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ScatterPlotStdTvGpa;
