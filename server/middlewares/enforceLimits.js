import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export default async function enforceLimits(req, res, next) {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = bearer.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token is invalid!" });
      }

      req.user = user;

      try {
        const foundUser = await User.findOne({
          emailId: req.user.emailId,
        }).populate("licensePlan");

        if (!foundUser) {
          return res.status(404).json({ error: "User not found" });
        }

        if (foundUser.apiCallsUsed >= foundUser.licensePlan.maxApiCalls) {
          return res.status(403).json({
            error: "LimitExceededError",
            message: "API usage limit exceeded for the current plan",
          });
        }

        foundUser.apiCallsUsed += 1;
        await foundUser.save();

        next();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
