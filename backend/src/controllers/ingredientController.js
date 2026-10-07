const ingredientService = require("../services/ingredientService");

async function getAllIngredients(req, res) {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    res.status(500).json({ message: "Failed to fetch ingredients" });
  }
}

async function createIngredient(req, res) {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Name is required" });
    }

    const ingredient = await ingredientService.createIngredient(name);
    res.status(201).json(ingredient);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Ingredient already exists" });
    }
    console.error("Error creating ingredient:", error);
    res.status(500).json({ message: "Failed to create ingredient" });
  }
}

module.exports = {
  getAllIngredients,
  createIngredient,
};
