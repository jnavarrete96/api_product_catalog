const express = require('express');
const router = express.Router();

// POST /api/categories
router.post('/', (req, res) => {
  res.status(501).json({
    message: 'POST /api/categories not implemented yet'
  });
});

module.exports = router;