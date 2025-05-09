import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../Product/Header';
import SearchItems from './SearchItems';
import { useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title') || '';

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
        <Typography variant="body1" sx={{ m: 2 }}>Kết quả tìm kiếm cho từ khóa: <strong>{title}</strong></Typography>
        <Header/>
        
        <SearchItems/>
      </Box>
  )
}
  
  export default SearchResults;
  