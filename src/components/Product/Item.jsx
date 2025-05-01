import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Rating, CardActions, Paper } from "@mui/material";

const Item = ({ product, onClick }) => {
  // product: { id, name, image, price, rating }

  return (
    <Paper
      variant="outlined"
      sx={{
        height: 400,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
        overflow:"hidden",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          cursor: "pointer",
          boxShadow: 2,
          color: "primary.main",
        },
        display: "flex",
        flexDirection: "column",
      }}
      onClick={() => {}}
    >
      <Box
        component="img"
        src="https://salt.tikicdn.com/cache/750x750/ts/product/30/f1/ec/bbde43f59e7724c4c474bb81f388f98e.jpg.webp"
        alt="product"
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
        }}
      >
        <Typography 
          variant="subtitle2" 
          component="div" 
          sx={{
            fontSize: "16px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            height: "80px",
          }}
        >
          San pham 
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="price" component="div">
            {/*product.price.toLocaleString()*/}123₫
          </Typography>
          <Rating component="div" value={4.3} precision={0.1} readOnly size="small" />
        </Box>
        
      </Box>
      
    </Paper>
  );
};

export default Item;
