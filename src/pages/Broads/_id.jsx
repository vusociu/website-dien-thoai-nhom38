import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '../../layout/AppBar/index.jsx';
import ListItems from '../../layout/ListItems/index.jsx';
import Productions from '../../components/Product/index.jsx';

function Broad() {
    return (
      <>
        <Container disableGutters maxWidth={false} sx={{ height: "100%" }}>
          <AppBar />
          <Box
            sx={{
              paddingTop: "20px",
              backgroundColor: "primary.main",
              bgcolor: "background.default",
              display: "flex",
              height: "calc(100%  - 58px)",
              width: "100%",
            }}
          >
            <ListItems />
            <Productions />
          </Box>
        </Container>
      </>
    );
  }
  
  export default Broad
  