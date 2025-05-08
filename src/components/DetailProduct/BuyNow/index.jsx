import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

let productApi = 'https://website-dien-thoai-nhom38-production.up.railway.app/api/Products';

function BuyNow() {
    const { id } = useParams();
    const [quantity, setQuantity] = React.useState(1); // State quản lý số lượng
    const [price, setPrice] = React.useState(0);
// call API
    useEffect(() => {
        const fetchProductPrice = async () => {
            try {
                const response = await fetch(`${productApi}/${id}`, {
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
                    setPrice(data.price); // Lấy giá sản phẩm từ API
                } else {
                    console.error("Product data is empty");
                }
            } catch (error) {
                console.error("Error fetching product price:", error);
            }
        };
    
        fetchProductPrice();
    }, [id]);

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
            // height: "fit-content",
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
                {(quantity * price).toLocaleString()}đ
            </Typography>
        </Box>


        <Box sx={{ gap :1 , flexDirection: 'column', display :'flex', mt: 2}}>
        <Button variant="contained"  sx={{backgroundColor : 'rgb(255, 66, 78)'}}>Mua ngay</Button>
        <Button variant="outlined">Thêm vào giỏ</Button>
        </Box>


       </Box> 
    );
}

export default BuyNow;