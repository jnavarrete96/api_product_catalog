const Category = require('./category.model');
const Product = require('./product.model');

// Relaciones
Category.hasMany(Product, { foreignKey: 'CategoryId' });
Product.belongsTo(Category, { foreignKey: 'CategoryId' });

module.exports = {
  Category,
  Product
};
