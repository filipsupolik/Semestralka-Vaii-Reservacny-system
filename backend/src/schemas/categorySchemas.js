const { z } = require("zod");
const { idParamSchema } = require("./common");

const categoryParamsSchema = idParamSchema("categoryId");

const categoryCreateSchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .min(1, "Name is required")
    .max(50, "Name is too long"),
});

const categoryUpdateSchema = z.object({
  name: z
    .string("Invalid name")
    .trim()
    .min(1, "Name is required")
    .max(50, "Name is too long")
    .optional(),
});

module.exports = {
  categoryParamsSchema,
  categoryCreateSchema,
  categoryUpdateSchema,
};
