import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Login

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userInf: {},
    data: null,
    isLoading: false,
    error: false,
  },
  reducers: {
    userNameInput: (state, action) => {
      state.userInf.userName = action.payload;
    },
    passwordInput: (state, action) => {
      state.userInf.password = action.payload;
    },
    resetUserInf: (state, action) => {
      state.userInf = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.userInf = action.payload.data.data;
      state.data = action.payload.data.data;
      console.log("FULFILLED", state.data);
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase(signupThunk.pending, (state) => {
      state.isLoading = true;
      console.log("PENDING");
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      console.log("FULFILLED", state.data);
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const loginThunk = createAsyncThunk(
  "auth",
  async ({ userName, password }) => {
    let res = await axios.post(`${process.env.REACT_APP_PORT_API}/login`, {
      userName,
      password,
    });
    return res;
  }
);

export const signupThunk = createAsyncThunk(
  "signup",
  async ({ userName, password }) => {
    let res = await axios.post(`${process.env.REACT_APP_PORT_API}/signup`, {
      userName,
      password,
    });
    return res;
  }
);

//Signup

export const { userNameInput, passwordInput, resetUserInf } =
  loginSlice.actions;

export { loginSlice };
