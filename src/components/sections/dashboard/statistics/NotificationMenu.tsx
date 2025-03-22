import React, { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

interface NotificationMenuProps {
  alerts: string[]; // Add alerts as a prop
}

const NotificationMenu = ({ alerts }: NotificationMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Badge badgeContent={alerts.length} color="error">
          <IconifyIcon icon="mdi:bell-outline" /> {/* Use your existing icon */}
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <MenuItem key={index} onClick={handleMenuClose}>
              <Typography variant="body2">{alert}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleMenuClose}>
            <Typography variant="body2">No new notifications</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
