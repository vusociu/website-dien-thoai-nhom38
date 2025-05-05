import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Paper,
  Divider,
  Container,
  Alert,
  Stack
} from "@mui/material";
import CartItem from "./CartItem";

const Cart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Áo thun nam",
      price: 299000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },
    {
      id: 2,
      name: "Quần jean nữ",
      price: 499000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
    },
    {
      id: 3,
      name: "Quần jean nữ",
      price: 499000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246"
    }
  ]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const totalPrice = useMemo(() =>
    items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleUpdateQuantity = (id, newQuantity) => {
    setItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setItems(prev => prev.filter(item => item.id !== itemToDelete.id));
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <Box px={{xs:1, md: 2}}>
      <Box py={2}>
        <Typography variant="h5" gutterBottom sx={{textTransform: "uppercase"}}>
          Giỏ hàng
        </Typography>
        {items.length === 0 ? (
          <Alert severity="info">Giỏ hàng trống</Alert>
        ) : (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 9 }}>
              {items.map(item => (
                <CartItem 
                  key={item.id}
                  item={item} 
                  onUpdateQuantity={handleUpdateQuantity}
                  onDelete={handleDeleteClick} 
                />
              ))}
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Paper 
                elevation={1}
                sx={{ 
                  p: {xs: 2, md: 3}, 
                  position: { md: "sticky"}, 
                  top: { md: 24 },
                  mb: { xs: 15, md: 0 },
                }}
              >
                <Stack spacing={1.8}>
                  <Typography variant="h6">
                    Thông tin đơn hàng
                  </Typography>
                  <Divider />
                  <TextField
                    fullWidth
                    label="Địa chỉ nhận hàng"
                    value={deliveryAddress}
                    onChange={e => setDeliveryAddress(e.target.value)}
                    multiline
                    rows={2}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    label="Thời gian giao hàng"
                    type="datetime-local"
                    value={deliveryTime}
                    onChange={e => setDeliveryTime(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                  <Box 
                    sx={{
                      display: {xs: "none", md: "block"},
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2" sx={{fontSize: "18px"}}>Tổng cộng:</Typography>
                      <Typography variant="h6" color="primary">
                        {totalPrice.toLocaleString("vi-VN")}₫
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={!deliveryAddress || !deliveryTime}
                    >
                      Đặt hàng
                    </Button>
                  </Box>
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
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="subtitle2" sx={{fontSize: "16px"}}>Tổng cộng:</Typography>
                      <Typography variant="h6" color="primary">
                        {totalPrice.toLocaleString("vi-VN")}₫
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={!deliveryAddress || !deliveryTime}
                    >
                      Đặt hàng
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
          <Typography>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Cart;