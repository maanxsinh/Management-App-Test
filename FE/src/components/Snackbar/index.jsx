import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { openSbFalse, openSbTrue } from "../../Reducer/snackbarSlice";

const SnackbarComponent = (message = "") => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const openSnackbar = useSelector((state) => state.snackbar.openSnackbar);
  const snackbarMessage = useSelector(
    (state) => state.snackbar.snackbarMessage
  );
  const severity = useSelector((state) => state.snackbar.severity);
  const handleClick = () => {
    setOpen(true);
    dispatch(openSbTrue());
  };

  const handleClose = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }

    setOpen(false);
    dispatch(openSbFalse());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {/* <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button> */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarComponent;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
