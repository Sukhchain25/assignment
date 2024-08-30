import express from "express";
import enforceLimits from "../middlewares/enforceLimits.js";
import usageController from "../controller/usageController.js";

const router = express.Router();

router.get("/demo-endpoint", enforceLimits, usageController.checkUsage);

export default router;
