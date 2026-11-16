
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const userRoute = require('./routes/userRoute');
const stockRoute = require('./routes/stockRoute');
const orderRoute = require('./routes/orderRoute');
const transactionRoute = require('./routes/transactionRoute');

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://ss-stocks-trading.vercel.app',
  'https://sb-stocks-trading-38k7o41iv-syedshahidahameds-projects.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an origin and known frontend URLs
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow preview deployments belonging to this Vercel project
    const isVercelPreview =
      /^https:\/\/sb-stocks-trading-[a-z0-9-]+-syedshahidahameds-projects\.vercel\.app$/i
        .test(origin);

    if (isVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

// Apply CORS before API routes
app.use(cors(corsOptions));

// Parse JSON requests
app.use(express.json());

// Connect MongoDB before processing API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('MongoDB connection error:', error.message);

    return res.status(503).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SB Stocks API is running',
  });
});

// API routes
app.use('/api/users', userRoute);
app.use('/api/stocks', stockRoute);
app.use('/api/orders', orderRoute);
app.use('/api/transactions', transactionRoute);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);

  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Local development server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export Express app for Vercel
module.exports = app;
