const orderService = require("../services/orderService");
const restaurantService = require("../services/restaurantService");

async function createOrder(req, res) {
  try {
    const { restaurantId } = req.params;
    const { items } = req.body;

    const restaurant = await restaurantService.getRestaurantById(restaurantId);

    if (!restaurant || restaurant.deletedAt) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const order = await orderService.createOrder({
      customerId: req.userId,
      restaurantId,
      items,
    });

    if (!order) {
      return res.status(400).json({ message: "Invalid menu items" });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
}

async function getOrders(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurant = await restaurantService.getRestaurantById(restaurantId);

    if (!restaurant || restaurant.deletedAt) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (restaurant.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await orderService.getOrdersByRestaurant(restaurantId);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { restaurantId, orderId } = req.params;
    const { status } = req.body;

    const order = await orderService.getOrderWithRestaurant(orderId);

    if (!order || order.restaurantId !== restaurantId) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.restaurant.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updated = await orderService.updateOrderStatus(orderId, status);
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
}

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
};
