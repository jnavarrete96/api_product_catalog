const { AppError } = require('../utils/appError');

const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  // Si es un error controlado
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  // Error no controlado
  return res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
};

module.exports = errorMiddleware;
