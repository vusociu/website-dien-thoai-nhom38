import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Link } from "react-router-dom";

const CartItem = ({ item, onUpdateQuantity, onDelete }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
          mb: "10px",
          borderRadius: "10px",
          position: "relative",
          p: 1
      }}>
      <IconButton
        aria-label="Xóa"
        onClick={() => onDelete(item)}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <DeleteTwoToneIcon color="error"/>
      </IconButton>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <Box
            component="img"
            src={item.image}
            alt={item.name}
            sx={{
              width: {
                xs: "80px",
                md: "100px",
              }, 
              height: {
                xs: "80px",
                md: "100px",
              }, 
              objectFit: "contain" 
            }}
          />
        </Grid>
        <Grid size={{ xs: 8, md: 5 }}>
          <Typography 
            variant="subtitle1" 
            component={Link}
            to={`/product/${item.id}`}
            sx={{
              color: "inherit",
              fontSize: "14px",
              textDecoration: "none",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.5",
              height: "40px",
              '&:hover': {
                color: "primary.main",
                cursor: "pointer",
              }
            }}
          >
            {item.name}
          </Typography>
          <Typography color="textSecondary">
            {item.price.toLocaleString("vi-VN")}đ
          </Typography>
        </Grid>
        <Grid size={{ xs: 5, md: 2 }}>
          <Box display="flex" alignItems="center">
            <IconButton
              aria-label="Giảm"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              sx={{ padding: "4px", "&:hover": { backgroundColor: "#e0e0e0" } }}
            >
              <RemoveRoundedIcon />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 1;
                handleQuantityChange(val);
              }}
              type="tel"
              size="small"
              inputProps={{ 
                
                sx: {
                  textAlign: "center",
                  py: "4px",
                  px: "2px",
                }
              }}
              sx={{ width: "40px", mx: 0 }}
            />
            <IconButton
              aria-label="Tăng"
              onClick={() => handleQuantityChange(quantity + 1)}
              sx={{ padding: "4px", "&:hover": { backgroundColor: "#e0e0e0" } }}
            >
              <AddRoundedIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid size={{ xs: 7, md: 3 }} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography 
            variant="price"
            sx={{
              textAlign: "center",
            }}
          >
            {(item.price * quantity).toLocaleString("vi-VN")}₫
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CartItem;