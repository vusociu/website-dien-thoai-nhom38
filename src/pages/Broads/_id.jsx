import * as React from 'react';
import { Container } from '@mui/material/';
import Box from '@mui/material/Box';
import AppBar from '../../components/AppBar/index.jsx';
import ListItems from '../../components/ListItems/index.jsx';
import Productions from '../../components/Productions/index.jsx';

function Broad() {
    return (
    <>
      <Container disableGutters maxWidth ={false} sx={{ height: '100%'}}>
        <AppBar/>
        <Box sx={{ 
          paddingTop: '20px', 
          backgroundColor: 'primary.main',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : ''),
          display: 'flex',
          height: 'calc(100%  - 58px)',
          width: '100%',
          }}>
        <ListItems/>
        <Productions/>
        </Box>
      </Container>
    </>
    )
  }
  
  export default Broad
  