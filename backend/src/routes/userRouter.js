const { Router } = require("express");
const { getUsers, updateUser } = require("../controllers/userController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const {
  userParamsSchema,
  updateUserSchema,
} = require("../schemas/userSchemas");

const userRouter = Router();

userRouter.get("/", authMiddleware, requireRole("ADMIN"), getUsers);
userRouter.put(
  "/:userId",
  authMiddleware,
  requireRole("ADMIN"),
  validate({ params: userParamsSchema, body: updateUserSchema }),
  updateUser,
);

module.exports = userRouter;
