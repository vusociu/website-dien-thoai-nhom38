import * as React from 'react';
import Box from '@mui/material/Box';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function ListItems() {
    return (
      <Box
        sx={{
          position: "sticky",
          top: "20px",
          minWidth: "200px",
          maxWidth: "200px",
          bgcolor: "background.paper",
          borderRadius: "10px",
          ml: 2,
          height: "fit-content",
          //border: (theme) => `1px solid ${theme.palette.primary.main}`,
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <List
          sx={{ width: "100%" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              sx={{
                borderRadius: "10px",
                color: "black",
              }}
            >
              Danh mục
            </ListSubheader>
          }
        >
          <ListItemButton sx={{ borderRadius: "10px", p: "2px" }}>
            <ListItemIcon>{/* <SendIcon /> */}</ListItemIcon>
            <ListItemText primary="iPhone" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: "10px", p: "2px" }}>
            <ListItemIcon>{/* <DraftsIcon /> */}</ListItemIcon>
            <ListItemText primary="Samsung" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: "10px", p: "2px" }}>
            <ListItemIcon>{/* <DraftsIcon /> */}</ListItemIcon>
            <ListItemText primary="OPPO" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: "10px", p: "2px" }}>
            <ListItemIcon>{/* <DraftsIcon /> */}</ListItemIcon>
            <ListItemText primary="Xiaomi" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: "10px", p: "2px" }}>
            <ListItemIcon>{/* <DraftsIcon /> */}</ListItemIcon>
            <ListItemText primary="Nokia" />
          </ListItemButton>
          <ListItemButton sx={{ borderRadius: "10px", p: "2px" }}>
            <ListItemIcon>{/* <DraftsIcon /> */}</ListItemIcon>
            <ListItemText primary="iPad" />
          </ListItemButton>
        </List>
      </Box>
    );
  }
  
  export default ListItems;
  