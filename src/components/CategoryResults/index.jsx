import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CategoryItems from './CategoryItems';
import { useLocation } from 'react-router-dom';

function CategoryResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name') || '';
  const id = searchParams.get('id') || '';

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
        <Typography variant="body1" sx={{ m: 2 }}>Danh mục: <strong>{name}</strong></Typography>
        {/* Header is in CategoryItems */}
        <CategoryItems/>
      </Box>
  )
}
  
export default CategoryResults;
  