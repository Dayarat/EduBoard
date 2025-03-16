import { Box, Paper, Typography } from '@mui/material';
import { ICar } from 'types/types';
import StressLevelDistribution from '../statistics/StressLevelDistribution';
import GPAChart from '../statistics/ERPvsGPA';
import ActivityDistribution from '../statistics/StudyvsExtra';

const Car = ({ car }: { car: ICar }) => {
  const { backgroundColor, id } = car;

  const chartTitle =
    id === 1
      ? 'GPA Distribution'
      : id === 2
        ? 'Stress Level Distribution'
        : 'Activity Distribution';

  return (
    <Paper sx={{ bgcolor: backgroundColor, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {chartTitle}
      </Typography>
      <Box>
        {id === 1 && <GPAChart />}
        {id === 2 && <StressLevelDistribution />}
        {id === 3 && <ActivityDistribution />}
      </Box>
    </Paper>
  );
};

export default Car;
