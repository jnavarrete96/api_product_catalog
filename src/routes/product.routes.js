const express = require('express');
const router = express.Router();

// POST /api/products
router.post('/', (req, res) => {
  res.status(501).json({
    message: 'POST /api/products not implemented yet'
  });
});

module.exports = router;
