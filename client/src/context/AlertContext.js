import React, { createContext, useState, useCallback, useContext } from 'react';
import Alert from '@mui/material/Alert'; // Assuming you're using MUI for Alert component

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  const displayAlert = useCallback((text, options = {}) => {
    const { severity = 'error', timeout = 10_000 } = options;

    setAlert({ text, severity });

    if (timeout !== -1) {
      setTimeout(() => {
        setAlert(null);
      }, timeout);
    }
  }, []);

  return (
    <AlertContext.Provider value={{ alert, displayAlert }}>
      {children}
      {alert && (
        <Alert
          severity={alert.severity}
          onClose={() => {
            setAlert(null);
          }}
          sx={{ position: 'fixed', bottom: 40, right: 40 }}>
          {alert.text}
        </Alert>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
