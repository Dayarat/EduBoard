import Authentication from 'components/icons/drawer/Authentication';
import Calendar from 'components/icons/drawer/Calendar';
// import Car from 'components/icons/drawer/Car';
import Comment from 'components/icons/drawer/Comment';
// import Doughnut from 'components/icons/drawer/Doughnut';
import Fencing from 'components/icons/drawer/Fencing';
import Grid from 'components/icons/drawer/Grid';

import Settings from 'components/icons/drawer/Settings';
// import ShoppingBag from 'components/icons/drawer/ShoppingBag';
// import ShoppingCart from 'components/icons/drawer/ShoppingCart';
import SignOut from 'components/icons/drawer/SignOut';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import paths from 'routes/paths';
import { DrawerItem } from 'types/types';

export const drawerItems: DrawerItem[] = [
  {
    id: 1,
    icon: Grid,
    title: 'Dashboard',
    path: paths.dashboard,
    collapsible: false,
    active: true,
  },
  {
    id: 2,
    icon: Authentication,
    title: 'Authentication',
    active: true,
    collapsible: true,
    subList: [
      { id: 21, title: 'Login', path: paths.login, active: true },
      { id: 22, title: 'Sign Up', path: paths.signup, active: true },
    ],
  },
  {
    id: 7,
    icon: Fencing,
    title: 'Recommendation',
    path: paths.recommendation,
    collapsible: false,
    active: true,
  },
  {
    id: 8,
    icon: Calendar,
    title: 'Calender',
    path: '#!',
    collapsible: false,
  },
  {
    id: 9,
    icon: Comment,
    title: 'Messages',
    path: paths.messages,
    collapsible: false,
    active: true,
  },
  {
    id: 10,
    icon: Settings,
    title: 'Settings',
    path: '#!',
    active: true,
    collapsible: false,
  },
  {
    id: 11,
    icon: SignOut,
    title: 'Log out',
    path: '#!',
    active: true,
    collapsible: false,
  },
];
