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

      // req.query (and req.params on some setups) are getters returning a
      // fresh object on every access, so assign an own property instead of
      // mutating the returned object
      Object.defineProperty(req, key, {
        value: result.data,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    }

    next();
  };
}

module.exports = { validate };
