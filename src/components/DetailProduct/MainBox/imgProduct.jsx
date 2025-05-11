import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import Box from '@mui/material/Box';

let productApi = 'https://website-dien-thoai-nhom38-production.up.railway.app/api/Products';
const BASE_URL = "https://website-dien-thoai-nhom38-production.up.railway.app";

function Imgproduct() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id');
    const [selectedImage, setSelectedImage] = React.useState(' ');

    // Call API
    useEffect(() => {
        const fetchProductImages = async () => {
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
                    throw new Error('Failed to fetch product images');
                }
    
                const data = await response.json();
                if (data && data.thumbnail) {
                    setSelectedImage(`${BASE_URL}${data.thumbnail}`); // Cập nhật hình ảnh đầu tiên
                } else {
                    console.error('No images found in product data');
                }
            } catch (error) {
                console.error('Error fetching product images:', error);
            }
        };
    
        fetchProductImages();
    }, [productId]); 

    return ( 
        <Box sx={{
            position: 'sticky',
            padding: 2,
            mb: 4,
            maxWidth: '400px',
            minWidth: '400px',
            // height: '500px',
            height: "fit-content",
            backgroundColor: 'white',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',   
            flex: 1,
       }}>
        <Box sx={{
            width: '368px',
            height: '368px',
            borderRadius: '8px',
            border: 1,
            borderColor: "divider",
            mb: 2,
        }}>

        <Box
        component="img"
        src={selectedImage || null}
        alt="product"
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: '8px',
          objectFit: "contain", 
        }}/>
        </Box>
       </Box> 
     );
}

export default Imgproduct;