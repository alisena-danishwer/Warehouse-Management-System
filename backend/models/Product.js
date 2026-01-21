const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  sku: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  // NEW: Store the price
  price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.00
  },
  total_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  low_stock_threshold: {
    type: DataTypes.INTEGER,
    defaultValue: 10
  }
});

module.exports = Product;