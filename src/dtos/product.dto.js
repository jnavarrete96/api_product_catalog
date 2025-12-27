class ProductDTO {
  constructor(product) {
    this.ProductId = product.ProductId;
    this.CategoryId = product.CategoryId;
    this.Name = product.Name;
    this.Description = product.Description;
    this.Sku = product.Sku;
    this.Price = product.Price;
    this.Stock = product.Stock;
    this.IsActive = product.IsActive;

    if (product.Category) {
      this.Category = {
        CategoryId: product.Category.CategoryId,
        Name: product.Category.Name
      };
    }
  }
}

module.exports = ProductDTO;
