import express from "express";
import licenseController from "../controller/licenseController.js";

const router = express.Router();

router.get("/", licenseController.getLicensePlans);
router.post("/", licenseController.createLicensePlan);
router.put("/:id", licenseController.updateLicensePlan);
router.delete("/:id", licenseController.deleteLicensePlan);

export default router;
