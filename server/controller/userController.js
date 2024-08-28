// controllers/userController.js
const User = require("../models/user.model");
const LicensePlan = require("../models/licensePlan.model");
const logger = require("../shared/logger");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userController = {
  signUp: async (req, res) => {
    try {
      const { emailId, password, name, isAdmin } = req.body;
      console.log("body ---- ", req.body);
      const userExist = await User.findOne({ emailId });
      if (userExist) {
        return res.status(401).json({
          success: false,
          message: "Email already exist",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        emailId: emailId.toLowerCase(),
        name,
        password: hashedPassword,
        isAdmin,
      });
      await newUser.save();
      logger.info("signUp api - User saved");
      return res.status(201).json({
        success: true,
        message: "User saved successfully",
        data: newUser,
      });
    } catch (err) {
      logger.error(`CreateUser - Error: ${err.stack || err.essage || err}`);
      return res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    }
  },

  signIn: async (req, res) => {
    try {
      const { emailId, password } = req.body;
      // Check if the user exists
      const user = await User.findOne({ emailId });

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Email does not exist, sign up first",
        });
      }

      // Check if the password matches
      const correctPwd = await bcrypt.compare(password, user.password);
      if (correctPwd) {
        // Generate JWT token
        const accessToken = jwt.sign(
          {
            emailId,
            name: user.name,
            userId: user._id, // Including userId can be useful for identifying the user in other requests
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        logger.info("Login successful");

        return res.status(200).json({
          success: true,
          message: "Login successful",
          token: accessToken,
        });
      }

      logger.error("Invalid credentials or user unverified");
      return res.status(401).json({
        success: false,
        message: "Invalid credentials or unverified user",
      });
    } catch (err) {
      logger.error(
        `inside catch block sign-in api - ${err.stack || err.message}`
      );
      return res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
      });
    }
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.find().populate("licensePlan");
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { emailId } = req.user;
      const { planId } = req.body;
      //check if email already exists
      const user = await User.findOne({ emailId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const licensePlan = await LicensePlan.findById(planId);
      if (!licensePlan) {
        return res.status(404).json({ message: "License plan not found" });
      }

      // Update user with the license plan
      user.licensePlan = licensePlan._id;
      await user.save();
      logger.info(`Plan updated`);
      res.status(200).json({
        success: true,
        message: "Plan selected successfully",
      });
    } catch (error) {
      logger.error(`Error - updateUser: ${error.message || error}`);
      res.status(400).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      logger.info(`User deleted: ${id}`);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      logger.error(`Error - deleteUser: ${error.message || error}`);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = userController;