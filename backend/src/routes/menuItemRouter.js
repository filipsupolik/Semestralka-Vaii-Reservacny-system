const { Router } = require("express");
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuCategories,
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

menuItemRouter.put(
  "/menu/:menuItemId",
  authMiddleware,
  requireRoleMiddleware,
  updateMenuItem,
);

menuItemRouter.delete(
  "/menu/:menuItemId",
  authMiddleware,
  requireRoleMiddleware,
  deleteMenuItem,
);

menuItemRouter.get("/categories", getMenuCategories);

module.exports = menuItemRouter;
