import React, { useState } from 'react';
import { Button, Stack, TextField, Divider, InputAdornment, IconButton } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import {  Visibility, VisibilityOff } from '@mui/icons-material';
import { isValidEmail, isValidPassword } from '../../../helpers/validation';
import AuthLayout from './AuthLayout';

const RegisterForm = () => {
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`${email}:${password}`);
    // TODO: login to backend
  };

  return (
    <AuthLayout header="Register Form" bottomButton={{ text: 'Login', target: '/login' }}>
      <Button variant="outlined" sx={{ borderRadius: 8, paddingX: 4 }} startIcon={<GoogleIcon />}>
        sign in with google
      </Button>
      <Stack minWidth="100%" gap={2} sx={{ marginTop: 2 }}>
        <Divider>or</Divider>
        <form onSubmit={handleSubmit}>
          <Stack gap={2}>
            <TextField
              label="First Name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            ></TextField>
            <TextField
              label="Last Name"
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></TextField>
            <TextField
              label="Phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></TextField>
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
              type={showPassword ? "text" : "password"}
              required
              error={!isValidPassword(password)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              required
              error={confirmPassword !== password}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleClickShowConfirmPassword}
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
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
