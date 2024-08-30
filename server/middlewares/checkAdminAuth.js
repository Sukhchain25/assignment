export default async function checkForAdminRights(req, res, next) {
  try {
    const apiKey = req.header("x-api-key"); //for admin if necessary
    const isAdmin = req.body.isAdmin;

    if (isAdmin) {
      if (apiKey === process.env.API_KEY) {
        next();
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid API key. Not authorized as an admin",
        });
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
