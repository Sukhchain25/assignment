// routes/usageRoutes.js
const express = require('express');
const router = express.Router();
const enforceLimits = require('../middlewares/enforceLimits');

router.get('/demo-endpoint', enforceLimits, (req, res) => {
  res.json({ message: 'API call successful!' });
});


module.exports = router;
