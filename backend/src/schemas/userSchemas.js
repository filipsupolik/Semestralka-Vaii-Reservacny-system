const { z } = require("zod");
const { idParamSchema } = require("./common");
const { PHONE_REGEX } = require("./authSchemas");

const userParamsSchema = idParamSchema("userId");

const updateUserSchema = z
  .object({
    firstName: z
      .string("Invalid first name")
      .trim()
      .min(1, "First name is required")
      .max(50, "First name is too long")
      .optional(),
    lastName: z
      .string("Invalid last name")
      .trim()
      .min(1, "Last name is required")
      .max(50, "Last name is too long")
      .optional(),
    email: z.email("Invalid email format").optional(),
    phoneNumber: z
      .string("Invalid phone number")
      .regex(PHONE_REGEX, "Invalid phone number")
      .optional(),
    role: z
      .enum(["CUSTOMER", "RESTAURANT_OWNER", "ADMIN"], "Invalid role")
      .optional(),
    isActive: z.boolean("Invalid active flag").optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided",
  });

module.exports = { userParamsSchema, updateUserSchema };
