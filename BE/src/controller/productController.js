// Get Product List

const productServices = require("../services/productServices");

const getProductList = async (req, res) => {
  try {
    let role = req.query.role;
    let data = await productServices.getProductList(role);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "get product list failed",
    });
  }
};

// Create Product

const createProduct = async (req, res) => {
  try {
    let dataProduct = req.body.dataProduct;
    let dataTest = { name: "iphone" };
    if (!dataProduct) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "mssing data product",
      });
    }
    let data = await productServices.createProduct(dataProduct);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "create product failed",
    });
  }
};

// Get Product Data

const getProductData = async (req, res) => {
  try {
    let productId = req.query.productId;
    if (!productId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "mssing id product",
      });
    }
    let data = await productServices.getProductData(productId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "get failed",
    });
  }
};

// Edit Product

const editProduct = async (req, res) => {
  try {
    let dataEditProduct = req.body.dataEditProduct;
    let productId = req.body.productId;
    let dataTest = { name: "iphone" };
    if (!productId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "mssing id product",
      });
    }
    if (!dataEditProduct) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "mssing dataEdit",
      });
    }
    let data = await productServices.editProduct(dataEditProduct, productId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log(">>>edit product failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "edit product failed",
    });
  }
};

//Delete Product

const deleteProduct = async (req, res) => {
  try {
    let productId = req.body.productId;
    if (!productId) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "mssing id product",
      });
    }

    let data = await productServices.deleteProduct(productId);
    return res.status(200).json({
      errCode: 0,
      errMessage: "success",
      data: data,
    });
  } catch (e) {
    console.log(">>>edit product failed:", e);
    return res.status(200).json({
      errCode: 1,
      errMessage: "delete product failed",
    });
  }
};

module.exports = {
  getProductList: getProductList,
  createProduct: createProduct,
  getProductData: getProductData,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
};
