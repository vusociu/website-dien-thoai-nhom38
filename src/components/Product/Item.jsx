import React from "react";
import {
  Typography,
  Box,
  Rating,
  Paper,
  Button,
  Stack,
  Tooltip
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Mock data cho testing
const sampleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 31990000,
    image: "https://cdn.tgdd.vn/Products/Images/42/305658/iphone-15-pro-max-blue-titan-1.jpg",
    rating: 4.8
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra 256GB",
    price: 29990000,
    image: "https://cdn.tgdd.vn/Products/Images/42/317748/samsung-galaxy-s24-ultra-xam-1.jpg",
    rating: 4.7
  },
  {
    id: 3,
    name: "OPPO Find N3 5G",
    price: 44990000,
    image: "https://cdn.tgdd.vn/Products/Images/42/315659/oppo-find-n3-vang-1.jpg",
    rating: 4.5
  }
];

const Item = ({ productId = 1 }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Lấy thông tin sản phẩm từ mock data
  const product = sampleProducts.find(p => p.id === productId) || sampleProducts[0];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        height: 400,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 1px 2px 0 rgba(60,64,67,.1),0 2px 6px 2px rgba(60,64,67,.15)",
          cursor: "pointer",
          color: "primary.main",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          width: "100%",
          height: 200,
          objectFit: "contain",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between",
          p: 1,
          gap: 1
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontSize: "16px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            height: "80px",
          }}
        >
          {product.name}
        </Typography>

        <Stack spacing={1}>
          <Typography variant="price">
            {product.price.toLocaleString("vi-VN")}₫
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {product.rating}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            fullWidth
          >
            Thêm vào giỏ
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default Item;
