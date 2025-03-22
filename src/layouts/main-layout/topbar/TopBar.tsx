import { AppBar, IconButton, Link, Stack, Toolbar } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountMenu from './AccountMenu';
import SearchBox from 'components/common/SearchBox';
import { rootPaths } from 'routes/paths';
import Logo from 'components/icons/common/Logo';
import ElevationScroll from './ElevationScroll';
import Search from 'components/icons/common/Search';
import NotificationMenu from '../../../components/sections/dashboard/statistics/NotificationMenu';

interface TopBarProps {
  drawerWidth: number;
  onHandleDrawerToggle: () => void;
  alerts: string[]; // Add alerts as a prop
}

const TopBar = ({ drawerWidth, onHandleDrawerToggle, alerts }: TopBarProps) => {
  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth + 1}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            alignItems="center"
            columnGap={{ xs: 1, sm: 2 }}
            sx={{ display: { md: 'none' } }}
          >
            <Link href={rootPaths.root}>
              <IconButton color="inherit" aria-label="logo">
                <Logo sx={{ fontSize: 27 }} />
              </IconButton>
            </Link>

            <IconButton color="inherit" aria-label="open drawer" onClick={onHandleDrawerToggle}>
              <IconifyIcon icon="mdi:hamburger-menu" />
            </IconButton>

            <IconButton color="inherit" aria-label="search-icon">
              <Search fontSize="small" />
            </IconButton>
          </Stack>

          <SearchBox />

          <Stack direction="row" alignItems="center" columnGap={{ xs: 1, sm: 2, md: 3 }}>
            {/* Pass alerts to NotificationMenu */}
            <NotificationMenu alerts={alerts} />

            <AccountMenu />
          </Stack>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default TopBar;
