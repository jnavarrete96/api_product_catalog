const express = require('express');
const cors = require('cors');

const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const errorMiddleware = require('./middlewares/error.middleware');


const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// rutas
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.use(errorMiddleware);

module.exports = app;
