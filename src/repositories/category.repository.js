const { Category } = require('../models');

class CategoryRepository {
  // Crear categoría
  async create(data) {
    return Category.create(data);
  }

  // Buscar por nombre (para validar único)
  async findByName(name) {
    return Category.findOne({
      where: { Name: name }
    });
  }

  // Buscar por id
  async findById(id) {
    return Category.findByPk(id);
  }

  // Listar todas (solo activas)
  async findAll({ onlyActive = true } = {}) {
    const where = onlyActive ? { IsActive: true } : {};
    return Category.findAll({ where });
  }

  // Actualizar por id
  async update(id, data) {
    return Category.update(data, {
      where: { CategoryId: id }
    });
  }

  // Soft delete
  async softDelete(id) {
    return Category.update(
      { IsActive: false },
      { where: { CategoryId: id } }
    );
  }

  // Hard delete
  async hardDelete(id) {
    return Category.destroy({
      where: { CategoryId: id }
    });
  }
}

module.exports = new CategoryRepository();
