const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

// POST /api/categories
router.post('/', (req, res, next) =>
  categoryController.create(req, res, next)
);

// GET /api/categories
router.get('/', (req, res, next) =>
  categoryController.getAll(req, res, next)
);

// GET /api/categories/:id
router.get('/:id', (req, res, next) =>
  categoryController.getById(req, res, next)
);

// PUT /api/categories/:id
router.put('/:id', (req, res, next) =>
  categoryController.update(req, res, next)
);

// DELETE /api/categories/:id
router.delete('/:id', (req, res, next) =>
  categoryController.delete(req, res, next)
);

module.exports = router;
