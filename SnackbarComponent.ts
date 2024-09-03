import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

// Define the type for openMessage
interface OpenMessage {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  open: boolean;
  severity: 'success' | 'info' | 'warning' | 'error';
  msg: string;
}

// Define the props for SnackbarComponent
interface SnackbarComponentProps {
  openMessage: OpenMessage;
  setOpenMessage: React.Dispatch<React.SetStateAction<OpenMessage>>;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({ openMessage, setOpenMessage }) => {
  const handleAlert = () => {
    console.log('alert');
    setOpenMessage({ ...openMessage, open: false });
  };

  const { vertical, horizontal, open, severity, msg } = openMessage;

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000}
      onClose={handleAlert}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={handleAlert} severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
