const { Router } = require("express");
const { getTop3 } = require("../controllers/restaurantController");

const restaurantRouter = Router();

restaurantRouter.get("/", getTop3);
