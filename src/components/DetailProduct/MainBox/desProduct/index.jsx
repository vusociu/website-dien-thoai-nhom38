import * as React from 'react';
import Box from '@mui/material/Box';
import SelectBox from './SelectBox';
import { useParams } from 'react-router-dom';

let productApi = 'https://website-dien-thoai-nhom38-production.up.railway.app/api/Products';

function Desproduct() {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const [describle, setDescrible] = React.useState(''); // State lưu thông tin mô tả sản phẩm

    // Gọi API để lấy thông tin mô tả sản phẩm
    React.useEffect(() => {
        const fetchProductDescrible = async () => {
            try {
                const response = await fetch(`${productApi}/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product describle');
                }

                const data = await response.json();
                if (data && data.describle) {
                    setDescrible(data.describle); // Cập nhật mô tả sản phẩm
                } else {
                    console.error('No describle found in product data');
                }
            } catch (error) {
                console.error('Error fetching product describle:', error);
            }
        };

        fetchProductDescrible();
    }, [id]); // Gọi lại khi `id` thay đổi

    return (
        <Box
            sx={{
                pt: 0,
                pl: 2,
                pr: 2,
                pb: 2,
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                gap: 2,
            }}
        >
            {/* SelectBox */}
            <Box
                sx={{
                    height: 'fit-content',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                }}
            >
                <SelectBox />
            </Box>

            {/* Mô tả sản phẩm */}
            <Box
                sx={{
                    height: '800px',
                    //height: 'fit-content',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: 2,
                }}
            >
                <h3>Mô tả sản phẩm</h3>
                <p>{describle || 'Đang tải thông tin...'}</p>
            </Box>
        </Box>
    );
}

export default Desproduct;