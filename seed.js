// seed.js
import LicensePlan from "./server/models/licensePlan.model.js";

async function seedLicensePlans() {
  try {
    const plans = [
      { name: "Basic Plan", maxApiCalls: 10, price: 10 },
      { name: "Premium Plan", maxApiCalls: 20, price: 50 },
    ];

    for (const plan of plans) {
      const existingPlan = await LicensePlan.findOne({ name: plan.name });
      if (!existingPlan) {
        await LicensePlan.create(plan);
        console.log(`Seeded license plan: ${plan.name}`);
      }
    }
  } catch (error) {
    console.error("Error seeding license plans:", error);
  }
}

export default seedLicensePlans;
