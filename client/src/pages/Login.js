import React, { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { isValidEmail, isValidPassword } from '../utils/validation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import { useAuth } from '../features/authentication';

const LoginForm = () => {
  const { login, error, isLoading } = useAuth();
  const { displayAlert } = useAlert();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('a@a.com');
  const [password, setPassword] = useState('Aq123456');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { isSuccess } = await login(email, password);

    isSuccess && navigate(from, { replace: true });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    error && displayAlert(error.detail);
  }, [error]);

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
            <LoadingButton loading={isLoading} type='submit' variant='contained' size='large'>
              <span>sign in</span>
            </LoadingButton>
          </Stack>
        </form>
        <Divider>or</Divider>
      </Stack>
    </AuthLayout>
  );
};

export default LoginForm;
