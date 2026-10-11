const { Router } = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");

const orderRouter = Router({ mergeParams: true });

orderRouter.post("/orders", authMiddleware, createOrder);

orderRouter.get(
  "/orders",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  getOrders,
);

orderRouter.put(
  "/orders/:orderId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  updateOrderStatus,
);

module.exports = orderRouter;
