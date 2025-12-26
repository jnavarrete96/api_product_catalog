const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta simple de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

module.exports = app;
