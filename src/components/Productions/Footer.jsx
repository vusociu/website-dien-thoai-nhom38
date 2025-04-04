import * as React from 'react';
import Box from '@mui/material/Box';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';



function Footer() {
    return (
      <Box sx={{
            width: '100%',
            height: '60px',
            borderTop: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: 'flex',
            alignItems: 'center',
            marginTop: 2,
            justifyContent: 'center',
            // gap: 2,
        }}
        >
         <Button variant="outlined" startIcon={<ArrowDownwardIcon />}>
                  Xem thêm sản phẩm
         </Button>
        </Box>
    )
  }
  
  export default Footer;
  