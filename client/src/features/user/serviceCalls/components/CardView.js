import React from 'react';
import demo from '../demo.json';
import ServiceCallCard from './ServiceCallCard';
import { Box, Grid } from '@mui/material';

const CardView = () => {
  return (
    <Grid container spacing={2}>
      {demo.map((row) => (
        <Grid key={row.serviceCallId} item xs={12} sm={6} md={4} lg={3}>
          <ServiceCallCard key={row.seviceCallId} row={row} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;
