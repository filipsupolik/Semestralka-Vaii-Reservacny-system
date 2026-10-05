const { prisma } = require("../../lib/prisma");

async function getAllCategories() {
  return prisma.menuCategory.findMany();
}

async function createMenuCategory({ name, restaurantId }) {
  return prisma.menuCategory.create({
    data: {
      name,
      restaurantId,
    },
  });
}

module.exports = {
  getAllCategories,
  createMenuCategory,
};
