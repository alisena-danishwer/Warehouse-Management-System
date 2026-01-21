const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

// The main order (Sales Order header)
const OutboundOrder = sequelize.define('OutboundOrder', {
  customer_name: { type: DataTypes.STRING, allowNull: false },
  reference_doc: { type: DataTypes.STRING }, // e.g., Sales Order #
  shipped_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.ENUM('Pending', 'Shipped'), defaultValue: 'Shipped' }
});

// The items inside the order
const OutboundItem = sequelize.define('OutboundItem', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unit_price: { type: DataTypes.DECIMAL(10, 2) }
});

// Relationships
OutboundOrder.hasMany(OutboundItem, { onDelete: 'CASCADE' });
OutboundItem.belongsTo(OutboundOrder);

Product.hasMany(OutboundItem);
OutboundItem.belongsTo(Product);

module.exports = { OutboundOrder, OutboundItem };