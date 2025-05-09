import React from "react";
import {
  Container,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import AppBar from "../../layout/AppBar/index.jsx";
import UserProfileEdit from '../../components/UserProfileEdit';

const UserProfileEditPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100%" }}>
      {isMobile ? (
        <MuiAppBar
          sx={{
            borderRadius: "0px",
          }}
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Sửa thông tin
            </Typography>
          </Toolbar>
        </MuiAppBar>
      ) : (
        <AppBar />
      )}
      <UserProfileEdit />
    </Container>
  );
};

export default UserProfileEditPage;