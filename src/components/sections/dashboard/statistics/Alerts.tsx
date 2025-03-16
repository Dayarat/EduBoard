import { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

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

interface AlertsProps {
  data: IReminderData[];
}

const Alerts = ({ data }: AlertsProps) => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [openAlert, setOpenAlert] = useState(false);

  // Function to check and trigger alerts
  const checkAlerts = (data: IReminderData[]) => {
    const newAlerts: string[] = [];

    data.forEach((student) => {
      if (student.stress === 'High') {
        newAlerts.push(`ALERT: ${student.student} has a HIGH stress level!`);
      }
      if (parseFloat(student.study) > 8) {
        newAlerts.push(`Warning: ${student.student} is studying more than 8 hours!`);
      }
      if (parseFloat(student.sleep) < 5) {
        newAlerts.push(`Warning: ${student.student} is sleeping less than 5 hours!`);
      }
    });

    if (newAlerts.length > 0) {
      setAlerts(newAlerts);
      setOpenAlert(true);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      checkAlerts(data);
    }
  }, [data]);

  return (
    <>
      {alerts.map((alert, index) => (
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
