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
  Alert,
  CircularProgress
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { register } from "../../api/auth";

const SignUpModal = ({ open, onClose, onOpenLogin }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value) error = "Họ và tên là bắt buộc";
        else if (value.length < 2) error = "Họ và tên phải có ít nhất 2 ký tự";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) error = "Email là bắt buộc";
        else if (!emailRegex.test(value)) error = "Sai định dạng email (VD: abc@example.com)";
        break;
      case "phone":
        const phoneRegex = /^\d{10}$/;
        if (!value) error = "So điện thoại là bắt buộc";
        else if (!phoneRegex.test(value)) error = "Số điện thoại không hợp lệ (Gồm 10 chữ số từ 0-9)";
        break;
      case "password":
        if (!value) error = "Mật khẩu là bắt buộc";
        // else if (value.length < 8) error = "Mật khâu phải có ít nhất 8 ký tự";
        // else if (!/(?=.*[A-Z])/.test(value)) error = "Bao gồm ít nhất một chữ cái viết hoa";
        // else if (!/(?=.*[a-z])/.test(value)) error = "Bao gồm ít nhất một chữ cái viết thường";
        // else if (!/(?=.*\d)/.test(value)) error = "Bao gồm ít nhất một chữ số";
        // else if (!/(?=.*[!@#$%^&*])/.test(value)) error = "Bao gồm ít nhất một ký tự đặc biệt";
        break;
      case "confirmPassword":
        if (!value) error = "Vui lòng nhập lại mật khẩu";
        else if (value !== formData.password) error = "Mật khẩu nhập lại không khớp";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSignUp = async(e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setSignUpError("");

    try {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        roleId: 0,
      };
      const result = await register(userData);
      console.log("Đăng ký thành công:", result);
      onClose();
    } catch (err) {
      console.error("Đăng ký thất bại:", err);
      setSignUpError(err.message || "Đăng ký thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignUp();
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
          px: {xs: 1, md: 3},
          py: {xs: 2, md: 3},
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, position: "relative" }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
          Đăng ký
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
          p: fullScreen? 1 : 3,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {signUpError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {signUpError}
          </Alert>
        )}

        <TextField
          required
          margin="dense"
          label="Họ và tên"
          name="fullName"
          type="text"
          size="small"
          variant="outlined"
          fullWidth
          value={formData.fullName}
          onChange={handleChange}
          error={!!errors.fullName}
          helperText={errors.fullName}
          onKeyPress={handleKeyPress}
          sx={{ mb: 1 }}
        />

        <TextField
          required
          margin="dense"
          label="Email"
          name="email"
          type="email"
          size="small"
          variant="outlined"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          onKeyPress={handleKeyPress}
          sx={{ mb: 1 }}
        />

        <TextField
          required
          margin="dense"
          label="Số điện thoại"
          name="phone"
          type="tel"
          size="small"
          variant="outlined"
          fullWidth
          value={formData.phone}
          onChange={handleChange}
          error={!!errors.phone}
          helperText={errors.phone}
          onKeyPress={handleKeyPress}
          sx={{ mb: 1 }}
        />

        <TextField
          required
          margin="dense"
          label="Mật khẩu"
          name="password"
          type={showPassword ? "text" : "password"}
          size="small"
          variant="outlined"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          onKeyPress={handleKeyPress}
          sx={{ mb: 1 }}
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

        <TextField
          required
          margin="dense"
          label="Nhập lại mật khẩu"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          size="small"
          variant="outlined"
          fullWidth
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          onKeyPress={handleKeyPress}
          sx={{ mb: 1 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          margin="dense"
          label="Địa chỉ"
          name="address"
          type="text"
          size="small"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={formData.address}
          onChange={handleChange}
          error={!!errors.address}
          onKeyPress={handleKeyPress}
          sx={{ mb: 2 }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={handleSignUp}
            disabled={Object.values(errors).some(error => !!error)}
            sx={{
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Đăng ký
          </Button>
        )}
      </DialogActions>
      <Box sx={{ mt: 1, textAlign: "center", width: "100%" }}>
        <Typography variant="body2" component={"span"} sx={{ mr: "5px" }}>
          Bạn đã có tài khoản?
        </Typography>
        <Link
          component="button"
          variant="body2"
          onClick={onOpenLogin}
          sx={{
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          Đăng nhập ngay
        </Link>
      </Box>
    </Dialog>
  );
};

export default SignUpModal;