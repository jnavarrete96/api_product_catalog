const { Op } = require('sequelize');
const { Product, Category } = require('../models');

class ProductRepository {
  async create(data) {
    return Product.create(data);
  }

  async findById(id) {
    return Product.findByPk(id, {
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: ['CategoryId', 'Name']
        }
      ]
    });
  }

  async update(id, data) {
    return Product.update(data, {
      where: { ProductId: id }
    });
  }

  async softDelete(id) {
    return Product.update(
      { IsActive: false },
      { where: { ProductId: id } }
    );
  }

  /**
   * Listado paginado con filtros y ordenamiento
   */
  async findPaginated({
    page = 1,
    pageSize = 10,
    search,
    idCategoria,
    precioMin,
    precioMax,
    activo,
    sortBy = 'CreatedAt',
    sortDir = 'DESC'
  }) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const where = {};

    // Filtro por nombre (contains)
    if (search) {
      where.Name = { [Op.like]: `%${search}%` };
    }

    // Filtro por categoría
    if (idCategoria) {
      where.CategoryId = idCategoria;
    }

    // Filtro por activo
    if (activo !== undefined) {
      where.IsActive = activo;
    }

    // Filtro por rango de precio
    if (precioMin || precioMax) {
      where.Price = {};
      if (precioMin) where.Price[Op.gte] = precioMin;
      if (precioMax) where.Price[Op.lte] = precioMax;
    }

    // Campos permitidos para ordenar
    const sortableFields = ['Name', 'Price', 'CreatedAt'];
    const orderField = sortableFields.includes(sortBy) ? sortBy : 'CreatedAt';
    const orderDirection = sortDir?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const { rows, count } = await Product.findAndCountAll({
      distinct: true,
      where,
      include: [
        {
          model: Category,
          as: 'Category',
          attributes: ['CategoryId', 'Name']
        }
      ],
      order: [[orderField, orderDirection]],
      offset,
      limit
    });

    return {
      items: rows,
      total: count
    };
  }
}

module.exports = new ProductRepository();
