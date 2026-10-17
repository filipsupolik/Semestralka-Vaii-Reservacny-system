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
const { validate } = require("../middleware/validateMiddleware");
const {
  menuItemParamsSchema,
  restaurantParamsSchema,
  menuItemBodySchema,
} = require("../schemas/menuItemSchemas");

const menuItemRouter = Router({ mergeParams: true });

menuItemRouter.get(
  "/menu",
  validate({ params: restaurantParamsSchema }),
  getMenuItems,
);

menuItemRouter.post(
  "/menu",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  upload.single("image"),
  processMenuItemImage,
  validate({ params: restaurantParamsSchema, body: menuItemBodySchema }),
  createMenuItem,
);

menuItemRouter.put(
  "/menu/:menuItemId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  upload.single("image"),
  processMenuItemImage,
  validate({ params: menuItemParamsSchema, body: menuItemBodySchema }),
  updateMenuItem,
);

menuItemRouter.delete(
  "/menu/:menuItemId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  validate({ params: menuItemParamsSchema }),
  deleteMenuItem,
);

menuItemRouter.get(
  "/categories",
  validate({ params: restaurantParamsSchema }),
  getMenuCategories,
);

module.exports = menuItemRouter;
