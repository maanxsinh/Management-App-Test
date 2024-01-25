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
import { MdEdit } from "react-icons/md";
import {
  createProductThunk,
  descriptionEdit,
  editProductThunk,
  getProductListThunk,
  imageEdit,
  nameEdit,
  priceEdit,
  resetProductInf,
  updateDate,
  updateDates,
} from "../../Reducer/productSlice";
import { editProduct } from "../../Reducer/apiRequest";
import { emitter } from "../../utils/emitter";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function EditProduct() {
  const dataProduct = useSelector((state) => state.editProduct.dataProduct);
  const dataEditProduct = useSelector(
    (state) => state.editProduct.dataEditProduct
  );

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
    const today = new Date();
    dispatch(updateDate(today));
    // dispatch(getProductData())
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnchangeFile = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await commonUtils.getBase64(file);
      dispatch(imageEdit(base64));
      let objectUrl = URL.createObjectURL(file);
      // setProductImg({
      //   imgURL: objectUrl,
      //   image: file,
      // });
      console.log(">>> IMAGE", base64);
      console.log(">>> IMAGE", objectUrl);
    }
  };

  const handleEdit = async () => {
    const today = new Date();
    dispatch(updateDates(today));
    console.log(">>>>product inf:", dataEditProduct);
    const productId = dataProduct.id;
    console.log(productId);
    if (
      dataEditProduct?.name === "" ||
      dataEditProduct?.price === "" ||
      dataEditProduct?.description === ""
    ) {
      setSnackbar("warning", "Please fill in all fields", dispatch);
    } else {
      const productId = dataProduct.id;
      dispatch(editProductThunk({ dataEditProduct, productId, dispatch }));
      dispatch(getProductListThunk("admin"));

      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Action onClick={handleClickOpen}>
        <MdEdit />
        &nbsp;&nbsp;Edit
      </Action>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Edit Product"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Input
            defaultValue={dataProduct?.name}
            placeholder="Name"
            onChange={(e) => dispatch(nameEdit(e.target.value))}
          />
          <Input
            defaultValue={dataProduct?.price}
            placeholder="Price $"
            onChange={(e) => dispatch(priceEdit(e.target.value))}
          />
          <Input
            defaultValue={dataProduct?.description}
            placeholder="Description"
            onChange={(e) => dispatch(descriptionEdit(e.target.value))}
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
            {dataEditProduct && dataEditProduct?.image && (
              <Box
                sx={{
                  marginLeft: "20px",
                  borderRadius: "6px",
                  height: "93.78px",
                  width: "93.78px",
                }}>
                <img
                  src={dataEditProduct?.image}
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
          <Button onClick={() => handleEdit()}>Edit</Button>
        </DialogActions>
        <SnackbarComponent />
      </Dialog>
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

const Action = styled(Box)(({ theme }) => ({
  fontSize: "14px",
  padding: "5px 0",
  cursor: "pointer",
  "&:hover": {
    color: "var(--myBlue)",
  },
}));
