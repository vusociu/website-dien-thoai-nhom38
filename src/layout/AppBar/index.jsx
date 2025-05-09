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
import SignUpModal from '../../components/Authentication/SignUpModal.jsx';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function AppBar() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const { cartItems } = useCart();

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

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
      <Box onClick={() => navigate('/')} sx={{ display: "flex", alignItems: "center", cursor: "pointer", gap: 1, mr: 2 }}>
        <SmartphoneIcon  sx={{ color: "primary.main" }} />
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "primary.main",
            display: { xs: "none", md: "block" },
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
          placeholder="Tìm kiếm"
          type="search"
          size="small"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/search?title=${encodeURIComponent(searchText)}`);
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "primary.main" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Gọi login */}
      <LoginModal
        open={openLogin}
        onClose={handleCloseLogin}
        onOpenSignUp={handleOpenSignUp}
        onLoginSuccess={(userData) => {
          login(userData); 
          console.log("Login success");
          handleCloseLogin();
        }}
      />
      {/* Gọi sign up */}
      <SignUpModal
        open={openSignUp}
        onClose={handleCloseSignUp}
        onOpenLogin={handleOpenLogin}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title="Giỏ hàng">
          <IconButton onClick={handleCartClick}>
            <Badge badgeContent={cartItemCount} color="error" showZero max={99}>
              <ShoppingCartIcon sx={{ color: "primary.main" }} />
            </Badge>
          </IconButton>
        </Tooltip>
        {!isAuthenticated ? (
          <Button variant="contained" onClick={handleOpenLogin} sx={{display: { xs: "none", md: "block" }}}>
            Đăng nhập
          </Button>
        ) : (
          <Box sx={{display: { xs: "none", md: "block" }}}>
            <Account logout={logout}/>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AppBar;
