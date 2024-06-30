import React, { useEffect, useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { Button, Grid, Stack, Divider, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import GoogleIcon from '@mui/icons-material/Google';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAlert } from '../context/AlertContext';
import { useAuth } from '../features/authentication';
import { EmailInput, PasswordInput } from '../components/ui';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const { displayAlert } = useAlert();
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('a@a.com');
  const [password, setPassword] = useState('Aq1234856');

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
      <Button variant='outlined' sx={{ borderRadius: 8, paddingX: 4 }} startIcon={<GoogleIcon />}>
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
