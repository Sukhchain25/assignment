const mongoose = require('mongoose');

const licensePlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    maxApiCalls: { type: Number, required: true }, // The maximum API calls allowed for this plan
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const LicensePlan = mongoose.model('LicensePlan', licensePlanSchema);
module.exports = LicensePlan;
