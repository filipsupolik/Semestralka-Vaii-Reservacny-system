const { prisma } = require("../lib/prisma");

// Return top 3 restaurants by newest id until a createdAt field exists.
async function getAllRestaurants() {
  return prisma.restaurant.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
}

// Filter all restaurants acoording to filter
async function searchRestaurants(filters) {
  return prisma.restaurant.findMany({
    where: filters,
  });
}

async function createRestaurant({
  ownerId,
  name,
  address,
  description,
  categories,
}) {
  return prisma.restaurant.create({
    data: {
      ownerId,
      name,
      address,
      description,
      categories: {
        create: categories.map(({ categoryId, name: categoryName }) => ({
          categoryId,
          name: categoryName,
        })),
      },
    },
    include: {
      categories: true,
    },
  });
}

module.exports = {
  getAllRestaurants,
  searchRestaurants,
  createRestaurant,
};
