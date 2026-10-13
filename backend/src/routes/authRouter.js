const { Router } = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/me", authMiddleware, getProfile);

module.exports = authRouter;
