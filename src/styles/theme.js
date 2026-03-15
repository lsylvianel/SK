// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6750A4', // Violet M3 Baseline
    },
    secondary: {
      main: '#625B71',
    },
    surface: {
      main: '#FEF7FF', // Couleur de fond M3
    }
  },
  shape: {
    borderRadius: 16, // Arrondis plus larges
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100, // Boutons "Pilule"
          textTransform: 'none', // Pas de majuscules automatiques
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 28, // Les cartes sont très arrondies en M3
          elevation: 0, 
          backgroundColor: '#F3EDF7', // Teinte de surface
        },
      },
    },
  },
});

export default theme;