// list 3 most recently created restaurants
const restaurantService = require("../services/restaurantService");

async function getTop3(req, res) {
  const restaurants = await restaurantService.getAllRestaurants();

  res.status(200).json(restaurants);
}

// search or filter restaurants according to query
async function searchRestaurants(req, res) {
  const { name, category } = req.query;
  const filters = {};
  if (name) {
    filters.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (category) {
    filters.category = {
      some: {
        name: category,
      },
    };
  }
  const result = await restaurantService.searchRestaurants(filters);
  res.status(200).json(result);
}

module.exports = { getTop3, searchRestaurants };
