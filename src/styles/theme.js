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
        root: { // 'root' s'applique à TOUS les variants (text, contained, outlined)
            borderRadius: 100,
            textTransform: 'none',
            fontFamily: 'Roboto, sans-serif', // Force la police M3
            padding: '10px 24px',
        },
      },
    }
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
    MuiDialog: {
        styleOverrides: {
        paper: {
            borderRadius: 28, // Arrondi M3 pour les modals
            backgroundColor: '#F3EDF7', // Couleur de surface M3
        },
        },
    },
    MuiDialogTitle: {
        styleOverrides: {
        root: {
            fontSize: '1.5rem', // 24px en M3
            fontWeight: 400,
            color: '#1C1B1F', // Texte presque noir (On-Surface)
            padding: '16px 24px', // Plus d'espace sur les côtés
        },
        },
    },
    MuiDialogContent: {
        styleOverrides: {
        root: {
            padding: '10px 24px',
        },
        },
    },
    MuiDialogActions: {
        styleOverrides: {
            root: {
            display: 'flex',
            justifyContent: 'center', // Centre horizontalement
            padding: '16px 24px',     // Espacement conforme M3
            '& > :not(:style)': {
                marginLeft: '8px',      // Espace entre les boutons
                marginRight: '8px',
                },
            },
        },
    }
});

export default theme;