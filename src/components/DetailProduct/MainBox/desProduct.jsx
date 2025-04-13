import * as React from 'react';
import Box from '@mui/material/Box';


function Desproduct() {
    return ( 
        <Box sx={{
            pt: 0,
            pl: 2,
            pr: 2,
            pb: 2,
            height: "fit-content",
            display: 'flex',
            flexDirection: 'column',   
            flex: 1,
            gap: 2,
       }}>
        <Box sx={{
            // height: "fit-content",
            height: '200px',
            backgroundColor: 'white',
            borderRadius: '8px',
        }}>Select</Box>
        <Box sx={{
            // height: "fit-content",
            height: '200px',
            backgroundColor: 'white',
            borderRadius: '8px',
        }}>Detail</Box>
        <Box sx={{
            // height: "fit-content",
            height: '1000px',
            backgroundColor: 'white',
            borderRadius: '8px',
        }}>Describle</Box>
       </Box> 
     );
}

export default Desproduct;