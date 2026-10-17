const { z } = require("zod");

const menuCategoryBodySchema = z.object({
  name: z
    .string("Name is required")
    .trim()
    .min(1, "Name is required")
    .max(50, "Name is too long"),
});

module.exports = { menuCategoryBodySchema };
