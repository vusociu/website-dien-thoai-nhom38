import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
  Alert,
  Stack,
  Link as MuiLink,
} from "@mui/material";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, selectItemsForCheckout, clearCart } = useCart();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [clearAllDialogOpen, setClearAllDialogOpen] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id);
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleClearAllClick = () => {
    setClearAllDialogOpen(true);
  };

  const handleConfirmClearAll = () => {
    clearCart();
    setClearAllDialogOpen(false);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    selectItemsForCheckout(cartItems);
    navigate('/checkout');
  };

  return (
    <Box px={{ xs: 1, md: 2 }} mt={{ xs: 6, md: 0 }}>
      <Box py={2}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: { xs: "none", md: "block" },
            textTransform: "uppercase",
          }}
        >
          Giỏ hàng
        </Typography>
        {cartItems.length === 0 ? (
          <Alert severity="info">
            Giỏ hàng trống.
            <MuiLink component={Link} to="/" sx={{ ml: 1 }}>
              Quay lại trang mua hàng
            </MuiLink>
          </Alert>

        ) : (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 9 }}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onDelete={handleDeleteClick}
                />
              ))}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={handleClearAllClick}
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Xóa tất cả
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <Paper
                elevation={1}
                sx={{
                  p: { xs: 2, md: 3 },
                  display: { xs: "none", md: "block" },
                  position: { md: "sticky" },
                  top: { md: 24 },
                  mb: { xs: 15, md: 0 },
                }}
              >
                <Stack spacing={1.8}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle2" sx={{ fontSize: "18px" }}>
                      Tổng cộng:
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {totalPrice.toLocaleString("vi-VN")}₫
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={cartItems.length === 0}
                    onClick={handleCheckout}
                    sx={{ mt: 2 }}
                  >
                    Thanh toán
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    fullWidth
                    onClick={() => navigate(-1)}
                    sx={{
                      textTransform: "none",
                    }}
                  >
                    Tiếp tục mua hàng
                  </Button>
                </Stack>
              </Paper>
              <Paper
                elevation={4}
                sx={{
                  p: 2,
                  position: "fixed",
                  display: { md: "none" },
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    Tổng cộng:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {totalPrice.toLocaleString("vi-VN")}₫
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  Thanh toán
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  fullWidth
                  onClick={() => navigate(-1)}
                  sx={{
                    textTransform: "none",
                    mt: 1
                  }}
                >
                  Tiếp tục mua hàng
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        sx={{ "& .MuiDialog-paper": { borderRadius: "10px" } }}
      >
        <DialogTitle id="delete-dialog-title">Xóa sản phẩm</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={clearAllDialogOpen}
        onClose={() => setClearAllDialogOpen(false)}
        aria-labelledby="clear-all-dialog-title"
        sx={{ "& .MuiDialog-paper": { borderRadius: "10px" } }}
      >
        <DialogTitle id="clear-all-dialog-title">Xóa tất cả sản phẩm</DialogTitle>
        <DialogContent>
          <Typography>
            Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi giỏ hàng?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearAllDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirmClearAll} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Cart;