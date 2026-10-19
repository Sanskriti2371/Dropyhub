const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dealbridge';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serverless-friendly DB connection middleware
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected && mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI);
      isConnected = true;
      console.log(`Connected to MongoDB successfully at ${MONGO_URI}`);
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
    }
  }
  next();
});

// Initial database connection for local server
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      isConnected = true;
      console.log(`Connected to MongoDB successfully at ${MONGO_URI}`);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
    });
}

// Create API router
const apiRouter = express.Router();

// Health check endpoint
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    dbState: mongoose.connection.readyState
  });
});

// Mount API routes
apiRouter.use('/auth', require('./routes/auth'));
apiRouter.use('/products', require('./routes/products'));
apiRouter.use('/offers', require('./routes/offers'));
apiRouter.use('/wishlist', require('./routes/wishlist'));
apiRouter.use('/redirect', require('./routes/redirect'));
apiRouter.use('/analytics', require('./routes/analytics'));

// Mount on both /api and / so it works regardless of Vercel path rewriting
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Default 404 handler for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl || req.url} not found` });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? null : err.message
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`BUYhatke API server running on port ${PORT}`);
  });
}

module.exports = app;
