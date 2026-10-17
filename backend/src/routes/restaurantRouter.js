const { Router } = require("express");
const {
  getTop3,
  getRestaurants,
  getRestaurantById,
  getMyRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const { upload, processImage } = require("../middleware/uploadMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const {
  restaurantParamsSchema,
  restaurantBodySchema,
  restaurantsQuerySchema,
} = require("../schemas/restaurantSchemas");

const restaurantRouter = Router();

restaurantRouter.get(
  "/",
  validate({ query: restaurantsQuerySchema }),
  getRestaurants,
);
restaurantRouter.get("/top", getTop3);
restaurantRouter.get(
  "/owned-restaurants",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  getMyRestaurants,
);
restaurantRouter.get(
  "/:restaurantId",
  validate({ params: restaurantParamsSchema }),
  getRestaurantById,
);
restaurantRouter.post(
  "/",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  upload.single("image"),
  processImage,
  validate({ body: restaurantBodySchema }),
  createRestaurant,
);
restaurantRouter.put(
  "/:restaurantId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  upload.single("image"),
  processImage,
  validate({ params: restaurantParamsSchema, body: restaurantBodySchema }),
  updateRestaurant,
);
restaurantRouter.delete(
  "/:restaurantId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  validate({ params: restaurantParamsSchema }),
  deleteRestaurant,
);

module.exports = restaurantRouter;
