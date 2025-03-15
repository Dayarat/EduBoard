import { Box, Paper, Typography } from '@mui/material';
import { ICar } from 'types/types';
import StressLevelDistribution from '../statistics/StressLevelDistribution';
import GPAChart from '../statistics/ERPvsGPA';
import ActivityDistribution from '../statistics/GPAvsStressLevel';

const Car = ({ car }: { car: ICar }) => {
  const { backgroundColor, id } = car;

  const chartTitle =
    id === 1
      ? 'Stress Level Distribution'
      : id === 2
        ? 'GPA Distribution'
        : 'Activity Distribution';

  return (
    <Paper sx={{ bgcolor: backgroundColor, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {chartTitle}
      </Typography>
      <Box>
        {id === 1 && <StressLevelDistribution />}
        {id === 2 && <GPAChart />}
        {id === 3 && <ActivityDistribution />}
      </Box>
    </Paper>
  );
};

export default Car;
