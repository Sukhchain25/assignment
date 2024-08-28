// routes/usageRoutes.js
const express = require("express");
const router = express.Router();
const enforceLimits = require("../middlewares/enforceLimits");
const usageController = require("../controller/usageController");

router.get("/demo-endpoint", enforceLimits, usageController.checkUsage);

module.exports = router;
