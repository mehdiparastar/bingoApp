import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {        
    error: {
      main: red.A400,
    },
    alternate: {
      main: '#1a2138',
      dark: '#151a30',
    },
    cardShadow: 'rgba(0, 0, 0, .11)',
    common: {
      black: '#000',
      white: '#fff',
    },
    mode: 'dark',
    primary: {
      main: '#1976d2',
      light: '#2196f3',
      dark: '#0d47a1',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFEA41',
      main: '#FFE102',
      dark: '#DBBE01',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    text: {
      primary: '#EEEEEF',
      secondary: '#AEB0B4',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    background: {
      paper: '#222B45',
      default: '#222B45',
      level2: '#333',
      level1: '#2D3748',
    },
  },
});

export default theme;
