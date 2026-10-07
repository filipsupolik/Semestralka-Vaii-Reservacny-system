const fs = require("fs");
const path = require("path");
const menuItemService = require("../services/menuItemService");
const menuCategoryService = require("../services/menuCategoryService");
const ingredientService = require("../services/ingredientService");

async function parseIngredientIds(raw) {
  if (!raw) return [];

  let ids;
  try {
    ids = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!Array.isArray(ids)) return null;

  for (const id of ids) {
    const ingredient = await ingredientService.getIngredientById(
      parseInt(id, 10),
    );
    if (!ingredient) return null;
  }

  return ids.map((id) => parseInt(id, 10));
}

function unlinkImage(imageUrl) {
  if (!imageUrl) return;
  const filepath = path.join(__dirname, "..", "..", imageUrl);
  fs.unlink(filepath, () => {});
}

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

    const restaurant = await menuItemService.getRestaurantById(
      parseInt(restaurantId),
    );

    if (!restaurant || restaurant.deletedAt) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (restaurant.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const category = await menuCategoryService.getMenuCategoryById(
      parseInt(categoryId),
    );

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    if (category.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const ingredientIds = await parseIngredientIds(req.body.ingredients);
    if (ingredientIds === null) {
      return res
        .status(400)
        .json({ message: "Invalid or unknown ingredients" });
    }

    const imageUrl = req.file
      ? `/uploads/menu-items/${req.file.filename}`
      : null;

    const menuItem = await menuItemService.createMenuItem({
      name,
      description,
      price,
      imageUrl,
      categoryId: parseInt(categoryId),
      restaurantId: parseInt(restaurantId),
      ingredientIds,
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

    const category = await menuCategoryService.getMenuCategoryById(
      parseInt(categoryId),
    );

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    if (category.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const ingredientIds = await parseIngredientIds(req.body.ingredients);
    if (ingredientIds === null) {
      return res
        .status(400)
        .json({ message: "Invalid or unknown ingredients" });
    }

    const imageUrl = req.file
      ? `/uploads/menu-items/${req.file.filename}`
      : undefined;

    const menuItem = await menuItemService.updateMenuItem({
      menuItemId: parseInt(menuItemId),
      name,
      description,
      price,
      imageUrl,
      categoryId: parseInt(categoryId),
      ingredientIds,
    });

    if (req.file) {
      unlinkImage(existing.imageUrl);
    }

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
    unlinkImage(existing.imageUrl);
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
