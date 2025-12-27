const XLSX = require('xlsx');
const productRepository = require('../repositories/product.repository');
const categoryRepository = require('../repositories/category.repository');
const ProductDTO = require('../dtos/product.dto');

const {
  BadRequestError,
  NotFoundError,
  ConflictError
} = require('../utils/appError');

class ProductService {
  // Crear producto
  async createProduct(data) {
    this.#validateProductData(data);
    await this.#validateCategory(data.CategoryId);
    await this.#validateUniqueName(data.Name);
    await this.#validateUniqueSku(data.Sku);

    const product = await productRepository.create({
      ...data,
      Name: data.Name.trim(),
      Description: data.Description || null,
      Sku: data.Sku || null,
      Stock: data.Stock ?? 0,
      IsActive: true
    });

    const created = await productRepository.findById(product.ProductId);
    return new ProductDTO(created);
  }

  // Obtener por id
  async getById(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Producto no encontrado');
    }
    return new ProductDTO(product);
  }

  // Listado paginado con filtros
  async getPaginated(query) {
    const filters = this.#buildFilters(query);
    const { items, total } = await productRepository.findPaginated(filters);

    return {
      items: items.map(p => new ProductDTO(p)),
      total,
      page: filters.page,
      pageSize: filters.pageSize
    };
  }

  // Actualizar producto
  async updateProduct(id, data) {
    await this.#ensureProductExists(id);
    
    if (data.Name !== undefined) {
      this.#validateProductData({ Name: data.Name });
      await this.#validateUniqueName(data.Name);
    }

    if (data.Sku !== undefined) {
      await this.#validateUniqueSku(data.Sku, id);
    }
    
    if (data.Price !== undefined && Number(data.Price) <= 0) {
      throw new BadRequestError('El precio debe ser mayor a 0');
    }

    if (data.CategoryId !== undefined) {
      await this.#validateCategory(data.CategoryId);
    }

    const sanitizedData = this.#sanitizeUpdateData(data);
    await productRepository.update(id, sanitizedData);

    const updated = await productRepository.findById(id);
    return new ProductDTO(updated);
  }

  // Eliminar producto (soft delete)
  async deleteProduct(id) {
    await this.#ensureProductExists(id);
    await productRepository.softDelete(id);
    return true;
  }

  async bulkUpload(file) {
    if (!file) {
      throw new BadRequestError('Debe enviar un archivo CSV o XLSX');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const rows = XLSX.utils.sheet_to_json(sheet);

    if (!rows.length) {
      throw new BadRequestError('El archivo no contiene datos');
    }

    const products = [];

    for (const [index, row] of rows.entries()) {
      const product = {
        Name: row.Name?.toString().trim(),
        Description: row.Description || null,
        Sku: row.Sku || null,
        Price: Number(row.Price),
        Stock: Number(row.Stock) || 0,
        CategoryId: Number(row.CategoryId),
        IsActive: true
      };

      // Validaciones mínimas
      this.#validateProductData(product);
      await this.#validateCategory(product.CategoryId);

      products.push(product);
    }

    await productRepository.bulkCreate(products);

    return {
      message: 'Carga masiva completada',
      inserted: products.length
    };
  }

  // ================= MÉTODOS PRIVADOS =================

  #validateProductData(data) {
    const { Name, CategoryId, Price } = data;

    if (!Name || Name.trim() === '') {
      throw new BadRequestError('El nombre del producto es obligatorio');
    }

    if (CategoryId !== undefined && !CategoryId) {
      throw new BadRequestError('La categoría es obligatoria');
    }

    if (Price !== undefined && (!Price || Number(Price) <= 0)) {
      throw new BadRequestError('El precio debe ser mayor a 0');
    }
  }
  async #validateUniqueName(name, excludeId = null) {
    const existing = await productRepository.findByName(name.trim());

    if (existing) {
      // Si estamos actualizando, permitir si es el mismo producto
      if (!excludeId || existing.ProductId !== Number(excludeId)) {
        throw new ConflictError('Ya existe un producto con ese nombre');
      }
    }
  }

  async #validateUniqueSku(sku, excludeId = null) {
    if (!sku) return; // SKU es opcional

    const existing = await productRepository.findBySku(sku.trim());

    if (existing) {
      if (!excludeId || existing.ProductId !== Number(excludeId)) {
        throw new BadRequestError('Ya existe un producto con ese SKU');
      }
    }
  }


  async #validateCategory(categoryId) {
    const category = await categoryRepository.findById(categoryId);
    if (!category || !category.IsActive) {
      throw new BadRequestError('La categoría no existe o está inactiva');
    }
  }

  async #ensureProductExists(id) {
    const product = await productRepository.findById(id);
    if (!product) {
      throw new NotFoundError('Producto no encontrado');
    }
    return product;
  }

  #sanitizeUpdateData(data) {
    const sanitized = {};

    if (data.CategoryId !== undefined) sanitized.CategoryId = data.CategoryId;
    if (data.Name !== undefined) sanitized.Name = data.Name.trim();
    if (data.Description !== undefined) sanitized.Description = data.Description;
    if (data.Sku !== undefined) sanitized.Sku = data.Sku;
    if (data.Price !== undefined) sanitized.Price = data.Price;
    if (data.Stock !== undefined) sanitized.Stock = data.Stock;
    if (data.IsActive !== undefined) sanitized.IsActive = data.IsActive;

    return sanitized;
  }

  #buildFilters(query) {
    return {
      page: Number(query.page) || 1,
      pageSize: Number(query.pageSize) || 10,
      search: query.search,
      idCategoria: query.idCategoria,
      precioMin: query.precioMin,
      precioMax: query.precioMax,
      activo: query.activo !== undefined ? query.activo === 'true' : undefined,
      sortBy: query.sortBy,
      sortDir: query.sortDir
    };
  }
}

module.exports = new ProductService();