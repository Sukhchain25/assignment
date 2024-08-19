// controllers/userController.js
const User = require('../models/user.model');
const LicensePlan = require('../models/licensePlan.model');
const logger = require('../shared/logger');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {
  createUser: async (req, res) => {
    try {
      const { emailId, password, planId, name, isAdmin } = req.body;
      const userExist = await User.findOne({ emailId });
      if (userExist) {
        return res.status(401).json({
          success: false,
          message: 'Email already exist',
        });
      }
      const token = await jwt.sign(
        {
          emailId,
          name,
          planId,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userPlan = await LicensePlan.findById({ _id: planId });
      const newUser = new User({
        emailId,
        name,
        password: hashedPassword,
        licensePlan: userPlan,
        isAdmin,
      });
      await newUser.save();
      logger.info('signUp api - User saved');
      return res.status(201).json({
        success: true,
        message: 'User saved successfully',
        data: newUser,
        token,
      });
    } catch (err) {
      logger.error(`CreateUser - Error: ${err.message || err}`);
      return res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
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
      const { username, licensePlanId, emailId } = req.body;
      //check if email already exists
      const userFound = await User.findOne({ emailId });
      if (userFound) {
        return res.status(400).json({
          success: false,
          message: 'User already exists with this emailId',
        });
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { username, licensePlan: licensePlanId, emailId },
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
