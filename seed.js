// seed.js
const LicensePlan = require('./src/models/licensePlan.model');

async function seedLicensePlans() {
  try {
    const plans = [
      { name: 'Basic Plan', maxApiCalls: 10, price: 10 },
      { name: 'Premium Plan', maxApiCalls: 20, price: 50 },
    ];

    for (const plan of plans) {
      const existingPlan = await LicensePlan.findOne({ name: plan.name });
      if (!existingPlan) {
        await LicensePlan.create(plan);
        console.log(`Seeded license plan: ${plan.name}`);
      }
    }
  } catch (error) {
    console.error('Error seeding license plans:', error);
  }
}

module.exports = { seedLicensePlans };
