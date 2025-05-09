import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from '../Product/Item';
import { searchProducts } from '../../api/products';
import { useSearchParams } from 'react-router-dom';

function SearchItems() {
  const [products, setProducts] = useState([]);
  const [params] = useSearchParams();

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const title = params.get('title') || '';
        const results = await searchProducts({ title });
        setProducts(results);
      } catch (err) {
        console.error("Lỗi khi tìm kiếm:", err);
      }
    }
    fetchSearch();
  }, [params]);

  return (
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
  
export default SearchItems;
