const { Router } = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const {
  orderParamsSchema,
  restaurantParamsSchema,
  createOrderSchema,
  updateOrderStatusSchema,
} = require("../schemas/orderSchemas");

const orderRouter = Router({ mergeParams: true });

orderRouter.post(
  "/orders",
  authMiddleware,
  validate({ params: restaurantParamsSchema, body: createOrderSchema }),
  createOrder,
);

orderRouter.get(
  "/orders",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  validate({ params: restaurantParamsSchema }),
  getOrders,
);

orderRouter.put(
  "/orders/:orderId",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  validate({ params: orderParamsSchema, body: updateOrderStatusSchema }),
  updateOrderStatus,
);

module.exports = orderRouter;
