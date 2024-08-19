// controllers/userController.js
const User = require('../models/user.model');
const LicensePlan = require('../models/licensePlan.model');
const logger = require('../shared/logger');

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, licensePlanId } = req.body;
      const licensePlan = await LicensePlan.findById(licensePlanId);

      if (!licensePlan) {
        return res.status(404).json({ error: 'License plan not found' });
      }

      const user = new User({ username, licensePlan: licensePlanId });
      await user.save();
      logger.info('User created!');
      res.status(201).json(user);
    } catch (error) {
      logger.error(`Error - userController: ${error.message || error}`);
      res.status(400).json({ error: error.message });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find().populate('licensePlan');
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, licensePlanId } = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, licensePlan: licensePlanId },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      logger.info(`User updated: ${id}`);
      res.status(200).json(updatedUser);
    } catch (error) {
      logger.error(`Error - userController: ${error.message || error}`);
      res.status(400).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      logger.info(`User deleted: ${id}`);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      logger.error(`Error - userController: ${error.message || error}`);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = userController;
