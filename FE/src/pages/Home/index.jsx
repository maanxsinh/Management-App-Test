import { Box, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductListThunk } from "../../Reducer/productSlice";
import Grid from "@mui/material/Unstable_Grid2";
import Products from "./Content";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Home = () => {
  const userInf = useSelector((state) => state.login.userInf);
  console.log(">>userInf:", userInf);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleManage = () => {
    navigate("/manage");
    const userId = 1;
    dispatch(getProductListThunk(userInf?.role));
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={2.5}>
          <Item elevation={0}>
            <Box>
              {" "}
              {userInf && userInf?.role === "admin" && (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="contained"
                    onClick={() => handleManage()}
                    sx={{ marginBottom: "10px" }}>
                    Manager
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}>
                    Logout
                  </Button>
                </Box>
              )}
              {userInf && userInf?.role === "user" && (
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Logout
                </Button>
              )}
              {!userInf.role && (
                <Button variant="contained" onClick={() => navigate("/login")}>
                  Login
                </Button>
              )}
            </Box>
          </Item>
        </Grid>
        <Grid xs={9.5}>
          <Item elevation={0} sx={{ borderLeft: "1px solid #cccccc" }}>
            <Products />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  // maxHeight: "150vh",
  color: theme.palette.text.secondary,
  marginTop: "10px",
}));
