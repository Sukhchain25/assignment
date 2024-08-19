// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const checkForAdminRights = require('../middlewares/checkAdminAuth');

// Route to get all users
router.get('/', userController.getUsers);

// Route to create a new user
router.post('/', checkForAdminRights, userController.createUser);

// Route to update a user by ID
router.put('/patch/:id', userController.updateUser);

// Route to delete a user by ID
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
