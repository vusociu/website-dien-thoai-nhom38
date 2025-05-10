import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '../../layout/AppBar/index.jsx';
import MobileNav from '../../layout/AppBar/MobileNav.jsx';
import ListItems from '../../layout/ListItems/index.jsx';
import CategoryResults from '../../components/CategoryResults/index.jsx';
import ScrollToTop from '../../layout/AppBar/ScrollToTop.jsx';

function CategoryPage() {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        height: "100%",
        mb: 20,
      }}
    >
      <AppBar />
      <MobileNav tab={1}/>
      <Box
        sx={{
          paddingTop: "20px",
          bgcolor: "background.default",
          display: "flex",
          height: "calc(100%  - 58px)",
          width: "100%",
        }}
      >
        <ListItems />
        <CategoryResults />
      </Box>
      <ScrollToTop />
    </Container>
  );
}

export default CategoryPage;
