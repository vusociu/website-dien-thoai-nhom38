import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Alert,
  Avatar
} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../api/user';
import { setUserInfo, getUserInfo } from '../../utils/storage';

const UserProfileEdit = () => {
  const { user, login } = useAuth();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    address: user?.address || "",
    roleId: user?.roleId || ""
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user) {
      console.log(user);
      setFormData({
        fullName: user.fullName || "",
        phone: user.phone || "",
        address: user.address || "",
      });
    }
  }, [user]);

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value) error = "Họ và tên là bắt buộc";
        else if (value.length < 2) error = "Họ và tên phải có ít nhất 2 ký tự";
        break;
      case "phone":
        const phoneRegex = /^\d{10}$/;
        if (!value) error = "So điện thoại là bắt buộc";
        else if (!phoneRegex.test(value)) error = "Số điện thoại không hợp lệ (Gồm 10 chữ số từ 0-9)";
        break;
      case "address":
        if (!value) error = "Địa chỉ là bắt buộc";
        break;
      default:
        break;
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleUploadAvatar = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      // Create preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
      
      // Upload immediately
      uploadAvatar(file);
    }
  };

  const uploadAvatar = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('fullName', user.fullName);
      const res = await updateUser(formData);

      const currentUserInfo = getUserInfo();
      const updatedUserInfo = {
        ...currentUserInfo,
        avatar: res.avatar || res.data?.avatar
      };
      setUserInfo(updatedUserInfo);
      login(updatedUserInfo);

      setSnackbar({
        open: true,
        message: "Cập nhật ảnh đại diện thành công!",
        severity: "success"
      });
    } catch (err) {
      console.log(err.message);
      setSnackbar({
        open: true,
        message: "Không thể cập nhật ảnh đại diện. Vui lòng thử lại!",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
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

    try {
      const res = await updateUser(formData);

      const currentUserInfo = getUserInfo();

      const updatedUserInfo = {
        ...currentUserInfo,
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address
      };
      setUserInfo(updatedUserInfo);
      login(updatedUserInfo);

      setSnackbar({
        open: true,
        message: "Cập nhật thông tin thành công!",
        severity: "success"
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Đã có lỗi xảy ra. Vui lòng thử lại!",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: "",
      phone: "",
      address: ""
    });
    setErrors({});
  };

  return (
    <Box px={{ xs: 1, md: 2 }} py={{ xs: 8, md: 4 }}>
      <Paper sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
        <Stack spacing={3}>
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              sx={{ width: 60, height: 60, margin: "0 auto 16px" }}
              alt="Avatar"
              src={avatarPreview}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleUploadAvatar}
              sx={{ textTransform: "none", mb: 1 }}
            >
              Tải ảnh lên
            </Button>
            <Typography variant="h6" component="h1" gutterBottom>
              Chỉnh sửa thông tin cá nhân
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box>
              <Box component="span" sx={{ position: "relative", mr: 3 }}>
                <PersonOutlineIcon
                  sx={{ position: "absolute", fontSize: 20, top: 1 }}
                />
              </Box>
              <Typography variant="subtitle2" component="span">
                Họ và tên
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="fullName"
                placeholder="Nhập họ tên đầy đủ"
                value={formData.fullName}
                onChange={handleInputChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Box mt={2}>
              <Box component="span" sx={{ position: "relative", mr: 3 }}>
                <PhoneOutlinedIcon
                  sx={{ position: "absolute", fontSize: 20, top: 1 }}
                />
              </Box>
              <Typography variant="subtitle2" component="span">
                Số điện thoại
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Box mt={2}>
              <Box component="span" sx={{ position: "relative", mr: 3 }}>
                <LocationOnOutlinedIcon
                  sx={{ position: "absolute", fontSize: 20, top: 1 }}
                />
              </Box>
              <Typography variant="subtitle2" component="span">
                Địa chỉ
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="address"
                placeholder="Nhập địa chỉ chi tiết"
                value={formData.address}
                onChange={handleInputChange}
                error={!!errors.address}
                helperText={errors.address}
                multiline
                rows={3}
                sx={{ mt: 0.5 }}
              />
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                    startIcon={<SaveOutlinedIcon />}
                    disabled={Object.values(errors).some((error) => !!error)}
                  >
                    Lưu thay đổi
                  </Button>
                )}
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                  startIcon={<ClearOutlinedIcon />}
                >
                  Hủy
                </Button>
              </Grid>
            </Grid>
          </form>
        </Stack>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfileEdit;