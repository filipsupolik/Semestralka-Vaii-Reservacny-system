const menuItemService = require("../services/menuItemService");

async function getMenuItems(req, res) {
  try {
    const { restaurantId } = req.params;
    const menuItems = await menuItemService.getMenuItems(
      parseInt(restaurantId),
    );
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

async function updateMenuItem(req, res) {
  try {
    const { menuItemId } = req.params;
    const { name, description, price, categoryId } = req.body;

    if (!name || !description || !price || !categoryId) {
      return res.status(400).json({
        message: "Name, description, price, and categoryId are required",
      });
    }

    const existing = await menuItemService.getMenuItemWithOwner(
      parseInt(menuItemId),
    );

    if (!existing) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (existing.restaurant.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const menuItem = await menuItemService.updateMenuItem({
      menuItemId: parseInt(menuItemId),
      name,
      description,
      price,
      categoryId: parseInt(categoryId),
    });

    res.status(200).json(menuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Failed to update menu item" });
  }
}

async function deleteMenuItem(req, res) {
  try {
    const { menuItemId } = req.params;

    const existing = await menuItemService.getMenuItemWithOwner(
      parseInt(menuItemId),
    );

    if (!existing) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    if (existing.restaurant.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await menuItemService.deleteMenuItem(parseInt(menuItemId));
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Failed to delete menu item" });
  }
}

async function getMenuCategories(req, res) {
  try {
    const { restaurantId } = req.params;
    const categories = await menuItemService.getMenuCategories(
      parseInt(restaurantId),
    );
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching menu categories:", error);
    res.status(500).json({ message: "Failed to fetch menu categories" });
  }
}
module.exports = {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuCategories,
};
