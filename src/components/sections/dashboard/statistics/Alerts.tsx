import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Papa from 'papaparse';
import { IReminderData } from '../ReminderTable';

interface AlertsProps {
  loggedInIndex: number; // Logged-in user's index (student ID)
  setAlerts: (alerts: string[]) => void; // Function to update alerts in the parent component
}

const Alerts = ({ loggedInIndex, setAlerts }: AlertsProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alerts, setLocalAlerts] = useState<string[]>([]); // Local state for alerts

  // Function to check and trigger alerts
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
        newAlerts.push(`ALERT: ${loggedInUser.student} has a HIGH stress level!`);
      }
      if (parseFloat(loggedInUser.study) > 8) {
        newAlerts.push(`Warning: ${loggedInUser.student} is studying more than 8 hours!`);
      }
      if (parseFloat(loggedInUser.sleep) < 5) {
        newAlerts.push(`Warning: ${loggedInUser.student} is sleeping less than 5 hours!`);
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
    // Fetch or use the dataset dynamically
    const fetchData = async () => {
      try {
        const response = await fetch('../../../../../public/student_lifestyle_dataset.csv'); // Replace with your dataset path
        const text = await response.text();
        console.log('Raw Dataset Text:', text); // Debug: Log the raw dataset text

        const parsedData = Papa.parse<IReminderData>(text, { header: true }).data;
        console.log('Parsed Dataset:', parsedData); // Debug: Log the parsed dataset

        // Filter out empty rows (if any)
        const filteredData = parsedData.filter((row) => row.id);
        console.log('Filtered Dataset:', filteredData); // Debug: Log the filtered dataset

        checkAlerts(filteredData); // Check alerts for the logged-in user
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
