const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING, // Will store the hashed password
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Manager', 'Operator'),
    defaultValue: 'Operator'
  }
});

module.exports = User;