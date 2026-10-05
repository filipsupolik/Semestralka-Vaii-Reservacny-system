const { prisma } = require("../../lib/prisma");

const categoryInclude = {
  categories: {
    include: {
      category: true,
    },
  },
};

// Return top 3 most recently created restaurants (excluding soft-deleted)
async function getTop3Restaurants() {
  return prisma.restaurant.findMany({
    where: { deletedAt: null },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    include: categoryInclude,
  });
}

// Return restaurants owned by the given user (excluding soft-deleted)
async function getRestaurantsByOwner(ownerId) {
  return prisma.restaurant.findMany({
    where: { ownerId, deletedAt: null },
    orderBy: {
      createdAt: "desc",
    },
    include: categoryInclude,
  });
}

// Paginated restaurant list with optional name/category filters
async function getRestaurants({ name, category, page, pageSize }) {
  const where = { deletedAt: null };

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (category) {
    where.categories = {
      some: {
        category: {
          name: category,
        },
      },
    };
  }

  const [items, total] = await Promise.all([
    prisma.restaurant.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: categoryInclude,
    }),
    prisma.restaurant.count({ where }),
  ]);

  return { items, total };
}

async function getRestaurantById(restaurantId) {
  return prisma.restaurant.findUnique({
    where: { restaurantId },
    include: categoryInclude,
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
    include: categoryInclude,
  });
}

async function updateRestaurant({
  restaurantId,
  name,
  address,
  description,
  categories,
  imageUrl,
}) {
  return prisma.restaurant.update({
    where: { restaurantId },
    data: {
      name,
      address,
      description,
      ...(imageUrl !== undefined && { imageUrl }),
      categories: {
        deleteMany: {},
        create: categories.map(({ categoryId }) => ({
          category: {
            connect: {
              categoryId,
            },
          },
        })),
      },
    },
    include: categoryInclude,
  });
}

// Soft delete: keep orders, menu items and category links for history
async function deleteRestaurant(restaurantId) {
  return prisma.restaurant.update({
    where: { restaurantId },
    data: { deletedAt: new Date() },
  });
}

module.exports = {
  getTop3Restaurants,
  getRestaurantsByOwner,
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
