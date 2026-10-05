const { Router } = require("express");
const {
  authMiddleware,
  requireRoleMiddleware,
} = require("../middleware/authMiddleware");
const {
  createMenuCategory,
  getAllCategories,
} = require("../controllers/menuCategoryController");

const menuCategoryRouter = Router();

menuCategoryRouter.get("/", getAllCategories);

menuCategoryRouter.post(
  "/",
  authMiddleware,
  requireRoleMiddleware,
  createMenuCategory,
);

module.exports = menuCategoryRouter;
