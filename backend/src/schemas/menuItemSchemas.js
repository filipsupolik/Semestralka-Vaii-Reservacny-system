const { z } = require("zod");
const { jsonField, idParam } = require("./common");

const menuItemParamsSchema = z.object({
  restaurantId: idParam,
  menuItemId: idParam,
});

const restaurantParamsSchema = z.object({
  restaurantId: idParam,
});

const menuItemBodySchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  description: z
    .string("Description is required")
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description is too long"),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .positive("Price must be greater than 0")
    .max(10000, "Price is too large"),
  categoryId: z.coerce
    .number({ error: "Category is required" })
    .int({ message: "Category is required" })
    .positive("Category is required"),
  ingredients: jsonField(
    z.array(
      z.coerce
        .number({ error: "Invalid ingredient" })
        .int({ message: "Invalid ingredient" })
        .positive({ message: "Invalid ingredient" }),
      "Ingredients must be an array",
    ),
  )
    .optional()
    .default([]),
});

module.exports = {
  menuItemParamsSchema,
  restaurantParamsSchema,
  menuItemBodySchema,
};
