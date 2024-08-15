import React, { useEffect, useState } from 'react';
import { Box, Fab, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import fabStyle from '../../../components/fabStyle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsIcon from '@mui/icons-material/Apps';
import useApiClient from '../../../api';
import { useAlert } from '../../../context/AlertContext';
import CardView from './CardView';
import ServiceCallsTable from './ServiceCallsTable';

const ENDPOINT = 'serviceCalls/';

const ManagerServiceCalls = () => {
  const [displayMode, setDisplayMode] = useState('table');
  const { get, isLoading, isSuccess, error, response } = useApiClient();
  const { displayAlert } = useAlert();

  useEffect(() => {
    const fetch = async () => await get(ENDPOINT);
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisplayMode = (e, value) => setDisplayMode(value);

  useEffect(() => {
    error && displayAlert(error);
  }, [displayAlert, error]);

  return (
    <>
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
        <ServiceCallsTable serviceCalls={response.items} />
      ) : (
        <CardView serviceCalls={response.items} />
      )}

      {/* <CreateServiceCallForm/> */}
      <Fab color='primary' style={fabStyle}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default ManagerServiceCalls;
