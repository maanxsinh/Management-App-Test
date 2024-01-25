import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/index";
import { createTheme, ThemeProvider } from "@mui/material";
import io from "socket.io-client";
import Signup from "./pages/Auth/Signup";
import Manage from "./pages/Manage";
import CreateProduct from "./components/dialog/createProduct";

const theme = createTheme({
  typography: {
    fontFamily: ["Chilanka", "cursive"].join(","),
  },
});

const App = () => {
  // let socket = io("http://localhost:8080");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/createProduct" element={<CreateProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
