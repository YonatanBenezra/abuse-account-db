const AppError = require('../utils/appError');

// Function to capitalize the first letter of a string
function capitalizeStr(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Handle database cast error
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// Handle duplicate field error
const handleDuplicateFieldDB = (err) => {
  const message = `${capitalizeStr(
    Object.keys(err.keyValue).join(' ')
  )} already exists. Please use another value!`;
  return new AppError(message, 400);
};

// Send detailed error response in development environment
const sendErrorDev = (err, req, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

// Send simplified error response in production environment
const sendErrorProd = (err, req, res) => {
  // Operational errors (known errors) are sent to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or unknown errors are handled more gracefully
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

// Error handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    // Handling specific database errors
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);

    // Sending the error response to the client
    sendErrorProd(error, req, res);
  }
};
