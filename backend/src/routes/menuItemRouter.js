const { Router } = require("express");
const {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuCategories,
} = require("../controllers/menuItemController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  upload,
  processMenuItemImage,
} = require("../middleware/uploadMiddleware");

const menuItemRouter = Router({ mergeParams: true });

menuItemRouter.get("/menu", getMenuItems);

menuItemRouter.post(
  "/menu",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  upload.single("image"),
  processMenuItemImage,
  createMenuItem,
);

menuItemRouter.put(
  "/menu/:menuItemId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  upload.single("image"),
  processMenuItemImage,
  updateMenuItem,
);

menuItemRouter.delete(
  "/menu/:menuItemId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  deleteMenuItem,
);

menuItemRouter.get("/categories", getMenuCategories);

module.exports = menuItemRouter;
