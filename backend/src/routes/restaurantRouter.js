const { Router } = require("express");
const {
  getTop3,
  getMyRestaurants,
  searchRestaurants,
  createRestaurant,
} = require("../controllers/restaurantController");
const {
  authMiddleware,
  requireRoleMiddleware,
} = require("../middleware/authMiddleware");
const { upload, processImage } = require("../middleware/uploadMiddleware");

const restaurantRouter = Router();

restaurantRouter.get("/", getTop3);
restaurantRouter.get("/", searchRestaurants);
restaurantRouter.get(
  "/owned-restaurants",
  authMiddleware,
  requireRoleMiddleware,
  getMyRestaurants,
);
restaurantRouter.post(
  "/",
  authMiddleware,
  requireRoleMiddleware,
  upload.single("image"),
  processImage,
  createRestaurant,
);

module.exports = restaurantRouter;
