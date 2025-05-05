import React from "react";
import { Container } from "@mui/material";

import AppBar from "../../layout/AppBar/index.jsx";
import Cart from "../../components/Cart/index.jsx";

const CartPage = () => {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: "100%" }}>
            <AppBar />
            <Cart />
        </Container>
    )

}

export default CartPage;