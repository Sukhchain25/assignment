const LicensePlan = require('../models/licensePlan.model');
const logger = require('../shared/logger');

const licenseController = {
  createLicensePlan: async (req, res) => {
    try {
      const { name, maxApiCalls, price } = req.body;
      const licensePlan = new LicensePlan({ name, maxApiCalls, price });
      await licensePlan.save();
      logger.info('License plan saved!');
      res.status(201).json(licensePlan);
    } catch (error) {
      logger.error(`Error - licenseController: ${error.message || error}`);
      res.status(400).json({ error: error.message });
    }
  },

  getLicensePlans: async (req, res) => {
    try {
      const plans = await LicensePlan.find();
      res.status(200).json(plans);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateLicensePlan: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, maxApiCalls, price } = req.body;
      const updatedPlan = await LicensePlan.findByIdAndUpdate(
        id,
        { name, maxApiCalls, price },
        { new: true, runValidators: true }
      );

      if (!updatedPlan) {
        return res.status(404).json({ error: 'License plan not found' });
      }

      logger.info(`License plan updated: ${id}`);
      res.status(200).json(updatedPlan);
    } catch (error) {
      logger.error(`Error - licenseController: ${error.message || error}`);
      res.status(400).json({ error: error.message });
    }
  },

  deleteLicensePlan: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedPlan = await LicensePlan.findByIdAndDelete(id);

      if (!deletedPlan) {
        return res.status(404).json({ error: 'License plan not found' });
      }

      logger.info(`License plan deleted: ${id}`);
      res.status(200).json({ message: 'License plan deleted successfully' });
    } catch (error) {
      logger.error(`Error - licenseController: ${error.message || error}`);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = licenseController;
