import express from "express";
import userController from "../controller/userController.js";
import checkForAdminRights from "../middlewares/checkAdminAuth.js";
import auth from "../middlewares/authorizeUser.js";

const router = express.Router();

// Route to get all users
router.get("/", userController.getUsers);
router.post("/sign-up", checkForAdminRights, userController.signUp);
router.post("/sign-in", userController.signIn);
router.put("/select-plan", auth.verifyToken, userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);

export default router;
