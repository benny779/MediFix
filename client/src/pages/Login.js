import React, { useState } from 'react';
import { Button, Grid, Typography, Stack, TextField, Divider, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { purple } from '@mui/material/colors';
import { isValidEmail, isValidPassword } from '../helpers/validation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`${email}:${password}`);
    // TODO: login to backend
  };

  return (
    <Grid container justifyContent="center">
      <Grid container maxWidth="md" my={4} sx={{ p: 2 }}>
        <Grid
          container
          item
          xs={12}
          sm={7}
          md={6}
          sx={{ p: 2, border: 1, borderColor: 'primary.main' }}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography marginY={2} variant="h4" textAlign="center">
            Login Form
          </Typography>
          <Button variant="outlined" sx={{ borderRadius: 8, paddingX: 4 }} startIcon={<GoogleIcon />}>
            sign in with google
          </Button>
          <Stack minWidth="100%" gap={2} sx={{ marginTop: 2 }}>
            <Divider>or</Divider>
            <form onSubmit={handleSubmit}>
              <Stack gap={2}>
                <TextField
                  label="Email Address"
                  type="email"
                  required
                  error={!isValidEmail(email)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  required
                  error={!isValidPassword(password)}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></TextField>
                <Grid container direction="row" justifyContent="end">
                  <Grid item>
                    <Link variant="body1" href="#" underline="hover">
                      Forgot password?
                    </Link>
                  </Grid>
                </Grid>
                <Button type="submit" variant="contained" size="large">
                  sign in
                </Button>
              </Stack>
            </form>
            <Divider>or</Divider>

            <Stack>
              <Button style={{ Text }}>Create an acoount</Button>
            </Stack>
          </Stack>
        </Grid>
        <Grid item sm={5} md={6} sx={{ bgcolor: purple[500] }}></Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
