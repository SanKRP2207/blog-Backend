// Load environment variables from .env file
require('dotenv').config();

// Import Sequelize
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with your database credentials
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',  // Specify the dialect
});

// Test the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
