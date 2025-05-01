import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Typography,
  Box,
  Link,
  InputAdornment,
  useMediaQuery,
  Alert
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function LoginModal({ open, onClose, onOpenSignUp, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(false);
 

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // const validateForm = () => {
  //   const newErrors = {};
    
  //   if (!username || username.length < 3) {
  //     newErrors.username = "Username must be at least 3 characters long";
  //   }
  //   if (!/^[a-zA-Z0-9]+$/.test(username)) {
  //     newErrors.username = "Username can only contain letters and numbers";
  //   }
    
  //   if (!password || password.length < 8) {
  //     newErrors.password = "Password must be at least 8 characters long";
  //   }
  //   if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(password)) {
  //     newErrors.password = "Password must contain uppercase, lowercase, number and special character";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleLogin = () => {
    // Simulating API call
    if (username === "admin" && password === "123456") {
      setLoginError(false);
      onLoginSuccess();
      onClose();
    } else {
      setLoginError(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose(event, reason);
        }
      }}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "10px",
          boxShadow: 24,
          p: 3,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          Đăng nhập
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          display: fullScreen ? "flex" : "block",
          p: fullScreen ? 1 : 3,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Sai tên đăng nhập hoặc mật khẩu
          </Alert>
        )}

        <TextField
          margin="dense"
          label="Email"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
          onKeyPress={handleKeyPress}
          sx={{ mb: 2 }}
        />

        <TextField
          margin="dense"
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            component="button"
            variant="body2"
            onClick={() => console.log("Forgot password clicked")}
            sx={{ textDecoration: "none" }}
          >
            Quên mật khẩu?
          </Link>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          disabled={!username || !password}
          sx={{
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Đăng nhập
        </Button>
      </DialogActions>
      <Box sx={{ mt: 1, textAlign: "center", width: "100%" }}>
        <Typography variant="body2" component={"span"} sx={{ mr: "5px" }}>
          Bạn chưa có tài khoản?
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={onOpenSignUp}
          sx={{
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          Đăng ký ngay
        </Link>
      </Box>
    </Dialog>
  );
};

export default LoginModal;