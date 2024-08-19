// middlewares/enforceLimits.js
const User = require('../models/user.model');
const ApiUsage = require('../models/apiUsage.model');

module.exports = async function enforceLimits(req, res, next) {
  try {
    const userId = req.header('user-id'); // Assume the user ID is passed via header for simplicity
    const user = await User.findById(userId).populate('licensePlan');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.apiCallsMade >= user.licensePlan.maxApiCalls) {
      return res
        .status(429)
        .json({ error: 'LimitExceededError: API usage limit exceeded' });
    }

    // Track the API usage
    user.apiCallsMade += 1;
    await user.save();

    // Log the API call
    await ApiUsage.create({ user: user._id, endpoint: req.originalUrl });

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
