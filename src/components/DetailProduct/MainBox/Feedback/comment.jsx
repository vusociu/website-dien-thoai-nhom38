import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



function Comment() {
    return (   
        
        <Box sx={{padding: 2}}>
            <Box sx={{ borderBottom: '1px solid #ccc', pb: 3}}>
            <Button variant="contained"  sx={{backgroundColor : 'rgb(255, 66, 78)'}}>
            thêm Đánh giá sản phẩm
            </Button>
            </Box>
        </Box>
    );
}

export default Comment;