import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Snackbar,
  Button,
  IconButton,
  Typography,
  Box,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const productApi = 'https://website-dien-thoai-nhom38-production.up.railway.app/api/Products';
const BASE_URL = "https://website-dien-thoai-nhom38-production.up.railway.app";

function BuyNow() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  const productName = searchParams.get('name');
  
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!productId) {
          throw new Error("Product ID is missing");
        }
        
        const response = await fetch(`${productApi}/${productId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        if (data) {
          setProduct(data);
        } else {
          console.error("Product data is empty");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setSnackbar({
          open: true,
          message: 'Không thể tải thông tin sản phẩm',
          severity: 'error'
        });
      }
    };

    fetchProductData();
  }, [productId]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Vui lòng đăng nhập để thêm vào giỏ hàng',
        severity: 'error',
      });
      return;
    }

    if (!product) {
      setSnackbar({
        open: true,
        message: 'Không thể thêm sản phẩm vào giỏ hàng',
        severity: 'error',
      });
      return;
    }

    addToCart({ 
      id: product.id, 
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: quantity,
    });

    setSnackbar({
      open: true,
      message: 'Đã thêm sản phẩm vào giỏ hàng',
      severity: 'success',
    });
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      setSnackbar({
        open: true,
        message: 'Vui lòng đăng nhập để mua hàng',
        severity: 'error',
      });
      return;
    }

    if (!product) {
      setSnackbar({
        open: true,
        message: 'Không thể mua sản phẩm',
        severity: 'error',
      });
      return;
    }

    // Add to cart then navigate to checkout
    addToCart({ 
      id: product.id, 
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: quantity,
    });
    
    navigate('/cart');
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <Box sx={{
      position: 'sticky',
      padding: 2,
      maxWidth: '300px',
      minWidth: '300px',
      height: '300px',
      backgroundColor: 'white',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    }}>
      {/* <Box sx={{
            height: '65px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: 1,
            borderColor: "divider",
            pb: '12px',
        }}>
            <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }}>N</Avatar>
            <div>Shop abc</div>
        </Box> */}

      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Số Lượng</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleDecrease} sx={{ border: '1px solid #ccc', }}>
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ minWidth: '30px', textAlign: 'center', }}>{quantity}</Typography>
          <IconButton onClick={handleIncrease} sx={{ border: '1px solid #ccc' }}>
            <AddIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Tạm tính</Typography>
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: 'rgb(255, 66, 78)' }}>
          {product ? (quantity * product.price).toLocaleString() : 0}đ
        </Typography>
      </Box>

      <Box sx={{ gap: 1, flexDirection: 'column', display: 'flex', mt: 'auto' }}>
        <Button 
          variant="contained" 
          sx={{ backgroundColor: 'rgb(255, 66, 78)' }}
          onClick={handleBuyNow}
        >
          Mua ngay
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleAddToCart}
        >
          Thêm vào giỏ
        </Button>
      </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BuyNow;