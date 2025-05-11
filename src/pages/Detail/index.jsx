import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '../../layout/AppBar/index.jsx';
import BuyNow from '../../components/DetailProduct/BuyNow/index.jsx';
import MainBox from '../../components/DetailProduct/MainBox/index.jsx';


function Detail() {
    return (
      <>
        <Container disableGutters maxWidth={false} sx={{ height: "100%" }}>
          <AppBar />
          <Box
            sx={{
              paddingTop: "20px",
              pl: 3,
              pr: 3,
              backgroundColor: "primary.main",
              bgcolor: "background.default",
              display: "flex",
              height: "calc(100%  - 58px)",
              width: "100%",
              gap: 2,
            }}>
                <MainBox/>
                <BuyNow/>
          </Box>
        </Container>
      </>
    );
  }
  
  export default Detail;
  