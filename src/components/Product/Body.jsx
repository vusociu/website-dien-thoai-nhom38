import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item';
import Footer from './Footer';
import { fetchProducts } from '../../api/products';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

function Body() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(20);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts(prev => prev + 20);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 15 }}>
        {products.slice(0, visibleProducts).map((product, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 3 }}>
            <Item product={product} />
          </Grid>
        ))}
      </Grid>
      {products.length > visibleProducts && (
        <Footer onLoadMore={handleLoadMore} />
      )}
    </Box>
  );
}
  
export default Body;
