import React, { useEffect, useState } from 'react';
import PageContainer from '../../layouts/PageContainer';
import { CardView, ServiceCallsTable } from '../../features/user/serviceCalls';
import { Box, Fab, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import fabStyle from '../../components/fabStyle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsIcon from '@mui/icons-material/Apps';
import useApiClient from '../../api';
import { useAuth } from '../../features/authentication';
import { useAlert } from '../../context/AlertContext';

const ENDPOINT = 'serviceCalls/';

const ManagerServiceCalls = () => {
  const [displayMode, setDisplayMode] = useState('table');
  const { get, isLoading, isSuccess, error, response } = useApiClient();
  const { user } = useAuth();
  const { displayAlert } = useAlert();

  useEffect(() => {
    const fetch = async () => await get(ENDPOINT);
    fetch();
  }, []);

  const handleDisplayMode = (e, value) => setDisplayMode(value);

  useEffect(() => {
    error && displayAlert(error);
  }, [displayAlert, error]);

  return (
    <PageContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <ToggleButtonGroup
          value={displayMode}
          exclusive
          onChange={handleDisplayMode}
          aria-label='text alignment'>
          <ToggleButton value='table' aria-label='left aligned'>
            <TableRowsIcon />
          </ToggleButton>
          <ToggleButton value='grid' aria-label='centered'>
            <AppsIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {isLoading ? (
        <h1>Loading...</h1>
      ) : !isSuccess ? null : displayMode === 'table' ? (
        <ServiceCallsTable serviceCalls={response} />
      ) : (
        <CardView serviceCalls={response} />
      )}

      {/* <CreateServiceCallForm/> */}
      <Fab color='primary' style={fabStyle}>
        <AddIcon />
      </Fab>
    </PageContainer>
  );
};

export default ManagerServiceCalls;
