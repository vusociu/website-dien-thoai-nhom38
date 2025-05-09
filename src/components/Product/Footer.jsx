import * as React from 'react';
import Box from '@mui/material/Box';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';

function Footer({ onLoadMore }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        marginTop: 2,
        justifyContent: "center",
      }}
    >
      <Button 
        variant="text" 
        startIcon={<ArrowDownwardIcon />}
        onClick={onLoadMore}
      >
        Xem thêm sản phẩm
      </Button>
    </Box>
  );
}

export default Footer;
  