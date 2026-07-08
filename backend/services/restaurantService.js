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

module.exports = { getAllRestaurants };
