const { prisma } = require("../../lib/prisma");

async function getAllCategories() {
  return prisma.category.findMany();
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

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
};
