import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Item from './Item';


function Body() {
	return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 15 }}>
        {Array.from(Array(15)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
            <Item/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
  
  export default Body;
  