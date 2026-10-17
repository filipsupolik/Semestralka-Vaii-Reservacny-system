const { z } = require("zod");

const PHONE_REGEX = /^[+0-9][0-9\s-]{7,19}$/;

const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string("Password is required").min(1, "Password is required"),
});

const registerSchema = z.object({
  firstName: z
    .string("First name is required")
    .trim()
    .min(1, "First name is required")
    .max(50, "First name is too long"),
  lastName: z
    .string("Last name is required")
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name is too long"),
  email: z.email("Invalid email format"),
  password: z
    .string("Password is required")
    .min(8, "Password must be at least 8 characters"),
  phoneNumber: z
    .string("Phone number is required")
    .regex(PHONE_REGEX, "Invalid phone number"),
  role: z
    .enum(["CUSTOMER", "RESTAURANT_OWNER"], "Invalid role")
    .default("CUSTOMER"),
});

module.exports = { loginSchema, registerSchema, PHONE_REGEX };
