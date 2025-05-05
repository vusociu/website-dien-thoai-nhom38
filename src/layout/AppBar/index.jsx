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
import SignUpModal1 from '../../components/Authentication/SignUpModal.jsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const quantity = 0;

function AppBar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setOpenSignUp(false);
  }
  const handleCloseLogin = () => {
    setOpenLogin(false);
  }

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setOpenLogin(false);
  }
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  }

  const handleCartClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      handleOpenLogin();
    }
  };

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
            cursor: "pointer"
          }}
          onClick={() => navigate('/')}
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
          placeholder="Tìm kiếm"
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
      <LoginModal
        open={openLogin}
        onClose={handleCloseLogin}
        onOpenSignUp={handleOpenSignUp}
        onLoginSuccess={() => {
          login({ username: "admin" }); // Thêm thông tin user khi login thành công
          handleCloseLogin();
        }}
      />
      <SignUpModal1
        open={openSignUp}
        onClose={handleCloseSignUp}
        onOpenLogin={handleOpenLogin}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title="Giỏ hàng">
          <IconButton onClick={handleCartClick}>
            <Badge badgeContent={quantity} color="error" showZero max={99}>
              <ShoppingCartIcon sx={{ color: "primary.main" }} />
            </Badge>
          </IconButton>
        </Tooltip>
        {!isAuthenticated ? (
          <Button variant="contained" onClick={handleOpenLogin}>
            Đăng nhập
          </Button>
        ) : (
          <Account logout={logout} />
        )}
      </Box>
    </Box>
  );
}

export default AppBar;
