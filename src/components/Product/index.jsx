import React from 'react';
import Box from '@mui/material/Box';
import Header from './Header';
import Body from './Body';

function Productions() {
  return (
      <Box sx={{
        width: '100%',
        bgcolor: "background.white",
        borderRadius: '10px',
        mx: { xs: 1, md: 2 },
        pl: '10px',
        pr: '10px',
        pb: '10px',
      }}>
        <Header/>
        <Body/>
        {/* <Footer/> is in the body*/}
      </Box>
  )
}
  
export default Productions;
  