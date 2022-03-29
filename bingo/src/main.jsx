import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
  document.getElementById('root'),
);
