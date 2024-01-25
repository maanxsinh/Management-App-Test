const db = require("../models/index.js");

// Get Product List

const getProductList = (role) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!role) {
        let productList = await db.Product.findAll({
          attributes: {
            exclude: ["price"],
          }, // không lấy price
        });
        resolve(productList);
      } else {
        let productList = await db.Product.findAll();
        resolve(productList);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// Create Product

const createProduct = (dataProduct) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Product.create(dataProduct);
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

// Get Product data
const getProductData = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Product.findOne({
        where: { id: productId },
      });
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

// Edit Product
const editProduct = (dataEditProduct, productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Product.update(dataEditProduct, {
        where: { id: productId },
      });
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

//Delete Product
const deleteProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Product.destroy({
        where: { id: productId },
      });
      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getProductList: getProductList,
  createProduct: createProduct,
  getProductData: getProductData,
  editProduct: editProduct,
  deleteProduct: deleteProduct,
};
