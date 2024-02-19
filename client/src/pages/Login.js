import React, { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Divider,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { isValidEmail, isValidPassword } from '../utils/validation';
import * as authService from '../features/authentication';

const LoginForm = () => {
  const [email, setEmail] = useState('a@a.com');
  const [password, setPassword] = useState('Aq123456');
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(null);

  const displayAlert = (text, timeout = 5_000) => {
    setAlert(text);

    setTimeout(() => {
      setAlert(null);
    }, timeout);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { success, error, data } = await authService.login(email, password);

    if (!success) {
      displayAlert(error.message);
      return;
    }

    const { user } = data;
    setAlert(`${user.email}, ${user.firstName} ${user.lastName}`);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout header='Login Form' bottomButton={{ text: 'Register', target: '/register' }}>
      <Button variant='outlined' sx={{ borderRadius: 8, paddingX: 4 }} startIcon={<GoogleIcon />}>
        sign in with google
      </Button>
      <Stack minWidth='100%' gap={2} sx={{ marginTop: 2 }}>
        <Divider>or</Divider>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <TextField
              label='Email Address'
              type='email'
              required
              error={!isValidEmail(email)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}></TextField>
            <TextField
              label='Password'
              type={showPassword ? 'text' : 'password'}
              required
              error={!isValidPassword(password)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}></TextField>
            <Grid container direction='row' justifyContent='end'>
              <Grid item>
                <Link variant='body1' href='#' underline='hover'>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Button type='submit' variant='contained' size='large'>
              sign in
            </Button>
          </Stack>
          {alert && (
            <Alert
              severity='error'
              onClose={() => {
                setAlert(null);
              }}
              sx={{ marginTop: 2 }}>
              {alert}
            </Alert>
          )}
        </form>
        <Divider>or</Divider>
      </Stack>
    </AuthLayout>
  );
};

export default LoginForm;
