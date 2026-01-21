const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ActivityLog = sequelize.define('ActivityLog', {
  username: { type: DataTypes.STRING, allowNull: false },
  action: { type: DataTypes.STRING, allowNull: false }, // e.g., "Created Product"
  details: { type: DataTypes.STRING }, // e.g., "SKU: IPHONE-13"
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = ActivityLog;