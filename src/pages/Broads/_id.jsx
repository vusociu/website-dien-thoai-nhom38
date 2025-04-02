import * as React from 'react';
import { Container } from '@mui/material/';
import Box from '@mui/material/Box';
import AppBar from '../../components/AppBar/index.jsx';

function Broad() {
    return (
    <>
    <Container disableGutters maxWidth ={false} sx={{ height: '100vh'}}>
    <AppBar/>
    <Box sx={{
        width: '100%',
        backgroundColor: 'primary.dark',
        height: '60px',
        display: 'flex',
        alignItems: 'center'
    }}>
        Board Bar
    </Box>
      <Box sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        height: 'calc(100vh - 60px - 58px)',
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Content
      </Box>
      </Container>
      </>
    )
  }
  
  export default Broad
  