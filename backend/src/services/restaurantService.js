const { prisma } = require("../../lib/prisma");

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

//create 1 restaurant record
async function createRestaurant({
  ownerId,
  name,
  address,
  description,
  categories,
  imageUrl,
}) {
  return prisma.restaurant.create({
    data: {
      ownerId,
      name,
      address,
      description,
      imageUrl,
      categories: {
        create: categories.map(({ categoryId }) => ({
          category: {
            connect: {
              categoryId,
            },
          },
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
