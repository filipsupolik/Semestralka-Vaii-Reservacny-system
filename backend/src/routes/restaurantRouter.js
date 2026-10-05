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

const restaurantRouter = Router();

restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/top", getTop3);
restaurantRouter.get(
  "/owned-restaurants",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  getMyRestaurants,
);
restaurantRouter.get("/:restaurantId", getRestaurantById);
restaurantRouter.post(
  "/",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  upload.single("image"),
  processImage,
  createRestaurant,
);
restaurantRouter.put(
  "/:restaurantId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  upload.single("image"),
  processImage,
  updateRestaurant,
);
restaurantRouter.delete(
  "/:restaurantId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  deleteRestaurant,
);

module.exports = restaurantRouter;
