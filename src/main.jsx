import CssBaseline from '@mui/material/CssBaseline'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
=======
import { ThemeProvider } from '@mui/material/styles'
>>>>>>> vuongpm
import theme from './theme'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<<<<<<< HEAD
    <CssVarsProvider theme={theme}>
      <CssBaseline/>
      <App />
    </CssVarsProvider>
  </StrictMode>,
=======
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
>>>>>>> vuongpm
)
