import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Buffer } from "buffer";
import { emitter } from "../utils/emitter";

//get product list

const getProductListSlice = createSlice({
  name: "getProductList",
  initialState: {
    productList: [],
    isLoading: false,
    error: false,
    dataGetProductList: null,
  },
  reducers: {
    createProduct: (state, action) => {
      state.productList.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.productList.filter((item) => item.id === action.payload);
    },
    getProduct: (state, action) => {
      state.productList = action.payload.data.data;
      state.productList.map((item) => {
        item.imageToBase64 = new Buffer(item.image.data, "base64").toString(
          "binary"
        );
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductListThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(getProductListThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataGetProductList = action.payload.data;
      state.productList = action.payload.data.data;
      state.productList.map((item) => {
        item.imageToBase64 = new Buffer(item.image.data, "base64").toString(
          "binary"
        );
        return item;
      });
      state.productList.reverse();
      console.log("FULFILLED", state.productList);
    });
    builder.addCase(getProductListThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const getProductListThunk = createAsyncThunk(
  "loading/ProductList",
  async (role) => {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/api/v1/product/list`,
      { params: { role } }
    );
    if (res) {
      // console.log(">>product list:", res);
    }
    return res;
  }
);

// Create Product

const createProductSlice = createSlice({
  name: "createProduct",
  initialState: {
    productInf: {},
    dataCreateProduct: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    idCreater: (state, action) => {
      state.productInf.idCreater = action.payload;
    },
    nameCreate: (state, action) => {
      state.productInf.name = action.payload;
    },
    imageCreate: (state, action) => {
      state.productInf.image = action.payload;
    },
    priceCreate: (state, action) => {
      state.productInf.price = action.payload;
    },
    descriptionCreate: (state, action) => {
      state.productInf.description = action.payload;
    },
    createDate: (state, action) => {
      state.productInf.createIn = action.payload;
    },
    updateDate: (state, action) => {
      state.productInf.updateIn = action.payload;
    },
    resetProductInf: (state, action) => {
      state.productInf.name = "";
      state.productInf.price = "";
      state.productInf.description = "";
      state.productInf.image = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProductThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(createProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataCreateProduct = action.payload.data;
      console.log("FULFILLED");
    });
    builder.addCase(createProductThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const createProductThunk = createAsyncThunk(
  "createProduct",
  async ({ dataProduct, dispatch }) => {
    let res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/api/v1/product/create`,
      { dataProduct }
    );
    dispatch(getProductListThunk("admin"));
    return res;
  }
);

// Edit Product

const editProductSlice = createSlice({
  name: "editProduct",
  initialState: {
    dataProduct: {},
    dataEditProduct: {},
    isLoading: false,
    error: false,
  },
  reducers: {
    nameEdit: (state, action) => {
      state.dataEditProduct.name = action.payload;
    },
    priceEdit: (state, action) => {
      state.dataEditProduct.price = action.payload;
    },
    descriptionEdit: (state, action) => {
      state.dataEditProduct.description = action.payload;
    },
    imageEdit: (state, action) => {
      state.dataEditProduct.image = action.payload;
    },
    updateDates: (state, action) => {
      state.dataEditProduct.updateIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    //get data
    builder.addCase(getProductDataThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(getProductDataThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataProduct = action.payload.data.data;
      console.log("FULFILLED", state.dataProduct);
    });
    builder.addCase(getProductDataThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    //Edit
    builder.addCase(editProductThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING edit");
    });
    builder.addCase(editProductThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("FULFILLED edit", action.payload);
    });
    builder.addCase(editProductThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    //Delete
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING edit");
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("FULFILLED edit", action.payload);
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const getProductDataThunk = createAsyncThunk(
  "getProductDataThunk",
  async (productId) => {
    let res = await axios.get(
      `${process.env.REACT_APP_PORT_API}/api/v1/product/data`,
      { params: { productId } }
    );
    return res;
  }
);

export const editProductThunk = createAsyncThunk(
  "editProduct",
  async ({ dataEditProduct, productId, dispatch }) => {
    let res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/api/v1/product/edit`,
      { dataEditProduct, productId }
    );
    const userId = 1;
    dispatch(getProductListThunk("admin"));
    emitter.emit("EVENT_EDIT_PRODUCT");
    return res;
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async ({ productId, dispatch }) => {
    let res = await axios.post(
      `${process.env.REACT_APP_PORT_API}/api/v1/product/delete`,
      { productId }
    );
    dispatch(getProductListThunk("admin"));
    return res;
  }
);

export { getProductListSlice, createProductSlice, editProductSlice };

export const {
  idCreater,
  nameCreate,
  imageCreate,
  priceCreate,
  descriptionCreate,
  createDate,
  updateDate,
  resetProductInf,
} = createProductSlice.actions;

export const { nameEdit, priceEdit, descriptionEdit, imageEdit, updateDates } =
  editProductSlice.actions;

export const { createProduct, removeProduct, getProduct } =
  getProductListSlice.actions;
