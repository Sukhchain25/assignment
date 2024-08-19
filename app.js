// app.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const licenseRoutes = require('./src/routes/licenseRoutes');
const usageRoutes = require('./src/routes/usageRoutes');
const userRoutes = require('./src/routes/userRoutes');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/licenses', licenseRoutes);
app.use('/api/usage', usageRoutes);
app.use('/api/users', userRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
