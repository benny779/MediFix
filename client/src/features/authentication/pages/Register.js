import React, { useEffect, useState } from 'react';
import { Button, Stack, TextField, Divider, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { isValidEmail, isValidPassword } from '../../../utils/validation';
import AuthLayout from '../../../layouts/AuthLayout';
import { useAlert } from '../../../context/AlertContext';
import { useAuth } from '..';
import { useLocation, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { register } = useAuth();
  const { displayAlert } = useAlert();
  const [errorMessage, setErrorMessage] = useState();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/login';

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registerObj = {
      userType: 1,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber: phone,
    };

    const { isSuccess, error } = await register(registerObj);
    setErrorMessage(error);

    isSuccess && navigate(from, { replace: true });
  };

  useEffect(() => {
    errorMessage && displayAlert(errorMessage);
  }, [displayAlert, errorMessage]);

  return (
    <AuthLayout header="Register Form" bottomButton={{ text: 'Login', target: '/login' }}>
      <Stack minWidth="100%" gap={2} sx={{ marginTop: 2 }}>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <TextField
              label="First Name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Email Address"
              type="email"
              required
              error={emailTouched && !isValidEmail(email)}
              value={email}
              onBlur={() => setEmailTouched(true)}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              required
              error={passwordTouched && !isValidPassword(password)}
              value={password}
              onBlur={() => setPasswordTouched(true)}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              error={confirmPasswordTouched && confirmPassword !== password}
              value={confirmPassword}
              onBlur={() => setConfirmPasswordTouched(true)}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" size="large">
              Register
            </Button>
          </Stack>
        </form>
        <Divider>or</Divider>
      </Stack>
    </AuthLayout>
  );
};

export default RegisterForm;