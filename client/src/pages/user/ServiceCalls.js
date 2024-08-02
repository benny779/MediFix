import React, { useEffect, useState } from 'react';
import { CardView, ServiceCallsTable } from '../../features/user/serviceCalls';
import { Box, Fab, ToggleButton, ToggleButtonGroup, Typography, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import fabStyle from '../../components/fabStyle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsIcon from '@mui/icons-material/Apps';
import useApiClient from '../../api';
import { useAuth } from '../../features/authentication';
import { useAlert } from '../../context/AlertContext';
import { useLocation, useNavigate } from 'react-router-dom';

const ENDPOINT = 'ServiceCalls/';

const ServiceCalls = () => {
  const [displayMode, setDisplayMode] = useState('table');
  const { get, isLoading, isSuccess, error, response } = useApiClient();
  const { user } = useAuth();
  const { displayAlert } = useAlert();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathName || 'new/';

  useEffect(() => {
    const fetch = async () => await get(ENDPOINT, { clientId: user.sub });
    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisplayMode = (e, value) => setDisplayMode(value);

  const handleNewServiceCall = () => {
    navigate(from, { replace: true });
    console.log('Starting a new service call');
  };

  useEffect(() => {
    error && displayAlert(error);
  }, [displayAlert, error]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <ToggleButtonGroup value={displayMode} exclusive onChange={handleDisplayMode} aria-label="text alignment">
          <ToggleButton value="table" aria-label="left aligned">
            <TableRowsIcon />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="centered">
            <AppsIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : !isSuccess ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            This user has no service calls
          </Typography>
          <Typography variant="body1">
            <Link href="#" onClick={handleNewServiceCall} underline="hover">
              To move to opening a new service call, click here
            </Link>
          </Typography>
        </Box>
      ) : displayMode === 'table' ? (
        <ServiceCallsTable serviceCalls={response} />
      ) : (
        <CardView serviceCalls={response} />
      )}

      {/* <CreateServiceCallForm/> */}
      <Fab color="primary" style={fabStyle} onClick={handleNewServiceCall}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default ServiceCalls;
