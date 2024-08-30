import User from "../models/user.model.js";
import logger from "../shared/logger.js";

const usageController = {
  checkUsage: async (req, res) => {
    try {
      const emailId = req.user.emailId;
      const userData = await User.findOne({ emailId }).populate("licensePlan");

      if (!userData) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      const countLeft =
        userData.licensePlan.maxApiCalls - userData.apiCallsUsed;

      return res.status(200).json({
        success: true,
        countLeft,
      });
    } catch (error) {
      logger.error(
        `usageController - checkUsage: ${error.stack || error.message || error}`
      );

      res.status(400).json({
        error: error.stack || error.message || error,
      });
    }
  },
};

export default usageController;
