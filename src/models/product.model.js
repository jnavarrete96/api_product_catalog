const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  ProductId: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  CategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Name: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING(500)
  },
  Sku: {
    type: DataTypes.STRING(50)
  },
  Price: {
    type: DataTypes.DECIMAL(18, 2),
    allowNull: false
  },
  Stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
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
  tableName: 'Products',
  timestamps: false
});

module.exports = Product;
