// import express from "express";
const express = require("express");
const productController = require("../controller/productController");
const authController = require("../controller/authController");

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", (req, res) => {
    return res.send("hello world");
  });

  router.get("/api/v1/product/list", productController.getProductList);
  router.post("/login", authController.login);
  router.post("/signup", authController.signup);
  router.post("/api/v1/product/create", productController.createProduct);
  router.get("/api/v1/product/data", productController.getProductData);
  router.post("/api/v1/product/edit", productController.editProduct);
  router.post("/api/v1/product/delete", productController.deleteProduct);
  return app.use("/", router);
};

module.exports = initWebRoutes;
