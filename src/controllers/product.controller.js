const productService = require('../services/product.service');

class ProductController {
  // POST /api/products
  async create(req, res, next) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/products/:id
  async getById(req, res, next) {
    try {
      const product = await productService.getById(req.params.id);
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/products
  async getPaginated(req, res, next) {
    try {
      const result = await productService.getPaginated(req.query);
      res.status(200).json({
        success: true,
        data: { ...result }
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/products/:id
  async update(req, res, next) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/products/:id
  async delete(req, res, next) {
    try {
      await productService.deleteProduct(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Producto eliminado correctamente'
      });
    } catch (error) {
      next(error);
    }
  }

  async uploadBulk(req, res, next) {
    try {
      const result = await productService.bulkUpload(req.file);
      res.status(201).json({
        success: true,
        ...result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
