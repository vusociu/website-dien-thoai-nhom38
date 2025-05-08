import * as React from 'react';
import Box from '@mui/material/Box';
import Imgproduct from './imgProduct';
import Desproduct from '../MainBox/desProduct/index.jsx'
import Feedback from './Feedback/index.jsx';


function MainBox() {
    return ( 
       <Box sx={{
            flex: 2,
       }}>
        <Box sx={{ gap: 2, display: 'flex', flexDirection: 'row', }}>
            <Imgproduct/>
            <Desproduct/>
        </Box>
        <Feedback/>
       </Box> 
    );
}

export default MainBox;