const app = require('./app');
const mongoose = require('mongoose');
const { seedLicensePlans } = require('./seed');
const logger = require('./src/shared/logger');
const PORT = process.env.PORT;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/licensing-system';

//connecting to
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    logger.info('Connected to database ...');
    //seeding initial data
    await seedLicensePlans();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`Database connection error:`, err.message || error);
    process.exit(1);
  });
