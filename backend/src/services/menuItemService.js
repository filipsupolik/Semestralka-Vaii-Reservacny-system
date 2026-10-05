const { prisma } = require("../../lib/prisma");

async function getMenuItems(restaurantId) {
  return prisma.menuItem.findMany({
    where: { restaurantId },
    include: {
      category: true,
      ingredients: true,
    },
  });
}

async function createMenuItem({
  name,
  description,
  price,
  categoryId,
  restaurantId,
}) {
  return prisma.menuItem.create({
    data: {
      name,
      description,
      price,
      categoryId,
      restaurantId,
    },
    include: {
      category: true,
    },
  });
}

async function getMenuCategories(restaurantId) {
  return prisma.menuCategory.findMany({
    where: { restaurantId },
  });
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
  getMenuItems,
  createMenuItem,
  getMenuCategories,
  createMenuCategory,
};
