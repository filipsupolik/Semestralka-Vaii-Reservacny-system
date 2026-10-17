const { Router } = require("express");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  createIngredient,
  getAllIngredients,
} = require("../controllers/ingredientController");
const { validate } = require("../middleware/validateMiddleware");
const { ingredientBodySchema } = require("../schemas/ingredientSchemas");

const ingredientRouter = Router();

ingredientRouter.get(
  "/",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  getAllIngredients,
);

ingredientRouter.post(
  "/",
  authMiddleware,
  requireRole("RESTAURANT_OWNER"),
  validate({ body: ingredientBodySchema }),
  createIngredient,
);

module.exports = ingredientRouter;
