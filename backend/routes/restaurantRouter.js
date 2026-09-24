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

const restaurantRouter = Router();

restaurantRouter.get("/", getTop3);
restaurantRouter.get("/", searchRestaurants);
restaurantRouter.post(
  "/",
  authMiddleware,
  requireRoleMiddleware("RESTAURANT_OWNER"),
  createRestaurant,
);

module.exports = restaurantRouter;
