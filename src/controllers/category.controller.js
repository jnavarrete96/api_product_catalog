const categoryService = require('../services/category.service');

class CategoryController {
  // POST /api/categories
  async create(req, res, next) {
    try {
      const category = await categoryService.createCategory(req.body);
      return res.status(201).json({
        success: true,
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/categories
  async getAll(req, res, next) {
    try {
      const categories = await categoryService.getCategories();
      return res.status(200).json({
        success: true,
        data: categories
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /api/categories/:id
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryService.updateCategory(id, req.body);
      return res.status(200).json({
        success: true,
        data: category
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /api/categories/:id (soft delete)
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await categoryService.deleteCategory(id);
      return res.status(200).json({
        success: true,
        message: 'Categoría eliminada correctamente'
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/categories/:id
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const category = await categoryService.getById(id);
       return res.status(200).json({
        success: true,
        data: category
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
