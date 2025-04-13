import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Header from './header';
import Body from './Body';
import Footer from './Footer';



function Productions() {
  return (
      <Box sx={{
        width: '100%',
        bgcolor: "background.white",
        borderRadius: '10px',
        ml: 2,
        mr: 2,
        pl: '10px',
        pr: '10px',
        pb: '10px',

      //height: 'fit-content',
        //border: (theme) => `1px solid ${theme.palette.primary.main}`, 
      }}>
        <Header/>
        <Body/>
        <Footer/>
      </Box>
  )
}
  
  export default Productions;
  