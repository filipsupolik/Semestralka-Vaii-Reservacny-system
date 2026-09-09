const { Router } = require("express");
const {
  getTop3,
  searchRestaurants,
} = require("../controllers/restaurantController");

const restaurantRouter = Router();

restaurantRouter.get("/", getTop3);
restaurantRouter.get("/", searchRestaurants);
