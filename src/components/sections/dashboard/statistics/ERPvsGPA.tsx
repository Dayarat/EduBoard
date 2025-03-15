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
  study: number;
  extra: number;
  sleep: number;
  social: number;
  physical: number;
  gpa: number;
}

const ScatterPlotActivityVsGPA = () => {
  const [, setData] = useState<IReminderData[]>([]);
  const [scatterData, setScatterData] = useState<[number, number][]>([]);
  const [trendLine, setTrendLine] = useState<[number, number][]>([]);

  useEffect(() => {
    Papa.parse<CSVRow>('/student_lifestyle_dataset.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<CSVRow>) => {
        const formattedData: IReminderData[] = results.data.map((row, index) => ({
          id: index + 1,
          study: parseFloat(row.Study_Hours_Per_Day),
          extra: parseFloat(row.Extracurricular_Hours_Per_Day),
          sleep: parseFloat(row.Sleep_Hours_Per_Day),
          social: parseFloat(row.Social_Hours_Per_Day),
          physical: parseFloat(row.Physical_Activity_Hours_Per_Day),
          gpa: parseFloat(row.GPA),
        }));
        setData(formattedData);

        // Compute scatter data (Activity Hours vs GPA)
        const scatterData: [number, number][] = formattedData.map((row) => [
          (row.extra + row.social + row.physical) / 3, // Avg Activity Hours
          row.gpa, // GPA
        ]);
        setScatterData(scatterData);

        // Perform Linear Regression (Find best-fit line)
        const n = scatterData.length;
        if (n === 0) return;

        const sumX = scatterData.reduce((sum, d) => sum + d[0], 0);
        const sumY = scatterData.reduce((sum, d) => sum + d[1], 0);
        const sumXY = scatterData.reduce((sum, d) => sum + d[0] * d[1], 0);
        const sumX2 = scatterData.reduce((sum, d) => sum + d[0] * d[0], 0);

        // Calculate slope (m) and intercept (b)
        const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const b = (sumY - m * sumX) / n;

        // Find min and max activity hours
        const minActivity = Math.min(...scatterData.map((d) => d[0]));
        const maxActivity = Math.max(...scatterData.map((d) => d[0]));

        // Compute trend line points using the regression equation
        const trendLineData: [number, number][] = [
          [minActivity, m * minActivity + b], // Point at lowest activity hours
          [maxActivity, m * maxActivity + b], // Point at highest activity hours
        ];

        setTrendLine(trendLineData);
      },
    });
  }, []);

  const scatterPlotOption = {
    xAxis: {
      type: 'value',
      name: 'Avg Activity Hours Per Day',
      nameLocation: 'middle',
      nameGap: 30,
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
        return `Activity Hours: ${params.value[0].toFixed(2)}<br>GPA: ${params.value[1].toFixed(2)}`;
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
      {
        type: 'line',
        data: trendLine.length > 0 ? trendLine : [],
        lineStyle: {
          color: 'red',
          width: 2,
          type: 'solid',
        },
        symbol: 'none',
        showSymbol: false, // Ensure symbols don't interfere
        smooth: true, // Make the trend line smooth
      },
    ],
  };

  return (
    <Box>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Avg Activity Hours vs GPA
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

export default ScatterPlotActivityVsGPA;
