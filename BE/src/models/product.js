'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    idCreater: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image: DataTypes.BLOB,
    description: DataTypes.STRING,
    createIn: DataTypes.DATE,
    updateIn: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};