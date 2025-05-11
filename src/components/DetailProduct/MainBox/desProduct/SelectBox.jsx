import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

let productApi = 'https://website-dien-thoai-nhom38-production.up.railway.app/api/Products';

function SelectBox() {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id');
    // const [selectedColor, setSelectedColor] = React.useState('Xanh Dương');
    // const [selectedCapacity, setSelectedCapacity] = React.useState('128GB');
    const [price, setPrice] = React.useState('');
    const [namePhone, setNamePhone] = React.useState('Loading...');

    // const colors = [
    //     { name: 'Đen', image: 'https://via.placeholder.com/50/000000' },
    //     { name: 'Hồng', image: 'https://via.placeholder.com/50/FFC0CB' },
    //     { name: 'Xanh Dương', image: 'https://via.placeholder.com/50/0000FF' },
    // ];

    // const capacities = ['128GB', '256GB', '512GB'];

// call API
    useEffect(() => {
        const fetchProductDetails = async () => {
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
                    throw new Error('Failed to fetch product details');
                }
    
                const data = await response.json();
                setPrice(data.price); // Cập nhật giá sản phẩm
                setNamePhone(data.title); // Cập nhật tên sản phẩm
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };
    
        fetchProductDetails();
    }, [productId]);

    return (
        <Box sx={{
            padding: 2,
            backgroundColor: 'white',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            {/* Thông tin sản phẩm */}
            <Box>
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', mt: 1 }}>
                    {namePhone}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                    <Typography sx={{ fontSize: '28px', fontWeight: 'bold', color: 'rgb(255, 66, 78)' }}>
                    {price ? price.toLocaleString() : ''}đ
                    </Typography>
                </Box>
            </Box>

            {/* Màu sắc */}
            {/* <Box>
                <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Màu sắc</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {colors.map((color, index) => (
                        <Button
                            key={index}
                            onClick={() => setSelectedColor(color.name)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                border: selectedColor === color.name ? '2px solid blue' : '1px solid #ccc',
                                borderRadius: '8px',
                                padding: 1,
                                minWidth: '80px',
                                backgroundColor: selectedColor === color.name ? '#f0f8ff' : 'white',
                            }}
                        >
                            <img
                                src={color.image}
                                alt={color.name}
                                style={{ width: '50px', height: '50px', borderRadius: '8px' }}
                            />
                            <Typography sx={{ mt: 1, fontSize: '14px' }}>{color.name}</Typography>
                        </Button>
                    ))}
                </Box>
            </Box> */}

            {/* Dung lượng */}
            {/* <Box>
                <Typography sx={{ fontWeight: 'bold', mb: 1 }}>Dung lượng</Typography>
                <Select
                    value={selectedCapacity}
                    onChange={(e) => setSelectedCapacity(e.target.value)}
                    sx={{
                        width: '150px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                    }}
                >
                    {capacities.map((capacity, index) => (
                        <MenuItem key={index} value={capacity}>
                            {capacity}
                        </MenuItem>
                    ))}
                </Select>
            </Box> */}
        </Box>
    );
}

export default SelectBox;