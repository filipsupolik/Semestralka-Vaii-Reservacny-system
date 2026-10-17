const fs = require("fs");
const path = require("path");
const restaurantService = require("../services/restaurantService");

function unlinkImage(imageUrl) {
  if (!imageUrl) return;
  const filepath = path.join(__dirname, "..", "..", imageUrl);
  fs.unlink(filepath, () => {});
}

// list 3 most recently created restaurants
async function getTop3(req, res) {
  const restaurants = await restaurantService.getTop3Restaurants();

  res.status(200).json(restaurants);
}

// paginated restaurant list with optional name/category filters
async function getRestaurants(req, res) {
  const { name, category } = req.query;
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 9;

  const { items, total } = await restaurantService.getRestaurants({
    name,
    category,
    page,
    pageSize,
  });

  res.status(200).json({
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}

async function getRestaurantById(req, res) {
  const { restaurantId } = req.params;

  const restaurant = await restaurantService.getRestaurantById(restaurantId);
  if (!restaurant || restaurant.deletedAt) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  res.status(200).json(restaurant);
}

// list restaurants owned by the currently logged-in user
async function getMyRestaurants(req, res) {
  try {
    const restaurants = await restaurantService.getRestaurantsByOwner(
      req.userId,
    );
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching owner restaurants:", error);
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
}

async function createRestaurant(req, res) {
  const { name, address, description, categories } = req.body;

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

async function updateRestaurant(req, res) {
  const { restaurantId } = req.params;

  const restaurant = await restaurantService.getRestaurantById(restaurantId);
  if (!restaurant || restaurant.deletedAt) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  if (restaurant.ownerId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { name, address, description, categories } = req.body;

  const imageUrl = req.file
    ? `/uploads/restaurants/${req.file.filename}`
    : undefined;

  const updated = await restaurantService.updateRestaurant({
    restaurantId,
    name,
    address,
    description,
    categories,
    imageUrl,
  });

  if (req.file) {
    unlinkImage(restaurant.imageUrl);
  }

  return res.status(200).json(updated);
}

async function deleteRestaurant(req, res) {
  const { restaurantId } = req.params;

  const restaurant = await restaurantService.getRestaurantById(restaurantId);
  if (!restaurant || restaurant.deletedAt) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  if (restaurant.ownerId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  await restaurantService.deleteRestaurant(restaurantId);

  return res.status(200).json({ message: "Restaurant deleted" });
}

module.exports = {
  getTop3,
  getRestaurants,
  getRestaurantById,
  getMyRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
