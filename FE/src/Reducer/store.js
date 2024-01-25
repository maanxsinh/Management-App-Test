import { createSlice, configureStore } from "@reduxjs/toolkit";
import {
  createProductSlice,
  editProductSlice,
  getProductListSlice,
} from "./productSlice";
import { loginSlice } from "./authSlice";
import { snackbarSlice } from "./snackbarSlice";

const reducerSlice = createSlice({
  name: "store",
  initialState: {},
  reducers: {
    someAction: function () {},
  },
});

const store = configureStore({
  reducer: {
    getProductList: getProductListSlice.reducer,
    createProduct: createProductSlice.reducer,
    login: loginSlice.reducer,
    snackbar: snackbarSlice.reducer,
    editProduct: editProductSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
