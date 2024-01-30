import { Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import banner from '../assets/banner.jpg'
import Image from 'mui-image';

const AuthLayout = ({ children, header, bottomButton }) => {
  return (
    <Grid container justifyContent='center' alignItems='center' style={{ minHeight: '96vh' }}>
      <Grid container maxWidth='md' my={4} sx={{ p: 2 }}>
        <Grid
          container
          item
          xs={12}
          sm={7}
          md={6}
          sx={{ p: 2, border: 1, borderColor: 'primary.main' }}
          direction='column'
          alignItems='center'
          justifyContent='center'>
          <Typography marginY={2} variant='h4' textAlign='center'>
            {header}
          </Typography>
          {children}
          <Stack>
            <Button
              href={bottomButton?.target || '#'}
              style={{ Text }}
              sx={{ paddingX: 3, marginTop: 1 }}>
              {bottomButton?.text || 'Buttom Button'}
            </Button>
          </Stack>
        </Grid>
        <Grid item sm={5} md={6}>
          <Image src={banner} alt='' fit='cover' duration={0}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
