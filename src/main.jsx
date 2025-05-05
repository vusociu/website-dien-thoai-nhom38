import CssBaseline from '@mui/material/CssBaseline'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
)
