import { PropsWithChildren, useState } from 'react';
import { Box, Toolbar, Stack } from '@mui/material';
import VerticalNavbar from './drawer/VerticalNavbar';
import TopBar from './topbar/TopBar';
import Footer from './footer/Footer';
import Alerts from '../../components/sections/dashboard/statistics/Alerts'; // Import Alerts
import { useLocation } from 'react-router-dom';

const drawerWidth = 248;

const MainLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [alerts, setAlerts] = useState<string[]>([]); // Define alerts state

  // Hardcoded logged-in user index (replace with actual logic)
  const loggedInIndex = location.state?.index; // Example: Parent with index 30

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Stack direction="row">
      {/* Pass alerts to TopBar */}
      <TopBar drawerWidth={drawerWidth} onHandleDrawerToggle={handleDrawerToggle} alerts={alerts} />
      <VerticalNavbar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onHandleDrawerClose={handleDrawerClose}
      />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          p: { xs: theme.spacing(3.75, 3), md: theme.spacing(3.75, 5.375, 3.75, 3.75) },
          minHeight: '100vh',
          width: { xs: 1, sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'grey.100',
        })}
      >
        <Toolbar />
        {/* Render Alerts component */}
        <Alerts loggedInIndex={loggedInIndex} setAlerts={setAlerts} />{' '}
        {/* Pass loggedInIndex and setAlerts */}
        {children}
        <Footer />
      </Box>
    </Stack>
  );
};

export default MainLayout;
