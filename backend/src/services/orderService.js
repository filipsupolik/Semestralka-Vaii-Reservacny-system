const { prisma } = require("../../lib/prisma");

async function getOrdersByRestaurant(restaurantId) {
  return prisma.order.findMany({
    where: { restaurantId },
    include: {
      orderItems: {
        include: { menuItem: true },
      },
      customer: {
        select: { firstName: true, lastName: true, email: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getOrderWithRestaurant(orderId) {
  return prisma.order.findUnique({
    where: { orderId },
    include: { restaurant: true },
  });
}

async function updateOrderStatus(orderId, status) {
  return prisma.order.update({
    where: { orderId },
    data: { status },
    include: {
      orderItems: {
        include: { menuItem: true },
      },
      customer: {
        select: { firstName: true, lastName: true, email: true },
      },
    },
  });
}

module.exports = {
  getOrdersByRestaurant,
  getOrderWithRestaurant,
  updateOrderStatus,
};
