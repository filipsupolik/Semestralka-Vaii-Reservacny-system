const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.userId = decoded.userId;
    next();
  });
}

function requireRoleMiddleware(req, res, next) {
  const authRole = req.headers["x-user-role"];
  if (authRole !== "RESTAURANT_OWNER") {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  next();
}

module.exports = { authMiddleware, requireRoleMiddleware };
