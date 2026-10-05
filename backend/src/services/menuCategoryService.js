const { prisma } = require("../../lib/prisma");

async function getCategoriesByOwner(ownerId) {
  return prisma.menuCategory.findMany({
    where: { ownerId },
  });
}

async function createMenuCategory({ name, ownerId }) {
  return prisma.menuCategory.create({
    data: {
      name,
      ownerId,
    },
  });
}

async function getMenuCategoryById(categoryId) {
  return prisma.menuCategory.findUnique({
    where: { categoryId },
  });
}

module.exports = {
  getCategoriesByOwner,
  createMenuCategory,
  getMenuCategoryById,
};
