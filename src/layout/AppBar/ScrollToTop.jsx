import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Tooltip } from '@mui/material';

function ScrollToTop() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: {xs: 80, md: 24}, right: 24, zIndex: 1000 }}
      >
        <Tooltip title="Lên đầu trang" arrow placement="left">
          <Fab 
            size="small" 
            aria-label="scroll back to top"
            sx={{
              bgcolor: 'primary.light',
              color: 'primary.dark',
              '&:hover': {
                bgcolor: 'primary.dark',
                color: 'primary.light',
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </Tooltip>
      </Box>
    </Fade>
  );
}

export default ScrollToTop;