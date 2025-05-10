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

function CategoryItems() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState({
    minPrice: undefined,
    maxPrice: undefined,
    sortOrder: "asc"
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const categoryId = searchParams.get('id') || '';
        if (!categoryId) {
          setProducts([]);
          return;
        }
        
        // Get filter parameters from URL if they exist
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        const sortOrder = searchParams.get('sortOrder') || 'asc';
        
        const results = await searchProducts({ 
          categoryId: parseInt(categoryId),
          minPrice: minPrice ? parseInt(minPrice) : undefined,
          maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
          sortOrder
        });
        setProducts(results);
      } catch (err) {
        console.error("Lỗi khi tìm kiếm:", err);
        setError("Lỗi khi tìm kiếm sản phẩm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    }
    fetchCategory();
  }, [searchParams]);

  const handleFilterChange = async (filters) => {
    setFilterParams(filters);
    // Filters are handled by the URL parameters and the useEffect above
  };

  // Render content based on state
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
        <Typography>Không có sản phẩm nào phù hợp</Typography>
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
      <Header onFilterChange={handleFilterChange} />
      {content}
    </Box>
  );
}
  
export default CategoryItems;
