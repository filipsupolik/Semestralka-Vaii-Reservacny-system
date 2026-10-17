const { z } = require("zod");

/**
 * Wraps a schema so it also accepts a JSON string (multipart form fields)
 * and parses it before validating. Invalid JSON fails the inner schema.
 */
const jsonField = (schema) =>
  z.preprocess((value) => {
    if (typeof value !== "string") return value;
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }, schema);

const idParam = z.coerce
  .number({ error: "Invalid id" })
  .int({ message: "Invalid id" })
  .positive({ message: "Invalid id" });

const idParamSchema = (name) => z.object({ [name]: idParam });

module.exports = { jsonField, idParam, idParamSchema };
