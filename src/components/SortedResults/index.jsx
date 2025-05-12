import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SortedItems from './SortedItems';
import { useLocation } from 'react-router-dom';

function SortedResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

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
        {/* Header is in SortedItems */}
        <SortedItems/>
      </Box>
  )
}
  
  export default SortedResults;
  