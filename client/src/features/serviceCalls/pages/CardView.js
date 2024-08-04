import React from 'react';
import ServiceCallCard from './ServiceCallCard';
import { Grid } from '@mui/material';

const CardView = ({ serviceCalls }) => {
  return (
    <Grid container spacing={2}>
      {serviceCalls.serviceCalls.map((row) => (
        <Grid key={row.serviceCallId} item xs={12} sm={6} md={4} lg={3}>
          <ServiceCallCard key={row.Id} row={row} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;
