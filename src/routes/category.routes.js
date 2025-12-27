const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         CategoryId:
 *           type: integer
 *           example: 1
 *         Name:
 *           type: string
 *           example: Periféricos
 *         Description:
 *           type: string
 *           nullable: true
 *           example: Teclados, mouse, etc
 *         IsActive:
 *           type: boolean
 *           example: true
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *
 *     CategoryInput:
 *       type: object
 *       required:
 *         - Name
 *       properties:
 *         Name:
 *           type: string
 *           example: Periféricos
 *         Description:
 *           type: string
 *           example: Teclados, mouse, etc
 */


/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Gestión de categorías
 */



// POST /api/categories
/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Crear una categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Categoría creada
 */
router.post('/', (req, res, next) =>
  categoryController.create(req, res, next)
);

// GET /api/categories
/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Listar categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', (req, res, next) =>
  categoryController.getAll(req, res, next)
);

// GET /api/categories/:id
/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Obtener una categoría por id
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', (req, res, next) =>
  categoryController.getById(req, res, next)
);

// PUT /api/categories/:id
/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categories]
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
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 */
router.put('/:id', (req, res, next) =>
  categoryController.update(req, res, next)
);

// DELETE /api/categories/:id
/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría (soft delete)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada
 */
router.delete('/:id', (req, res, next) =>
  categoryController.delete(req, res, next)
);

module.exports = router;
