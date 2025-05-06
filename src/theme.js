import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#BCE0FF",
      main: "#198CFF",
      dark: "#1E47B9"
    },
    error: {
      main: "#FF4C57",
    },
    divider: "#DDDDE3",
    background: {
      default: "#F5F5FA",
      white: "#FFFFFF",
    },
  },
  typography: {
    price: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#FF4C57",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '8px',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '8px',
            borderColor: 'devider',
          },
        }
      }
    },
    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
        },
        elevation1: {
          boxShadow: '0 1px 2px 0 rgba(60,64,67,.1), 0 2px 6px 2px rgba(60,64,67,.15)',
        },
      },
    },
  },
});

export default theme;
