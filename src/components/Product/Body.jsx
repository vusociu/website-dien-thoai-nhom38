import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item';

function Body() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 15 }}>
        {[1, 2, 3, 1, 2, 3, 1, 2, 3].map((productId, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
            <Item productId={productId} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
  
export default Body;
