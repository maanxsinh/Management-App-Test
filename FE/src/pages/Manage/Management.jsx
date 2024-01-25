import { Box, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import CreateProduct from "../../components/dialog/createProduct";
import { formatDate, setSnackbar } from "../../utils/commonUtils";
import SnackbarComponent from "../../components/Snackbar";
import {
  deleteProduct,
  getProductDataThunk,
  getProductListThunk,
  removeProduct,
} from "../../Reducer/productSlice";
import EditProduct from "../../components/dialog/EditProduct";
import { emitter } from "../../utils/emitter";

const Manage = () => {
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState(null);
  const navigate = useNavigate();
  const dataCreateProduct = useSelector(
    (state) => state.createProduct.dataCreateProduct
  );
  const productList = useSelector((state) => state.getProductList.productList);

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setAction(null);
  };
  emitter.on("EVENT_EDIT_PRODUCT", () => {});

  useEffect(() => {
    // const userId = 1;
    // const getProduct = () => {
    //   dispatch(getProductListThunk(userId));
    // };
    // getProduct();
  }, [productList]);

  if (dataCreateProduct?.errCode === 0) {
    setSnackbar("success", "Create Product Successfull", dispatch);
  }

  const handleChangeAll = (e) => {
    if (e.target.value === "0") {
      // if true
    } else {
      // if false
      setSelected([]); // unselect all
    }
  };

  const handleChooseProduct = (e) => {
    let value = parseInt(e.target.value, 10);
    const isExist = selected.includes(value);
    if (!isExist) {
      // if true
      setSelected([...selected, value]); // add to selected
    } else {
      // if false
      setSelected(selected.filter((item) => item !== value)); // remove from selected
    }
  };
  const handleAction = async () => {
    setSelected([]);
    handleClose();
  };
  const handleClickEdit = (productId) => {
    console.log(">>>>product id:", productId);
    dispatch(getProductDataThunk(productId));
  };
  const handleClickDelete = (productId) => {
    dispatch(deleteProduct({ productId, dispatch }));
    setSnackbar("success", "Delete Product Success", dispatch);
  };

  const handleTest = () => {
    console.log("...product list:", productList);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "80vw", margin: "0 0 80px 0" }}>
          <Sort>
            <Typo20>Selected:&nbsp;01/02</Typo20>
            <Box sx={{ display: "flex" }}>
              <CreateProduct />
              <ButtonAction
                sx={{ backgroundColor: "#c70000", marginLeft: "10px" }}>
                <BsFillTrash3Fill />
              </ButtonAction>
            </Box>
          </Sort>
          <Box
            sx={{
              flexGrow: 1,
              backgroundColor: "#e5e5e5",
            }}>
            <Grid container spacing={2}>
              <Grid xs={0.5}>
                <Head>
                  <Checkbox
                    {...label}
                    color="default"
                    value={selected.length}
                    checked={selected.length}
                    onChange={(e) => handleChangeAll(e)}
                  />
                </Head>
              </Grid>
              <Grid xs={2}>
                <Head>Name</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Image</Head>
              </Grid>
              <Grid xs={1}>
                <Head>Price</Head>
              </Grid>
              <Grid xs={2.5}>
                <Head>Description</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Create In</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Update In</Head>
              </Grid>
              <Grid xs={1.5}>
                <Head>Actions</Head>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              borderBottom: "1px solid #cccccc",
              padding: "20px 0",
            }}>
            <Grid container spacing={2}>
              {productList && productList.length > 0 ? (
                productList.map((item) => {
                  return (
                    <>
                      <Grid xs={0.5}>
                        <Item>
                          <Checkbox
                            {...label}
                            color="default"
                            // value={item.id}
                            // checked={selected.includes(item.id)}
                            onChange={(e) => {
                              handleChooseProduct(e);
                            }}
                          />
                        </Item>
                      </Grid>
                      <Grid xs={2}>
                        <Item>{item.name}</Item>
                      </Grid>
                      <Grid xs={1.5}>
                        <Item>
                          <img
                            alt="hinhanh"
                            src={item?.imageToBase64}
                            style={{ height: "56px", witdh: "56px" }}
                          />
                        </Item>
                      </Grid>
                      <Grid xs={1}>
                        <Item>{item.price}$</Item>
                      </Grid>
                      <Grid xs={2.5}>
                        <Item sx={{ overflow: "auto" }}>
                          {item.description}
                        </Item>
                      </Grid>
                      <Grid xs={1.5}>
                        <Item>{formatDate(item.createIn)}</Item>
                      </Grid>
                      <Grid xs={1.5}>
                        {item.updateIn !== null && (
                          <Item>{formatDate(item.updateIn)}</Item>
                        )}
                      </Grid>
                      <Grid xs={1.5}>
                        <Item
                          sx={{ height: "25px" }}
                          onClick={() => handleClickEdit(item.id)}>
                          <EditProduct />
                        </Item>
                        <Item
                          sx={{ height: "25px" }}
                          onClick={() => handleClickDelete(item.id)}>
                          <Action>
                            <BsFillTrash3Fill />
                            &nbsp;&nbsp;Delete
                          </Action>
                        </Item>
                      </Grid>
                    </>
                  );
                })
              ) : (
                <Box>No Product</Box>
              )}
            </Grid>
          </Box>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
              {action === "confirm"
                ? "Do you want to confirmed?"
                : "Do you want to delete?"}
            </DialogTitle>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={() => handleAction()} autoFocus>
                {action === "confirm" ? "Confirm" : "Delete"}
              </Button>
            </DialogActions>
          </Dialog>
          <SnackbarComponent />
          <button onClick={() => handleTest()}>TEST</button>
        </Box>
      </Box>
    </>
  );
};

export default Manage;

const Item = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  height: "80px",
  display: "flex",
  alignItems: "flex-start",
}));

const Head = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  height: "50px",
  display: "flex",
  alignItems: "center",
}));

const Sort = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Typo16 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  padding: "10px",
  margin: "20px 0",
  borderBottom: "1px solid #cccccc",
  cursor: "pointer",
}));
const Typo20 = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 500,
  padding: "10px",
  margin: "20px 0",
  // textDecoration: "underline",
}));

const Action = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  padding: "5px 0",
  cursor: "pointer",
  "&:hover": {
    color: "var(--myBlue)",
  },
}));

const ButtonAction = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "40px",
  width: "40px",
  border: "none",
  color: "white",
  fontSize: "25px",
  borderRadius: "5px",
  "&:hover": {
    opacity: "0.8",
  },
}));
