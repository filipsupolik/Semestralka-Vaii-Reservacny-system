const { Router } = require("express");
const {
  getAllCategories,
  addCategory,
} = require("../controllers/categoryController");

const { authMiddleware, requireRole } = require("../middleware/authMiddleware");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", authMiddleware, requireRole("ADMIN"), addCategory);

module.exports = categoryRouter;
