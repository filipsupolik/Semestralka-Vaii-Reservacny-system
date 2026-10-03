const { Router } = require("express");
const {
  getTop3,
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
restaurantRouter.post(
  "/",
  authMiddleware,
  requireRoleMiddleware,
  upload.single("image"),
  processImage,
  createRestaurant,
);

module.exports = restaurantRouter;
