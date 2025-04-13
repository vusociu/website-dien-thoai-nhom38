import * as React from 'react';
import Box from '@mui/material/Box';
import Imgproduct from './imgProduct';
import Desproduct from './desProduct';


function MainBox() {
    return ( 
       <Box sx={{
            flex: 2,
       }}>
        <Box sx={{ gap: 2, display: 'flex', flexDirection: 'row', }}>
            <Imgproduct/>
            <Desproduct/>
        </Box>
        <Box sx={{
            height: '200px',
            backgroundColor: 'white',
            borderRadius: '8px',
        }}>Comment</Box>
       </Box> 
    );
}

export default MainBox;