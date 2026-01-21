const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const Batch = sequelize.define('Batch', {
  batch_code: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  expiry_date: { type: DataTypes.DATEONLY },
  barcode: { type: DataTypes.STRING, unique: true } // Unique barcode per batch unit
});

// Relations
Product.hasMany(Batch, { onDelete: 'CASCADE' });
Batch.belongsTo(Product);

module.exports = Batch;