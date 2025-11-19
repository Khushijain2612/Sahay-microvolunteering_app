// Clear mongoose model cache to prevent OverwriteModelError
const mongoose = require('mongoose');
if (mongoose.connection.models) {
  delete mongoose.connection.models['User'];
  delete mongoose.connection.models['Opportunity'];
  delete mongoose.connection.models['EventBooking'];
  delete mongoose.connection.models['VolunteerWork'];
}

const express = require('express');
const cors = require('cors');
const passport = require('passport');
require('dotenv').config();
require('./config/database');
require('./config/passport');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/opportunities', require('./routes/opportunities'));
app.use('/api/events', require('./routes/events'));
app.use('/api/volunteer', require('./routes/volunteer'));
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Microvolunteering API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler - FIXED VERSION
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found',
    path: req.originalUrl
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});