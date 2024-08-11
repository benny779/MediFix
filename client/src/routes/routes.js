import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import { Roles } from '../constant';

const clientRoutes = [
  [
    {
      id: 1,
      text: 'My Service Calls',
      icon: <InboxIcon />,
      path: '/serviceCalls',
    },
    {
      id: 2,
      text: 'Open Service Call',
      icon: <AddIcCallIcon />,
      path: '/serviceCalls/new',
    },
  ],
];

const practitionerRoutes = [
  [
    {
      id: 1,
      text: 'Service Calls',
      icon: <InboxIcon />,
      path: '/practitioner/serviceCalls',
    },
  ],
];

const managerRoutes = [
  [
    {
      id: 1,
      text: 'Dashboard',
      icon: <InboxIcon />,
      path: '/dashboard',
    },
  ],
  [
    {
      id: 2,
      text: 'Service Calls',
      icon: <InboxIcon />,
      path: '/serviceCalls',
    },
    {
      id: 3,
      text: 'Open Service Call',
      icon: <AddIcCallIcon />,
      path: '/serviceCalls/new',
    },
  ],
  [
    {
      id: 4,
      text: 'Manage Users',
      icon: <InboxIcon />,
      path: '/manage/users',
    },
    {
      id: 5,
      text: 'Manage Locations',
      icon: <AddIcCallIcon />,
      path: '/manage/locations',
    },
    {
      id: 6,
      text: 'Manage Categories',
      icon: <AddIcCallIcon />,
      path: '/manage/categories',
    },
  ],
];

export const getMenu = (userType) => {
  switch (userType) {
    case Roles.client:
      return clientRoutes;
    case Roles.manager:
      return managerRoutes;
    case Roles.practitioner:
      return practitionerRoutes;

    default:
      return [];
  }
};
