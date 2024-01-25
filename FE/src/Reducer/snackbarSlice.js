import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    openSnackbar: false,
    snackbarMessage: "",
    severity: "success",
  },
  reducers: {
    openSbTrue: (state) => {
      state.openSnackbar = true;
    },
    openSbFalse: (state) => {
      state.openSnackbar = false;
    },
    setSnackbarMessage: (state, action) => {
      state.snackbarMessage = action.payload;
    },
    severityWarning: (state, action) => {
      state.severity = "warning";
    },
    severitySuccess: (state) => {
      state.severity = "success";
    },
  },
});

export const {
  openSbTrue,
  openSbFalse,
  setSnackbarMessage,
  severityWarning,
  severitySuccess,
} = snackbarSlice.actions;

export { snackbarSlice };
