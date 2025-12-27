const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestión de productos
 */

// GET /api/products?page=1&pageSize=10&search=...&idCategoria=...&precioMin=...&precioMax=...&activo=true&sortBy=precio&sortDir=asc
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Listar productos con paginación, filtros y ordenamiento
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Búsqueda por nombre (contains)
 *       - in: query
 *         name: idCategoria
 *         schema:
 *           type: integer
 *       - in: query
 *         name: precioMin
 *         schema:
 *           type: number
 *       - in: query
 *         name: precioMax
 *         schema:
 *           type: number
 *       - in: query
 *         name: activo
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [Name, Price, CreatedAt]
 *       - in: query
 *         name: sortDir
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Listado paginado de productos
 */
router.get('/', (req, res, next) =>
  productController.getPaginated(req, res, next)
);

// GET /api/products/:id
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener producto por id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get('/:id', (req, res, next) =>
  productController.getById(req, res, next)
);

// POST /api/products
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear producto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: Producto creado
 */
router.post('/', (req, res, next) =>
  productController.create(req, res, next)
);

// PUT /api/products/:id
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Actualizar producto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
router.put('/:id', (req, res, next) =>
  productController.update(req, res, next)
);

// DELETE /api/products/:id
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar producto (soft delete)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete('/:id', (req, res, next) =>
  productController.delete(req, res, next)
);

// POST /api/products/masivo
/**
 * @swagger
 * /api/products/masivo:
 *   post:
 *     summary: Carga masiva de productos (CSV/XLSX)
 *     tags: [Products]
 *     responses:
 *       501:
 *         description: No implementado aún
 */
router.post('/masivo', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Carga masiva no implementada aún'
  });
});

module.exports = router;
