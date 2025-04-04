import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


//#1A2027
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '250px',
    // color: theme.palette.text.secondary,
  }));

function Body() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={5}> 
            {Array.from(Array(15)).map((_, index) => (
            <Grid xs={1} sm={1} md={1} key={index}>
                <Item>
                    {/* Hình ảnh sản phẩm */}
                        <img 
                        src="https://via.placeholder.com/100" 
                        alt={`Sản phẩm ${index + 1}`} 
                        sx={{ width: '80%', 
                        height: '50%', 
                        objectFit: 'contain',
                        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                        }} 
                    />
                    {/* Tên sản phẩm */}
                    {/* <Typography variant="h6" sx={{ marginTop: 1 }}>
                        Tên sản phẩm {index + 1}
                    </Typography> */}
                    
                    {/* Giá sản phẩm */}
                    {/* <Typography variant="body1" color="error">
                        1.000.000đ
                    </Typography> */}
                    {/* Nút mua ngay */}
                    <Button variant="contained" color="primary">
                        Mua ngay
                    </Button>
                </Item>
            </Grid>
            ))}
        </Grid>
    </Box>
    )
  }
  
  export default Body;
  