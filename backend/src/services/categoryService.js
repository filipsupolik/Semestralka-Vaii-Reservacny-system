const { prisma } = require("../../lib/prisma");

async function getAllCategories() {
  return prisma.category.findMany();
}

async function addCategory(name) {
  return prisma.category.create({
    data: {
      name,
    },
  });
}

module.exports = {
  getAllCategories,
  addCategory,
};
