import React, { useEffect, useState } from 'react';
import AuthLayout from '../../../layouts/AuthLayout';
import { Button, Grid, Stack, Divider, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from '../../../context/AlertContext';
import { useAuth } from '..';
import { EmailInput, PasswordInput } from '../../../components/ui';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const { displayAlert } = useAlert();
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { isSuccess, error } = await login(email, password);
    setErrorMessage(error);

    isSuccess && navigate(from, { replace: true });
  };

  useEffect(() => {
    errorMessage && displayAlert(errorMessage);
  }, [displayAlert, errorMessage]);

  // errorMessage && displayAlert(errorMessage);

  return (
    <AuthLayout header='Login Form' bottomButton={{ text: 'Register', target: '/register' }}>
      <Button variant='outlined' sx={{ borderRadius: 8, paddingX: 4 }} startIcon={<svg viewBox="0 0 48 48" width="20px" height="20px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>}>
        sign in with google
      </Button>
      <Stack minWidth='100%' gap={2} sx={{ marginTop: 2 }}>
        <Divider>or</Divider>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <EmailInput value={email} setValue={setEmail} />
            <PasswordInput value={password} setValue={setPassword} />
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
