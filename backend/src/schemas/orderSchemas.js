const { z } = require("zod");
const { idParam } = require("./common");

const ORDER_STATUSES = ["PENDING", "PREPARING", "COMPLETED", "CANCELLED"];

const orderParamsSchema = z.object({
  restaurantId: idParam,
  orderId: idParam,
});

const restaurantParamsSchema = z.object({
  restaurantId: idParam,
});

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        menuItemId: z
          .number("Invalid order items")
          .int("Invalid order items")
          .positive("Invalid order items"),
        quantity: z
          .number("Invalid order items")
          .int("Invalid order items")
          .positive("Invalid order items"),
      }),
      "Invalid order items",
    )
    .min(1, "Order items are required"),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES, "Invalid status"),
});

module.exports = {
  ORDER_STATUSES,
  orderParamsSchema,
  restaurantParamsSchema,
  createOrderSchema,
  updateOrderStatusSchema,
};
