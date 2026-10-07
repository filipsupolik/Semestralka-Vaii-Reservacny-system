const { prisma } = require("../../lib/prisma");

async function getAllIngredients() {
  return prisma.ingredient.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

async function getIngredientById(ingredientId) {
  return prisma.ingredient.findUnique({
    where: { ingredientId },
  });
}

async function createIngredient(name) {
  return prisma.ingredient.create({
    data: {
      name: name.trim().toLowerCase(),
    },
  });
}

module.exports = {
  getAllIngredients,
  getIngredientById,
  createIngredient,
};
