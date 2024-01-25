import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { getProductListThunk } from "../../Reducer/productSlice";

window.Buffer = Buffer;

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.getProductList.productList);
  const userInf = useSelector((state) => state.login.userInf);
  console.log(">>>user inf:", userInf);

  //main

  useEffect(() => {
    const getProductList = () => {
      dispatch(getProductListThunk(userInf.role));
    };
    getProductList();
  }, []);

  return (
    <Box sx={{ marginLeft: "20px" }}>
      <Grid container spacing={2}>
        {productList &&
          productList.length > 0 &&
          productList.map((item) => {
            return (
              <Grid xs={3} key={item.id}>
                <Div
                  key={item.id}
                  onClick={async (e) => {
                    // handleClickProduct();
                    navigate(`/productDetail/${item.id}`);
                  }}>
                  <img
                    src={item.imageToBase64}
                    alt="Girl in a jacket"
                    width="500"
                    height="600"
                    style={{ width: "265px", height: "265px" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}>
                    <Typo
                      sx={{
                        marginTop: "-5px",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                      variant="h6"
                      display="block"
                      gutterBottom>
                      {item.name}
                    </Typo>
                    <Typo
                      sx={{ marginTop: "-10px" }}
                      variant="subtitle2"
                      display="block"
                      gutterBottom>
                      by{" "}
                      <a
                        href="https://www.w3schools.com"
                        style={{
                          margin: "0px 5px",
                          textDecoration: "underline",
                        }}>
                        author
                      </a>
                    </Typo>
                    {!userInf.id ? (
                      <Button>Contact</Button>
                    ) : (
                      <Typo variant="button" display="block" gutterBottom>
                        {item.price}$
                      </Typo>
                    )}
                  </Box>
                </Div>
              </Grid>
            );
          })}
        <Grid xs={3}>
          {/* <button onClick={() => handleTestApi()}>test</button> */}
        </Grid>
      </Grid>
      <Stack spacing={2}></Stack>
    </Box>
  );
};

export default Products;

const Div = styled("div")(({ theme }) => ({
  textAlign: "center",
  height: "360px",
  maxWidth: "265px",
}));
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "360px",
  maxWidth: "265px",
  color: theme.palette.text.secondary,
}));
const Typo = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
}));
