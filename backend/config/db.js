const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'wms_db',
  process.env.DB_USER || 'user',
  process.env.DB_PASSWORD || 'userpassword',
  {
    host: process.env.DB_HOST || 'db', // matches service name in docker-compose
    dialect: 'mysql',
    logging: false, // set to console.log to see SQL queries
  }
);

module.exports = sequelize;