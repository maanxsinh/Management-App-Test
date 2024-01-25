import { Box, Typography, styled } from "@mui/material";
import React from "react";

const PageHeader = () => {
  return (
    <Container>
      <Box sx={{ fontWeight: 500, fontSize: "40px" }}>Product Manager</Box>
      <Box sx={{ display: "flex", marginLeft: "20px" }}>
        Home&nbsp;/<Box>&nbsp;Product Manager</Box>
      </Box>
    </Container>
  );
};

export default PageHeader;

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  height: "8vh",
  width: "100vw",
  display: "flex",
  borderBottom: "1px solid #cccccc",
  //   justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
}));
