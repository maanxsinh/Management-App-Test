import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, styled } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import commonUtils, { setSnackbar } from "../../utils/commonUtils";
import SnackbarComponent from "../Snackbar";
import {
  createDate,
  createProduct,
  createProductThunk,
  descriptionCreate,
  getProductListThunk,
  imageCreate,
  nameCreate,
  priceCreate,
  resetProductInf,
} from "../../Reducer/productSlice";
import { getProductList } from "../../Reducer/apiRequest";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function CreateProduct() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const dataProduct = useSelector((state) => state.createProduct.productInf);
  const handleClickOpen = () => {
    setOpen(true);
    const today = new Date();
    dispatch(createDate(today));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnchangeFile = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await commonUtils.getBase64(file);
      dispatch(imageCreate(base64));
      let objectUrl = URL.createObjectURL(file);
      // setProductImg({
      //   imgURL: objectUrl,
      //   image: file,
      // });
      console.log(">>> IMAGE", base64);
      console.log(">>> IMAGE", objectUrl);
    }
  };

  const handleCreate = async () => {
    console.log(">>>>product inf:", dataProduct);
    if (
      !dataProduct?.name ||
      dataProduct?.name === "" ||
      !dataProduct?.price ||
      dataProduct?.price === "" ||
      !dataProduct?.description ||
      dataProduct?.description === "" ||
      !dataProduct?.image
    ) {
      setSnackbar("warning", "Please fill in all fields", dispatch);
    } else {
      dispatch(createProductThunk({ dataProduct, dispatch }));
      dispatch(resetProductInf());
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <ButtonAction
        sx={{ backgroundColor: "var(--myBlue)" }}
        onClick={handleClickOpen}>
        <IoMdAdd />
      </ButtonAction>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Create Product"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Input
            value={dataProduct?.name}
            placeholder="Name"
            onChange={(e) => dispatch(nameCreate(e.target.value))}
          />
          <Input
            value={dataProduct?.price}
            placeholder="Price $"
            onChange={(e) => dispatch(priceCreate(e.target.value))}
          />
          <Input
            value={dataProduct?.description}
            placeholder="Description"
            onChange={(e) => dispatch(descriptionCreate(e.target.value))}
          />
          <Box sx={{ display: "flex" }}>
            <Label for="file">Image</Label>
            <input
              type="file"
              id="file"
              name="file"
              multiple
              style={{ display: "none" }}
              onChange={(e) => handleOnchangeFile(e)}
            />
            {dataProduct && dataProduct?.image && (
              <Box
                sx={{
                  marginLeft: "20px",
                  borderRadius: "6px",
                  height: "93.78px",
                  width: "93.78px",
                }}>
                <img
                  src={dataProduct?.image}
                  alt="img"
                  style={{
                    height: "93.78px",
                    width: "93.78px",
                    borderRadius: "6px",
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleCreate()}>Create</Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent />
    </React.Fragment>
  );
}

const Input = styled("input")(({ theme }) => ({
  border: "none",
  height: "39px",
  width: "284px",
  backgroundColor: "#eee",
  margin: "8px 0",
  padding: "0 15px",
}));

const Label = styled("label")(({ theme }) => ({
  display: "inline-block",
  border: "1px dashed #999",
  padding: "30px",
  borderRadius: "6px",
  "&:hover": {
    border: "1px dashed #de0611",
    color: "#de0611",
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
