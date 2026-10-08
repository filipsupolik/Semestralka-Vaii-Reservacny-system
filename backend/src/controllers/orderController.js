const orderService = require("../services/orderService");
const restaurantService = require("../services/restaurantService");

const ORDER_STATUSES = ["PENDING", "PREPARING", "COMPLETED", "CANCELLED"];

async function getOrders(req, res) {
  try {
    const { restaurantId } = req.params;
    const restaurant = await restaurantService.getRestaurantById(
      parseInt(restaurantId),
    );

    if (!restaurant || restaurant.deletedAt) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (restaurant.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const orders = await orderService.getOrdersByRestaurant(
      parseInt(restaurantId),
    );
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

    if (!status || !ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await orderService.getOrderWithRestaurant(parseInt(orderId));

    if (!order || order.restaurantId !== parseInt(restaurantId)) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.restaurant.ownerId !== req.userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const updated = await orderService.updateOrderStatus(
      parseInt(orderId),
      status,
    );
    res.status(200).json(updated);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
}

module.exports = {
  getOrders,
  updateOrderStatus,
};
