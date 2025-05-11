import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Link as MuiLink,
  Alert,
  CircularProgress,
  Snackbar
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { checkout } from '../../api/checkout';

const Checkout = () => {
  const { user } = useAuth();
  const { selectedItems, clearSelectedItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phoneNumber: user?.phone || '',
    address: user?.address || '',
    note: '',
    paymentMethod: 'cod',
    deliveryTime: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
  });

  // Kiểm tra selectedItems khi component mount


  // Cleanup khi unmount
  // useEffect(() => {
  //   return () => {
  //     clearSelectedItems();
  //   };
  // }, [clearSelectedItems]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "fullName":
        if (!value) error = "Họ và tên là bắt buộc";
        else if (value.length < 2) error = "Họ và tên phải có ít nhất 2 ký tự";
        break;
      case "phoneNumber":
        const phoneRegex = /^\d{10}$/;
        if (!value) error = "So điện thoại là bắt buộc";
        else if (!phoneRegex.test(value)) error = "Số điện thoại không hợp lệ (Gồm 10 chữ số từ 0-9)";
        break;
      case "address":
        if (!value) error = "Địa chỉ là bắt buộc";
        break;
      case "deliveryTime":
        if (!value) error = "Vui lòng chọn ngày nhận hàng";
        break;
      default:
        break;
    }
    return error;
  };

  const totalPrice = selectedItems?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
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
      const orderData = {
        userId: user.id,
        fullname: formData.fullName,
        email: user.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        note: formData.note,
        cartItems: selectedItems.map(item => ({
          productId: item.id,
          price: item.price,
          quantity: item.quantity
        }))
      };
      const res = await checkout(orderData);
      clearCart();
      console.log('Đặt hàng thành công:', res);

      // Reset giỏ hàng và chuyển đến trang thông báo thành công
      navigate('/checkout/success');
    } catch (err) {
      console.error('Lỗi khi đặt hàng:', err);
      setSnackbar({
        open: true,
        message: 'Đặt hàng thất bại. Vui lòng thử lại sau.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!selectedItems?.length) {
    return (
      <Box px={{ xs: 1, md: 2 }} mt={{ xs: 6, md: 0 }} py={2}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: { xs: "none", md: "block" },
            textTransform: "uppercase"
          }}
        >
          Thanh toán
        </Typography>
        <Alert severity="info">
          Không có sản phẩm nào để thanh toán.
          <MuiLink component={Link} to="/cart" sx={{ ml: 1 }}>
            Quay lại giỏ hàng
          </MuiLink>
        </Alert>
      </Box>
    );
  }

  return (
    <Box px={{ xs: 1, md: 2 }} mt={{ xs: 6, md: 0 }} py={2}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          display: { xs: "none", md: "block" },
          textTransform: "uppercase"
        }}
      >
        Thanh toán
      </Typography>

      <Grid container spacing={3}>
        {/* Thông tin sản phẩm */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Sản phẩm đã chọn ({selectedItems.length})
            </Typography>
            <List>
              {selectedItems.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar sx={{ mr: 2 }}>
                      <Avatar
                        alt={item.name}
                        src={item.image}
                        variant="square"
                        sx={{ width: 50, height: 50 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.price.toLocaleString("vi-VN")}₫ x{" "}
                            {item.quantity}
                          </Typography>
                          <Typography
                            component="span"
                            variant="body2"
                            color="primary"
                            sx={{ display: "block" }}
                          >
                            Thành tiền:{" "}
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN"
                            )}
                            ₫
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Form thông tin người nhận */}
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Thông tin người nhận
            </Typography>
            <Stack spacing={2}>
              <TextField
                required
                fullWidth
                size="small"
                label="Họ và tên"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
              <TextField
                required
                fullWidth
                size="small"
                label="Số điện thoại"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    required
                    fullWidth
                    size='small'
                    label="Địa chỉ nhận hàng"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={!!errors.address}
                    helperText={errors.address}
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label="Ghi chú"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                    placeholder="Ghi chú về đơn hàng (nếu có)"
                  />
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Grid>

        {/* Tổng quan đơn hàng và thanh toán */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Phương thức thanh toán
            </Typography>
            <RadioGroup
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
            >
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label="Thanh toán khi nhận hàng (COD)"
              />
            </RadioGroup>
          </Paper>

          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Thời gian nhận hàng
            </Typography>
            <TextField
              required
              fullWidth
              size="small"
              type="date"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleInputChange}
              error={!!errors.deliveryTime}
              helperText={errors.deliveryTime}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: new Date().toISOString().slice(0, 10),
              }}
              sx={{ mt: 1 }}
            />
          </Paper>

          <Paper
            sx={{
              p: 2,
              position: { md: "sticky" },
              top: { md: 20 },
              mb: { xs: 15, md: 0 },
            }}
          >
            <Typography variant="h6" gutterBottom>
              Tổng quan đơn hàng
            </Typography>

            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Tổng tiền hàng:</Typography>
                <Typography>{totalPrice.toLocaleString("vi-VN")}₫</Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Phí vận chuyển:</Typography>
                <Typography>0₫</Typography>
              </Box>

              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  }
                }}
              >
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontSize: "18px" }}>
                    Tổng cộng:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {totalPrice.toLocaleString("vi-VN")}₫
                  </Typography>
                </Box>
                <MuiLink
                  component={Link}
                  to="/cart"
                  variant='body2'
                  underline='hover'
                  color="primary"
                  sx={{ display: "inline-block", mb: 2 }}
                >
                  Quay lại giỏ hàng
                </MuiLink>
                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    mt={2}
                    disabled={
                      !formData.fullName ||
                      !formData.phoneNumber ||
                      !formData.address ||
                      !formData.deliveryTime ||
                      Object.values(errors).some((error) => !!error)
                    }
                  >
                    Đặt hàng
                  </Button>
                )}
              </Box>

              {/* Mobile version */}
              <Paper
                elevation={4}
                sx={{
                  display: { md: "none" },
                  p: 2,
                  position: "fixed",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                }}
              >
                <Box
                  sx={{ display: "flex", justifyContent: "space-between" }}
                  alignItems="center"
                >
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    Tổng cộng:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {totalPrice.toLocaleString("vi-VN")}₫
                  </Typography>
                </Box>
                {loading ? (
                  <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={
                      !formData.fullName ||
                      !formData.phoneNumber ||
                      !formData.address ||
                      !formData.deliveryTime ||
                      Object.values(errors).some((error) => !!error)
                    }
                  >
                    Đặt hàng
                  </Button>
                )}
              </Paper>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Checkout;