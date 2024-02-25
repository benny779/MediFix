import React from 'react';
import PageContainer from '../../layouts/PageContainer';
import { ServiceCallsTable } from '../../features/user/serviceCalls';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import fabStyle from '../../components/fabStyle'

const ServiceCalls = () => {
  return (
    <>
      <PageContainer>
        <ServiceCallsTable />
        <Fab color='primary' style={fabStyle}>
          <AddIcon />
        </Fab>
      </PageContainer>
    </>
  );
};

export default ServiceCalls;
