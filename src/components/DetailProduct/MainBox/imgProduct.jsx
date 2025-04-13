import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Imgproduct() {
  const [selectedImage, setSelectedImage] = React.useState(
    "https://salt.tikicdn.com/cache/750x750/ts/product/30/f1/ec/bbde43f59e7724c4c474bb81f388f98e.jpg.webp"
    );

    const images = [
        "https://salt.tikicdn.com/cache/750x750/ts/product/30/f1/ec/bbde43f59e7724c4c474bb81f388f98e.jpg.webp",
        "https://salt.tikicdn.com/cache/100x100/ts/product/a4/0b/48/e7d16a01107c0558d488d4237146ad5e.jpg.webp",
        "https://salt.tikicdn.com/cache/100x100/ts/product/af/bf/d1/45c3394081781b2f1c65a9f03c14beb5.jpg.webp",
        "https://salt.tikicdn.com/cache/100x100/ts/product/8f/3a/ed/a89767aee8305dfc41427b2aaf164ac1.jpg.webp",
        "https://salt.tikicdn.com/cache/100x100/ts/product/8f/3a/ed/a89767aee8305dfc41427b2aaf164ac1.jpg.webp",
        "https://salt.tikicdn.com/cache/100x100/ts/product/8f/3a/ed/a89767aee8305dfc41427b2aaf164ac1.jpg.webp",
        "https://salt.tikicdn.com/cache/100x100/ts/product/8f/3a/ed/a89767aee8305dfc41427b2aaf164ac1.jpg.webp",
        "https://salt.tikicdn.com/cache/100x100/ts/product/8f/3a/ed/a89767aee8305dfc41427b2aaf164ac1.jpg.webp",
        "https://salt.tikicdn.com/cache/100x100/ts/product/a4/0b/48/e7d16a01107c0558d488d4237146ad5e.jpg.webp",

    ];

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const scrollRef = React.useRef(null);

    const handleScrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft -= 100; // Dịch chuyển sang trái 100px
        }
    };

    const handleScrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 100; // Dịch chuyển sang phải 100px
        }
    };

    return ( 
        <Box sx={{
            position: 'sticky',
            padding: 2,
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
        src={selectedImage}
        alt="product"
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: '8px',
          objectFit: "contain", 
        }}/>
        </Box>

            {/* Danh sách hình ảnh với nút điều hướng */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Nút cuộn trái */}
                <IconButton onClick={handleScrollLeft}>
                    <NavigateBeforeIcon />
                </IconButton>

                {/* Danh sách hình ảnh */}
                <Box
                    ref={scrollRef}
                    sx={{
                        display: 'flex',
                        gap: 1,
                        overflowX: 'hidden', // Ẩn thanh cuộn ngang
                        height: '54px',
                        flex: 1,
                    }}
                >
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            component="img"
                            src={image}
                            alt={`product-${index}`}
                            onClick={() => handleImageClick(image)}
                            sx={{
                                width: '54px',
                                height: '54px',
                                borderRadius: '8px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                                border: selectedImage === image ? '2px solid blue' : '1px solid #ccc',
                                transition: 'border 0.3s',
                            }}
                        />
                    ))}
                </Box>

                {/* Nút cuộn phải */}
                <IconButton onClick={handleScrollRight}>
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        
       </Box> 
     );
}

export default Imgproduct;