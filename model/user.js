const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken')
const sequelize = require('../db/connection');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});



(async () => {
    try {
      await sequelize.sync();
      console.log('Database synchronized');
    } catch (error) {
      console.error('Error synchronizing the database:', error);
    }
  })()

module.exports = User;
