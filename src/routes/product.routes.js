const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
const upload = require('../middlewares/upload.middleware');

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


/**
 * @swagger
 * /api/products/masivo:
 *   post:
 *     summary: Cargar masivamente productos desde un archivo CSV o XLSX
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo CSV o XLSX con los productos
 *     responses:
 *       201:
 *         description: Carga masiva realizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Carga masiva completada
 *                 inserted:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Error en el archivo o en los datos enviados
 */

router.post(
  '/masivo',
  upload.single('file'),
  (req, res, next) => productController.uploadBulk(req, res, next)
);

module.exports = router;
