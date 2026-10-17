const { Router } = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const { loginSchema, registerSchema } = require("../schemas/authSchemas");

const authRouter = Router();

authRouter.post("/login", validate({ body: loginSchema }), login);
authRouter.post("/register", validate({ body: registerSchema }), register);
authRouter.get("/me", authMiddleware, getProfile);

module.exports = authRouter;
