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
async function createRestaurant(req, res) {
  let { name, address, description, categories } = req.body;

  try {
    categories = JSON.parse(categories);
  } catch {
    return res.status(400).json({
      message: "Invalid categories format",
    });
  }

  if (
    !name ||
    !address ||
    !description ||
    !Array.isArray(categories) ||
    categories.some((category) => !category)
  ) {
    return res.status(400).json({
      message: "Name, address, description, and categories are required",
    });
  }

  const imageUrl = req.file
    ? `/uploads/restaurants/${req.file.filename}`
    : null;

  const restaurant = await restaurantService.createRestaurant({
    ownerId: req.userId,
    name,
    address,
    description,
    categories,
    imageUrl,
  });

  return res.status(201).json(restaurant);
}

module.exports = { getTop3, searchRestaurants, createRestaurant };
