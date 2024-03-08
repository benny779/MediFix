import React, { useState } from 'react';
import PageContainer from '../../layouts/PageContainer';
import {
  CreateServiceCallForm,
  ServiceCallCard,
  CardView,
  ServiceCallsTable,
} from '../../features/user/serviceCalls';
import { Box, Fab, ToggleButton, ToggleButtonGroup } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import fabStyle from '../../components/fabStyle';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AppsIcon from '@mui/icons-material/Apps';

const ServiceCalls = () => {
  const [displayMode, setDisplayMode] = useState('table');

  const handleDisplayMode = (e, value) => setDisplayMode(value);

  return (
    <>
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

        {displayMode === 'table' ? <ServiceCallsTable /> : <CardView />}

        {/* <CreateServiceCallForm/> */}
        <Fab color='primary' style={fabStyle}>
          <AddIcon />
        </Fab>
      </PageContainer>
    </>
  );
};

export default ServiceCalls;
