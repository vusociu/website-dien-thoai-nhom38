import React, { useState, useEffect } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  ListItemButton,
  Alert,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import LoginModal from '../../components/Authentication/LoginModal.jsx';
import SignUpModal from '../../components/Authentication/SignUpModal.jsx';
import { fetchCategories } from '../../api/categories';

const MobileNav = () => {
  const [value, setValue] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { isAuthenticated, logout, login } = useAuth();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        // Add route property to each category
        const categoriesWithRoutes = data.map(category => ({
          ...category,
          route: `/category/${category.name}`
        }));
        setCategories(categoriesWithRoutes);
        setError(null);
      } catch (err) {
        console.error("Lỗi lấy danh mục:", err);
        setError("Không thể tải danh mục. Vui lòng thử lại sau.");
      }
    };
    
    getCategories();
  }, []);

  const handleOpenLogin = () => {
    setOpenLogin(true);
    setOpenSignUp(false);
  }
  const handleCloseLogin = () => {
    setOpenLogin(false);
    setValue(0);
  }

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setOpenLogin(false);
  }
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
    setValue(0);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setCategoryDialogOpen(true);
    } else if (newValue === 2 && isAuthenticated) {
      setProfileMenuAnchor(event.currentTarget);
    } else if (newValue === 2 && !isAuthenticated) {
      handleOpenLogin();
    }
  };

  const handleCategorySelect = (route) => {
    setCategoryDialogOpen(false);
    setValue(0);
    navigate(route);
  };

  const handleProfileMenuSelect = (route) => {
    setProfileMenuAnchor(null);
    setValue(0);
    console.log(`Navigating to: ${route}`);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
    setValue(0);
  };

  const handleLogout = () => {
    logout();
    setProfileMenuAnchor(null);
    setValue(0);
    navigate('/');
  };

  const handleProfile = () => {
    setProfileMenuAnchor(null);
    navigate("/edit-profile");
  };

  return (
    <>
      <Paper
        sx={{
          position: "fixed",
          display: { xs: 'block', md: 'none' },
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.12)",
          zIndex: 1000
        }}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          aria-label="bottom navigation"
        >
          <BottomNavigationAction
            label="Trang chủ"
            icon={<HomeIcon />}
            aria-label="home page"
          />
          <BottomNavigationAction
            label="Danh mục"
            icon={<WidgetsRoundedIcon />}
            aria-label="categories"
          />
          {isAuthenticated ? (
            <BottomNavigationAction
              label="Tài khoản"
              icon={<AccountCircleIcon />}
              aria-label="user profile"
            />
          ) : (
            <BottomNavigationAction
              label="Đăng nhập"
              icon={<LoginIcon />}
              aria-label="login"
            />
          )}
        </BottomNavigation>
      </Paper>

      <Dialog
        open={categoryDialogOpen}
        onClose={() => {
          setCategoryDialogOpen(false);
          setValue(0);
        }}
        fullWidth
        maxWidth="sm"
        aria-labelledby="category-dialog-title"
      >
        <DialogTitle>Danh mục</DialogTitle>
        <DialogContent>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <List>
              {categories.map((category) => (
                <ListItemButton
                  key={category.id}
                  onClick={() => handleCategorySelect(category.route)}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>

      <Menu
        anchorEl={profileMenuAnchor}
        open={Boolean(profileMenuAnchor)}
        onClose={handleProfileMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MenuItem onClick={handleProfile}>
          <Avatar sx={{ width: 28, height: 28 , mr: 2}}/> 
          Thông tin tài khoản
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>

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
    </>
  );
};

export default MobileNav;