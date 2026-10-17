/**
 * Request validation middleware factory.
 * Accepts zod schemas for body, params and/or query and returns 400
 * with the first issue message when validation fails.
 * Parsed/coerced body replaces req.body so controllers get typed data.
 */
function validate({ body, params, query } = {}) {
  return (req, res, next) => {
    const checks = [
      ["body", body],
      ["params", params],
      ["query", query],
    ];

    for (const [key, schema] of checks) {
      if (!schema) continue;

      const result = schema.safeParse(req[key]);
      if (!result.success) {
        return res
          .status(400)
          .json({ message: result.error.issues[0].message });
      }

      if (key === "body") {
        req.body = result.data;
      } else {
        Object.assign(req[key], result.data);
      }
    }

    next();
  };
}

module.exports = { validate };
