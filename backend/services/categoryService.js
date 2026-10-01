const { prisma } = require("../lib/prisma");

async function getAllCategories() {
  return prisma.category.findMany();
}

module.exports = {
  getAllCategories,
};
