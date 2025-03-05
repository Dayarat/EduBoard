import { useState } from 'react';
import { Grid } from '@mui/material';
import Statistics from 'components/sections/dashboard/statistics/Statistics';
import Factors from 'components/sections/dashboard/factors/Factors';
import Cars from 'components/sections/dashboard/cars/Cars';
import { cars } from 'data/dashboard/cars';
import CsvViewer from 'components/dataset/CsvViewer';
import { IFactor } from 'types/types';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const [factorsData, setFactorsData] = useState<IFactor[]>();
  const index = location.state?.index;

  const handleFactorsChange = (updatedFactors: IFactor[]) => {
    setFactorsData(updatedFactors);
  };

  return (
    <Grid container rowGap={3.75}>
      {factorsData && (
        <Grid item xs={12}>
          <Factors factors={factorsData} />
        </Grid>
      )}

      <Grid item xs={12}>
        <Statistics />
      </Grid>

      <Grid item xs={12}>
        <Cars cars={cars} />
      </Grid>

      <Grid item xs={12}>
        <CsvViewer onFactorsChange={handleFactorsChange} index={index} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
