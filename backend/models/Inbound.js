const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

// The main order (Invoice/Receipt header)
const InboundOrder = sequelize.define('InboundOrder', {
  supplier_name: { type: DataTypes.STRING, allowNull: false },
  reference_doc: { type: DataTypes.STRING }, // e.g., Invoice Number
  received_date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  status: { type: DataTypes.ENUM('Pending', 'Completed'), defaultValue: 'Completed' }
});

// The items inside the order
const InboundItem = sequelize.define('InboundItem', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  unit_price: { type: DataTypes.DECIMAL(10, 2) }
});

// Relationships
InboundOrder.hasMany(InboundItem, { onDelete: 'CASCADE' });
InboundItem.belongsTo(InboundOrder);

Product.hasMany(InboundItem);
InboundItem.belongsTo(Product);

module.exports = { InboundOrder, InboundItem };