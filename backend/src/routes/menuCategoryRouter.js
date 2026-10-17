const { Router } = require("express");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  createMenuCategory,
  getAllCategories,
} = require("../controllers/menuCategoryController");
const { validate } = require("../middleware/validateMiddleware");
const { menuCategoryBodySchema } = require("../schemas/menuCategorySchemas");

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
  validate({ body: menuCategoryBodySchema }),
  createMenuCategory,
);

module.exports = menuCategoryRouter;
