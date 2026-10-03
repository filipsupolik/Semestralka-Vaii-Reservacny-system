/**
 * Category controller - handles category-related business logic
 * Used only by admin account, not by regular users
 * It can be used only by Postman or similar tools
 */
const categoryService = require("../services/categoryService");

async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
}

async function addCategory(req, res) {
  try {
    const { name } = req.body;
    const category = await categoryService.addCategory(name);
    res.status(201).json(category);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to add category" });
  }
}

module.exports = { getAllCategories, addCategory };
