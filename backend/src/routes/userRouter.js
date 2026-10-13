const { Router } = require("express");
const { getUsers, updateUser } = require("../controllers/userController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");

const userRouter = Router();

userRouter.get("/", authMiddleware, requireRole("ADMIN"), getUsers);
userRouter.put(
  "/:userId",
  authMiddleware,
  requireRole("ADMIN"),
  updateUser,
);

module.exports = userRouter;
