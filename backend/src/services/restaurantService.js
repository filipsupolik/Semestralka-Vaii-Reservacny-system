const { prisma } = require("../../lib/prisma");

// Return top 3 restaurants by newest id until a createdAt field exists.
async function getTop3Restaurants() {
  return prisma.restaurant.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
}

// Return restaurants owned by the given user
async function getRestaurantsByOwner(ownerId) {
  return prisma.restaurant.findMany({
    where: { ownerId },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categories: true,
    },
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
  getTop3Restaurants,
  getRestaurantsByOwner,
  searchRestaurants,
  createRestaurant,
};
