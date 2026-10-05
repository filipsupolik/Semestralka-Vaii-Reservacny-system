const { Router } = require("express");
const {
  getMenuItems,
  createMenuItem,
  getMenuCategories,
  createMenuCategory,
} = require("../controllers/menuItemController");
const {
  authMiddleware,
  requireRoleMiddleware,
} = require("../middleware/authMiddleware");

const menuItemRouter = Router({ mergeParams: true });

menuItemRouter.get("/menu", getMenuItems);

menuItemRouter.post(
  "/menu",
  authMiddleware,
  requireRoleMiddleware,
  createMenuItem,
);

menuItemRouter.get("/menu-categories", getMenuCategories);

menuItemRouter.post(
  "/menu-categories",
  authMiddleware,
  requireRoleMiddleware,
  createMenuCategory,
);

module.exports = menuItemRouter;
