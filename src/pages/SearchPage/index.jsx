import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import AppBar from '../../layout/AppBar/index.jsx';
import MobileNav from '../../layout/AppBar/MobileNav.jsx';
import ListItems from '../../layout/ListItems/index.jsx';
import SearchResults from '../../components/SearchResults/index.jsx';
import ScrollToTop from '../../layout/AppBar/ScrollToTop.jsx';

function SearchPage() {
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
      <MobileNav />
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
        <SearchResults />
      </Box>
      <ScrollToTop />
    </Container>
  );
}

export default SearchPage;
