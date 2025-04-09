import { cyan, deepOrange, orange, teal } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#1770FF",
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
  colorSchemes: {
    // light: {
    //   palette: {
    //     // primary: { main: '#e3f2fd',},
    //     // secondary: { main: '#f3e5f5',},
    //     primary: teal,
    //     secondary: deepOrange,
    //   },
    // },
    // dark: {
    //   palette: {
    //     // primary: {main: '#42a5f5',},
    //     // secondary:  {main:  '#ab47bc',},
    //     primary: cyan,
    //     secondary:  orange,
    //   },
    // },
  },
});

export default theme;
