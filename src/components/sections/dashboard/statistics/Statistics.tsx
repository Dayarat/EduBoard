import { Grid } from '@mui/material';
import ScatterPlotStdTvGpa from './ScatterPlotStdTvGpa';
import ScatterPlotSlpTvGpa from './ScatterPlotSlpTvGpa';
import StudyHoursDistribution from './StudyHoursDistribution';
import GPAvsStressLevel from './GPAvsStressLevel';
import StressLevelDistribution from './StressLevelDistribution';

const Statistics = () => {
  return (
    <Grid container spacing={3.75}>
      {/* First row */}
      <Grid item xs={12} lg={6}>
        <StudyHoursDistribution />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ScatterPlotStdTvGpa />
      </Grid>
      {/* Second row */}
      <Grid item xs={12} lg={6}>
        <GPAvsStressLevel />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ScatterPlotSlpTvGpa />
      </Grid>
      <Grid item xs={12} lg={6}>
        <StressLevelDistribution />
      </Grid>
    </Grid>
  );
};

export default Statistics;
