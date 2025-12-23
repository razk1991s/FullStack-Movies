// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// אימות טוקן
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // בדיקת Session Timeout
    const now = Date.now();
    const sessionLimit = user.loginTime + user.sessionTimeOut * 60 * 1000;

    if (now > sessionLimit) {
      return res.status(401).json({ message: "Session expired" });
    }

    req.user = user;
    next();
  });
}

// בדיקת הרשאות
function authorize(requiredPermission) {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];

    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({ message: "Permission denied" });
    }

    next();
  };
}

module.exports = { authenticateToken, authorize };
