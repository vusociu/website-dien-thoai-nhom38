import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../api/categories';

function ListItems() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const getCategories = async () => {
        try {
          const data = await fetchCategories();
          setCategories(data);
          setError(null);
        } catch (err) {
          console.error("Lỗi lấy danh mục:", err);
          setError("Không thể tải danh mục. Vui lòng thử lại sau.");
        }
      };
      
      getCategories();
    }, []);

    const handleCategoryClick = (categoryName) => {
      navigate(`/category/${categoryName}`);
    };

    return (
      <Box
        sx={{
          position: "sticky",
          top: "20px",
          minWidth: "200px",
          maxWidth: "200px",
          bgcolor: "background.paper",
          borderRadius: "10px",
          ml: 2,
          height: "fit-content",
          //border: (theme) => `1px solid ${theme.palette.primary.main}`,
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{
                borderRadius: "10px",
                color: "black",
              }}
            >
              Danh mục
            </ListSubheader>
          }
        >
          {error ? (
            <Alert severity="error" sx={{ mx: 1, my: 1 }}>{error}</Alert>
          ) : (
            categories.map((category) => (
              <ListItemButton 
                key={category.id} 
                sx={{ borderRadius: "10px", p: "2px" }}
                onClick={() => handleCategoryClick(category.name)}
              >
                <ListItemIcon>{/* Icon can be added here */}</ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItemButton>
            ))
          )}
        </List>
      </Box>
    );
  }
  
  export default ListItems;
  