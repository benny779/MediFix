import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import LogoutIcon from '@mui/icons-material/Logout';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/authentication';

const PractitionerNavBar = () => {
  const [value, setValue] = useState();
  const { logout } = useAuth();

  const navigate = useNavigate();

  return (
    <>
      <Box sx={{m:2}}>
          <Outlet />
      </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}>
          <BottomNavigationAction
            label='Profile'
            icon={<AccountCircleIcon />}
            onClick={() => navigate('/')}
          />
          <BottomNavigationAction
            label='Service Calls'
            icon={<HomeRepairServiceIcon />}
            onClick={() => navigate('/')}
          />
          <BottomNavigationAction
            label='Logout'
            icon={<LogoutIcon />}
            onClick={() => {
              logout(true);
            }}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
};

export default PractitionerNavBar;
