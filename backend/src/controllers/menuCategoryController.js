const menuCategoryService = require("../services/menuCategoryService");

async function getAllCategories(req, res) {
  try {
    const categories = await menuCategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching all categories:", error);
    res.status(500).json({ message: "Failed to fetch all categories" });
  }
}

async function createMenuCategory(req, res) {
  try {
    const { restaurantId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const category = await menuCategoryService.createMenuCategory({
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
  getAllCategories,
  createMenuCategory,
};
