const { Router } = require("express");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  createMenuCategory,
  getAllCategories,
} = require("../controllers/menuCategoryController");

const menuCategoryRouter = Router();

menuCategoryRouter.get(
  "/",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  getAllCategories,
);

menuCategoryRouter.post(
  "/",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  createMenuCategory,
);

module.exports = menuCategoryRouter;
