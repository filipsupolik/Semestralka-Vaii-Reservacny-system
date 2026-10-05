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

async function updateMenuItem({
  menuItemId,
  name,
  description,
  price,
  categoryId,
}) {
  return prisma.menuItem.update({
    where: { menuItemId },
    data: { name, description, price, categoryId },
    include: {
      category: true,
    },
  });
}

async function deleteMenuItem(menuItemId) {
  return prisma.menuItem.delete({
    where: { menuItemId },
  });
}

async function getMenuItemWithOwner(menuItemId) {
  return prisma.menuItem.findUnique({
    where: { menuItemId },
    include: { restaurant: true },
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
  updateMenuItem,
  deleteMenuItem,
  getMenuItemWithOwner,
  getMenuCategories,
  createMenuCategory,
};
