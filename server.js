/* eslint-disable import/order */
/* eslint-disable node/no-missing-require */
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');

// Configure environment variables
dotenv.config({ path: path.resolve(__dirname, 'config.env') });

const morgan = require('morgan');
const colors = require('colors');
const compression = require('compression');
const cors = require('cors');

// Import custom modules
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const mountRoutes = require('./routes');
const { webhookCheckout } = require('./controllers/orderService');
const dbConnection = require('./config/database');

// Connect to database
dbConnection();

// Initialize Express app
const app = express();

// Global Middlewares
app.use(cors()); // Enable CORS
app.enable('trust proxy'); // Trust proxy for secure headers
app.use(compression()); // Compress responses

// Webhook route (before body parsing middlewares)
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),  // Use express.raw directly instead of body-parser
  webhookCheckout
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Mode: ${process.env.NODE_ENV}`.yellow);
}

// Mount routes
mountRoutes(app);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.green);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    console.log('Unhandled Rejection! Shutting down...');
    process.exit(1);
  });
});
