import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#198CFF",
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
      },
    },
  },
});

export default theme;
