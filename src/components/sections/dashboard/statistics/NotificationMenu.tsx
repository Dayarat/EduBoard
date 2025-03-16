import { useState, useEffect } from 'react';
import { Badge, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import Notification from 'components/icons/appbar/Notification';

const NotificationMenu = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const studentDataString = localStorage.getItem('studentData');
    if (!studentDataString) return;

    const student = JSON.parse(studentDataString);
    const newNotifications: string[] = [];

    if (student.stress === 'High') {
      newNotifications.push(`${student.student} has a HIGH stress level!`);
    }
    if (parseFloat(student.study) > 8) {
      newNotifications.push(`${student.student} is studying more than 8 hours.`);
    }
    if (parseFloat(student.sleep) < 5) {
      newNotifications.push(`${student.student} is sleeping less than 5 hours.`);
    }

    setNotifications(newNotifications);
  }, []);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label="notifications" color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <Notification />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 300, maxHeight: 300 },
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <MenuItem key={index} onClick={handleClose}>
              <Typography variant="body2">{notif}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleClose}>
            <Typography variant="body2">No new notifications</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
