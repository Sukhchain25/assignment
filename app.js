import express from "express";
import bodyParser from "body-parser";
import path from "path";
import licenseRoutes from "./server/routes/licenseRoutes.js";
import usageRoutes from "./server/routes/usageRoutes.js";
import userRoutes from "./server/routes/userRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/licenses", licenseRoutes);
app.use("/api/usage", usageRoutes);
app.use("/api/users", userRoutes);

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date().toISOString() });
});

// Error handling
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
