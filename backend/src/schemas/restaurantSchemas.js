const { z } = require("zod");
const { jsonField, idParamSchema } = require("./common");

const restaurantParamsSchema = idParamSchema("restaurantId");

const restaurantBodySchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  address: z
    .string("Address is required")
    .trim()
    .min(1, "Address is required")
    .max(255, "Address is too long"),
  description: z
    .string("Description is required")
    .trim()
    .min(1, "Description is required")
    .max(1000, "Description is too long"),
  categories: jsonField(
    z
      .array(
        z.object({
          categoryId: z.coerce
            .number({ error: "Invalid category" })
            .int({ message: "Invalid category" })
            .positive({ message: "Invalid category" }),
        }),
        "Categories must be an array",
      )
      .min(1, "At least one category is required"),
  ),
});

const restaurantsQuerySchema = z.object({
  name: z.string({ error: "Invalid name filter" }).trim().max(100).optional(),
  category: z
    .string({ error: "Invalid category filter" })
    .trim()
    .max(100)
    .optional(),
  page: z.coerce
    .number({ error: "Invalid page" })
    .int({ message: "Invalid page" })
    .min(1, "Invalid page")
    .optional(),
  pageSize: z.coerce
    .number({ error: "Invalid page size" })
    .int({ message: "Invalid page size" })
    .min(1, "Invalid page size")
    .max(50, "Invalid page size")
    .optional(),
});

module.exports = {
  restaurantParamsSchema,
  restaurantBodySchema,
  restaurantsQuerySchema,
};
