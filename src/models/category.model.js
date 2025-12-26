const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
  CategoryId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING(255)
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  CreatedAt: {
    type: DataTypes.DATE
  },
  UpdatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Categories',
  timestamps: false
});

module.exports = Category;
