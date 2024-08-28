// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const checkForAdminRights = require("../middlewares/checkAdminAuth");
const auth = require("../middlewares/authorizeUser");

// Route to get all users
router.get("/", userController.getUsers);
router.post("/sign-up", checkForAdminRights, userController.signUp);
router.post("/sign-in", userController.signIn);
router.put("/select-plan", auth.verifyToken, userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
