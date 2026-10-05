const fs = require("fs");
const path = require("path");
const restaurantService = require("../services/restaurantService");

function parseRestaurantId(param) {
  const restaurantId = parseInt(param, 10);
  return Number.isNaN(restaurantId) ? null : restaurantId;
}

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
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const pageSize = Math.min(
    50,
    Math.max(1, parseInt(req.query.pageSize, 10) || 9),
  );

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
  const restaurantId = parseRestaurantId(req.params.restaurantId);
  if (restaurantId === null) {
    return res.status(400).json({ message: "Invalid restaurant id" });
  }

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

function parseCategories(rawCategories) {
  let categories;
  try {
    categories = JSON.parse(rawCategories);
  } catch {
    return null;
  }

  if (!Array.isArray(categories) || categories.some((c) => !c)) {
    return null;
  }

  return categories;
}

async function createRestaurant(req, res) {
  const { name, address, description } = req.body;
  const categories = parseCategories(req.body.categories);

  if (!name || !address || !description || !categories) {
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

async function updateRestaurant(req, res) {
  const restaurantId = parseRestaurantId(req.params.restaurantId);
  if (restaurantId === null) {
    return res.status(400).json({ message: "Invalid restaurant id" });
  }

  const restaurant = await restaurantService.getRestaurantById(restaurantId);
  if (!restaurant || restaurant.deletedAt) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  if (restaurant.ownerId !== req.userId) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { name, address, description } = req.body;
  const categories = parseCategories(req.body.categories);

  if (!name || !address || !description || !categories) {
    return res.status(400).json({
      message: "Name, address, description, and categories are required",
    });
  }

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
  const restaurantId = parseRestaurantId(req.params.restaurantId);
  if (restaurantId === null) {
    return res.status(400).json({ message: "Invalid restaurant id" });
  }

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
