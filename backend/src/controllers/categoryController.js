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
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const imageUrl = req.file
      ? `/uploads/categories/${req.file.filename}`
      : null;

    const category = await categoryService.addCategory({ name, imageUrl });
    res.status(201).json(category);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Failed to add category" });
  }
}

async function updateCategory(req, res) {
  try {
    const categoryId = parseInt(req.params.categoryId, 10);
    if (Number.isNaN(categoryId)) {
      return res.status(400).json({ message: "Invalid category id" });
    }

    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const imageUrl = req.file
      ? `/uploads/categories/${req.file.filename}`
      : undefined;

    const updated = await categoryService.updateCategory({
      categoryId,
      name: req.body.name,
      imageUrl,
    });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
}

module.exports = { getAllCategories, addCategory, updateCategory };
