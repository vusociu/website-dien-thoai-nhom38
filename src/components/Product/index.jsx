import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';



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
        <Footer/>
      </Box>
  )
}
  
  export default Productions;
  