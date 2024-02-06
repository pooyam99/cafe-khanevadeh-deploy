import React from "react";
import "../../styles/App.css";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { Header, Footer } from "../constants/";

const Main = () => {
  return (
    <Box className="App">
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Outlet />
        <Footer />
      </Container>
    </Box>
  );
};

export default Main;
