import React, { useState } from 'react';
import { Button, Grid, Stack, TextField, Divider, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { isValidEmail, isValidPassword } from '../helpers/validation';
import AuthLayout from './AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`${email}:${password}`);
    // TODO: login to backend
  };

  return (
    <AuthLayout header="Login Form" bottomButton={{ text: 'Register', target: '#' }}>
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
      </Stack>
    </AuthLayout>
  );
};

export default Login;
