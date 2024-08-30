import jwt from "jsonwebtoken";

const auth = {
  verifyToken: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        const user = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
      } else {
        return res.status(401).json("You are not authenticated!");
      }
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message || "something went wrong",
      });
    }
  },
};

export default auth;
