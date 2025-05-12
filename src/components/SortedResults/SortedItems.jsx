import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  CircularProgress, 
  Typography,
  Alert
} from '@mui/material';
import Item from '../Product/Item';
import Header from '../Product/Header';
import { searchProducts } from '../../api/products';
import { useSearchParams } from 'react-router-dom';

function SortedItems() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchSortedProducts = async () => {
      try {
        setLoading(true);
        
        // Lấy các tham số lọc từ URL
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const sortOrder = searchParams.get('sortOrder') || 'asc';
        
        const results = await searchProducts({ 
          minPrice: minPrice ? parseInt(minPrice) : undefined,
          maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
          sortOrder
        });
        setProducts(results);
      } catch (err) {
        console.error("Lỗi khi lọc sản phẩm:", err);
        setError("Lỗi khi lọc sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    }
    fetchSortedProducts();
  }, [searchParams]);

  let content;
  if (loading) {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    content = <Alert severity="error">{error}</Alert>;
  } else if (products.length === 0) {
    content = (
      <Box sx={{ p: 2 }}>
        <Typography>Không tìm thấy sản phẩm nào phù hợp</Typography>
      </Box>
    );
  } else {
    content = (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 15 }}>
          {products.map((product, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
              <Item product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      {content}
    </Box>
  );
}
  
export default SortedItems; 