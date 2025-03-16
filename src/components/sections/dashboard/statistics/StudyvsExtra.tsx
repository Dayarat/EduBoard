import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { BarChart, ScatterChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import Papa, { ParseResult } from 'papaparse';

// Register the necessary ECharts components
echarts.use([
  BarChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
]);

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

const StudyvsExtra = () => {
  const [studyVsExtraData, setStudyVsExtraData] = useState<[number, number][]>([]);

  useEffect(() => {
    Papa.parse<CSVRow>('/student_lifestyle_dataset.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CSVRow>) => {
        // Extract Study Hours vs Extracurricular Hours data
        const extractedData: [number, number][] = results.data.map((row) => [
          parseFloat(row.Study_Hours_Per_Day),
          parseFloat(row.Extracurricular_Hours_Per_Day),
        ]);

        setStudyVsExtraData(extractedData);
      },
    });
  }, []);

  // Scatter Plot Configuration
  const scatterPlotOption = {
    xAxis: {
      type: 'value',
      name: 'Study Hours Per Day',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: 'Extracurricular Hours Per Day',
      nameLocation: 'middle',
      nameGap: 30,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: { value: [number, number] }) => {
        return `Study Hours: ${params.value[0]}<br>Extra Hours: ${params.value[1]}`;
      },
    },
    series: [
      {
        type: 'scatter',
        data: studyVsExtraData,
        symbolSize: 8,
        itemStyle: {
          color: '#E57373',
        },
      },
    ],
  };

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Study Hours vs. Extracurricular Hours
        </Typography>
        <EChartsReactCore
          echarts={echarts}
          option={scatterPlotOption}
          style={{ height: '400px', width: '100%' }}
        />
      </Paper>
    </Box>
  );
};

export default StudyvsExtra;
