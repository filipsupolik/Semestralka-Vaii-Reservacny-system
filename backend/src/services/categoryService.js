const { prisma } = require("../../lib/prisma");

async function getAllCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { restaurants: true },
      },
    },
  });
}

async function getCategoryById(categoryId) {
  return prisma.category.findUnique({
    where: { categoryId },
  });
}

async function addCategory({ name, imageUrl }) {
  return prisma.category.create({
    data: {
      name,
      imageUrl,
    },
  });
}

async function updateCategory({ categoryId, name, imageUrl }) {
  return prisma.category.update({
    where: { categoryId },
    data: {
      ...(name !== undefined && { name }),
      ...(imageUrl !== undefined && { imageUrl }),
    },
  });
}

async function deleteCategory(categoryId) {
  return prisma.$transaction([
    prisma.restaurantCategory.deleteMany({ where: { categoryId } }),
    prisma.category.delete({ where: { categoryId } }),
  ]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
