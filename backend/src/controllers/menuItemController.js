const menuItemService = require("../services/menuItemService");

async function getMenuItems(req, res) {
  try {
    const { restaurantId } = req.params;
    const menuItems = await menuItemService.getMenuItems(parseInt(restaurantId));
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Failed to fetch menu items" });
  }
}

async function createMenuItem(req, res) {
  try {
    const { restaurantId } = req.params;
    const { name, description, price, categoryId } = req.body;

    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({
        message: "Name, description, price, and categoryId are required",
      });
    }

    const menuItem = await menuItemService.createMenuItem({
      name,
      description,
      price,
      categoryId,
      restaurantId: parseInt(restaurantId),
    });

    res.status(201).json(menuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).json({ message: "Failed to create menu item" });
  }
}

async function getMenuCategories(req, res) {
  try {
    const { restaurantId } = req.params;
    const categories = await menuItemService.getMenuCategories(
      parseInt(restaurantId)
    );
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    res.status(500).json({ message: "Failed to fetch menu categories" });
  }
}

async function createMenuCategory(req, res) {
  try {
    const { restaurantId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = await menuItemService.createMenuCategory({
      name,
      restaurantId: parseInt(restaurantId),
    });

    res.status(201).json(category);
  } catch (error) {
    console.error("Error creating menu category:", error);
    res.status(500).json({ message: "Failed to create menu category" });
  }
}

module.exports = {
  getMenuItems,
  createMenuItem,
  getMenuCategories,
  createMenuCategory,
};
