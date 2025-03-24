import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { IReminderData } from '../ReminderTable';
import { parseCSV } from '../../../../data/util/getData';

interface AlertsProps {
  loggedInIndex: number; // Logged-in user's index (student ID)
  setAlerts: (alerts: string[]) => void; // Function to update alerts in the parent component
}

const Alerts = ({ loggedInIndex, setAlerts }: AlertsProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alerts, setLocalAlerts] = useState<string[]>([]); // Local state for alerts

  // Function to check and trigger alerts
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const checkAlerts = (data: IReminderData[]) => {
    const newAlerts: string[] = [];

    console.log('Dataset:', data); // Debug: Log the dataset
    console.log('Logged-in Index:', loggedInIndex); // Debug: Log the logged-in index

    // Find the logged-in user's data
    const loggedInUser = data.find((student) => student.id === loggedInIndex);

    console.log('Logged-in User:', loggedInUser); // Debug: Log the logged-in user's data

    if (loggedInUser) {
      // Generate alerts based on the user's data
      if (loggedInUser.stress === 'High') {
        newAlerts.push(`ALERT: Your child has a HIGH stress level!`);
      }
      if (parseFloat(loggedInUser.study) > 8) {
        newAlerts.push(`Warning: Your child is studying more than 8 hours!`);
      }
      if (parseFloat(loggedInUser.sleep) < 5) {
        newAlerts.push(`Warning: Your child is sleeping less than 5 hours!`);
      }
    }

    console.log('Generated Alerts:', newAlerts); // Debug: Log the generated alerts

    if (newAlerts.length > 0) {
      setLocalAlerts(newAlerts); // Update local alerts state
      setAlerts(newAlerts); // Update alerts in the parent component
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parsedData = await parseCSV('/student_lifestyle_dataset.csv', 30);

        console.log('Parsed Dataset:', parsedData);

        checkAlerts(parsedData);
      } catch (error) {
        console.error('Error fetching dataset:', error);
      }
    };

    fetchData();
  }, [loggedInIndex]); // Re-run when loggedInIndex changes

  return (
    <>
      {alerts.map((alert: string, index: number) => (
        <Snackbar
          key={index}
          open={openAlert}
          autoHideDuration={6000}
          onClose={() => setOpenAlert(false)}
        >
          <Alert onClose={() => setOpenAlert(false)} severity="warning">
            {alert}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Alerts;
