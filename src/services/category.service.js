const categoryRepository = require('../repositories/category.repository');

class CategoryService {
  // Crear categoría
  async createCategory(data) {
    const { Name, Description } = data;

    if (!Name || Name.trim() === '') {
      throw new Error('El nombre de la categoría es obligatorio');
    }

    // Validar nombre único
    const existing = await categoryRepository.findByName(Name.trim());
    if (existing) {
      throw new Error('Ya existe una categoría con ese nombre');
    }

    return categoryRepository.create({
      Name: Name.trim(),
      Description: Description || null,
      IsActive: true
    });
  }

  // Listar categorías
  async getCategories() {
    return categoryRepository.findAll({ onlyActive: true });
  }

  // Actualizar categoría
  async updateCategory(id, data) {
    const { Name, Description, IsActive } = data;

    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    if (Name) {
      const existing = await categoryRepository.findByName(Name.trim());
      if (existing && existing.CategoryId !== Number(id)) {
        throw new Error('Ya existe otra categoría con ese nombre');
      }
    }

    await categoryRepository.update(id, {
      Name: Name ? Name.trim() : category.Name,
      Description: Description !== undefined ? Description : category.Description,
      IsActive: IsActive !== undefined ? IsActive : category.IsActive
    });

    return categoryRepository.findById(id);
  }

  // Eliminar categoría (soft delete)
  async deleteCategory(id) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }

    await categoryRepository.softDelete(id);
    return true;
  }

  // Obtener por id
  async getById(id) {
    const category = await categoryRepository.findById(id);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }
    return category;
  }
}

module.exports = new CategoryService();
