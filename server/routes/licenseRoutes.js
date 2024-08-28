const express = require('express');
const router = express.Router();
const licenseController = require('../controller/licenseController');

// Route to get all license plans
router.get('/', licenseController.getLicensePlans);

// Route to create a new license plan
router.post('/', licenseController.createLicensePlan);

// Route to update a license plan by ID
router.put('/:id', licenseController.updateLicensePlan);

// Route to delete a license plan by ID
router.delete('/:id', licenseController.deleteLicensePlan);

module.exports = router;
