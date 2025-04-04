import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
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
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
          borderRadius: '10px',
          ml: 2,
          mr: 2,
          pl: '10px',
          pr: '10px',
          pb: '10px',

        //height: 'fit-content',
          border: (theme) => `1px solid ${theme.palette.primary.main}`, 
        }}>
          <Header/>
          <Body/>
          <Footer/>
        </Box>
    )
  }
  
  export default Productions;
  