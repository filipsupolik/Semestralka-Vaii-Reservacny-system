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

async function createOrder({ customerId, restaurantId, items }) {
  const menuItemIds = items.map((item) => item.menuItemId);
  const menuItems = await prisma.menuItem.findMany({
    where: { menuItemId: { in: menuItemIds } },
  });

  const menuItemById = new Map(
    menuItems.map((menuItem) => [menuItem.menuItemId, menuItem]),
  );

  for (const item of items) {
    const menuItem = menuItemById.get(item.menuItemId);
    if (!menuItem || menuItem.restaurantId !== restaurantId) {
      return null;
    }
  }

  const orderItems = items.map((item) => {
    const menuItem = menuItemById.get(item.menuItemId);
    return {
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      price_at_order_time: Number(menuItem.price),
    };
  });

  const totalPrice = orderItems.reduce(
    (total, item) => total + item.price_at_order_time * item.quantity,
    0,
  );

  return prisma.order.create({
    data: {
      customerId,
      restaurantId,
      totalPrice,
      status: "PENDING",
      orderItems: { create: orderItems },
    },
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
  createOrder,
  getOrderWithRestaurant,
  updateOrderStatus,
};
