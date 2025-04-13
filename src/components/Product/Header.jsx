import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';



function Header() {
    return (
        <Box sx={{
            width: '100%',
            height: '60px',
            //borderBottom: (theme) => `1px solid ${theme.palette.primary.main}`,
            display: 'flex',
            alignItems: 'center',
            marginBottom: 2,
            // gap: 2,
        }}
        >
            <Stack spacing={2} direction="row">
                <Button variant="outlined" startIcon={<TrendingUpIcon />}>
                    Giá Cao - Thấp
                </Button>
                <Button variant="outlined" startIcon={<TrendingDownIcon />}>
                    Giá Thấp - Cao
                </Button>
            </Stack>
        </Box>
    )
  }
  
  export default Header;
  