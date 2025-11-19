require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// ✅ Check if JWT_SECRET exists
if (!process.env.JWT_SECRET) {
  console.error('❌ Fatal Error: JWT_SECRET is not defined in environment variables');
  console.log('💡 Create a .env file with JWT_SECRET=your_secret_key');
  process.exit(1);
}

// Middleware
app.use(express.json());

// Passport middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// Database connection
mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/sahay')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ ONLY USE ROUTES THAT EXIST - Comment out problematic ones
app.use('/api/admin', require('./routes/adminRoutes'));

// ❌ TEMPORARILY COMMENT OUT THESE IF THEY DON'T EXIST:
// app.use('/api/events', require('./routes/events'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));

// Add your routes one by one as you create them

// ✅ Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Sahay API Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    availableRoutes: ['/api/admin'] // Only list routes that exist
  });
});

// ✅ Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// ✅ 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    availableRoutes: ['/', '/health', '/api/admin']
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});