import React, { useEffect, useState } from 'react';
import {
  Box,
  Fab,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Link,
  Switch,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import fabStyle from '../../../components/fabStyle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsIcon from '@mui/icons-material/Apps';
import useApiClient from '../../../api';
import { useAuth } from '../../authentication';
import { useAlert } from '../../../context/AlertContext';
import { useNavigate } from 'react-router-dom';
import CardView from './CardView';
import ServiceCallsTable from './ServiceCallsTable';

const ENDPOINT = 'ServiceCalls/';

const ServiceCalls = () => {
  const [displayMode, setDisplayMode] = useState('table');
  const [showFinished, setShowFinished] = useState(false);
  const { get, isLoading, isSuccess, error, response } = useApiClient();
  const { user } = useAuth();
  const { displayAlert } = useAlert();

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => await get(ENDPOINT, { clientId: user.sub });
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDisplayMode = (e, value) => setDisplayMode(value);

  const handleNewServiceCall = () => {
    navigate('new', { replace: true });
    console.log('Starting a new service call');
  };

  useEffect(() => {
    error && displayAlert(error);
  }, [displayAlert, error]);

  const handleShowFinished = () => {
    setShowFinished(!showFinished);
  };

  const ServiceCallsContent = () => {
    if (isLoading) return <h1>Loading...</h1>;
    if (!isSuccess) return;

    const filteredItems = showFinished
      ? response.items
      : response.items.filter((x) => x.currentStatus.status.value !== 4);

    return displayMode === 'table' ? (
      <ServiceCallsTable serviceCalls={filteredItems} />
    ) : (
      <CardView serviceCalls={filteredItems} />
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }} gap={5}>
        <FormControlLabel
          control={<Switch onChange={handleShowFinished} checked={showFinished} />}
          label='Show finished'
        />
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

      <ServiceCallsContent />

      <Fab color='primary' style={fabStyle} onClick={handleNewServiceCall}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default ServiceCalls;
