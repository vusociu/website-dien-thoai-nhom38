import Box from '@mui/material/Box';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Tooltip from '@mui/material/Tooltip';
import Account from './account.jsx';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import LoginModal from '../../components/Authentication/LoginModal.jsx';
import React, { useState } from 'react';

const quantity = 0;

function AppBar() {
  const [openLogin, setOpenLogin] = useState(false);
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.white",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}>
        <SmartphoneIcon sx={{ color: "primary.main" }} />
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "primary.main",
          }}
        >
          Project
        </Typography>
      </Box>

      <Box
        sx={{
          width: 600,
          maxWidth: "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "10px",
            },
            "&:hover fieldset": { borderColor: "primary.main" },
            "&.Mui-focused fieldset": { borderColor: "primary.main" },
          },
        }}
      >
        <TextField
          id="outlined-search"
          // label=""
          placeholder='Tìm kiếm'
          type="search"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "primary.main" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Button
        variant='contained'
        onClick={() => setOpenLogin(true)}
      >
        Đăng nhập
      </Button>
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title="Giỏ hàng">
          <IconButton>
            <Badge badgeContent={quantity} color="error" showZero max={99}>
              <ShoppingCartIcon sx={{ color: "primary.main" }} />
            </Badge>
          </IconButton>
        </Tooltip>
        <Account />
      </Box>
    </Box>
  );
}

export default AppBar;
