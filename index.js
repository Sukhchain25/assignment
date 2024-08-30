import app from "./app.js";
import mongoose from "mongoose";
import seedLicensePlans from "./seed.js";
import logger from "./server/shared/logger.js";

const PORT = process.env.PORT;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/licensing-system";

// Connecting to the database
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    logger.info("Connected to database ...");
    // Seeding initial data
    await seedLicensePlans();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`Database connection error:`, err.message || err);
    process.exit(1);
  });
