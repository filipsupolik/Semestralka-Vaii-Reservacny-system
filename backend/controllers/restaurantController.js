// list 3 most recently created restaurants
const restaurantService = require("../services/restaurantService");

async function getTop3(req, res) {
  const restaurants = await restaurantService.getAllRestaurants();

  res.status(200).json(restaurants);
}

module.exports = { getTop3 };
