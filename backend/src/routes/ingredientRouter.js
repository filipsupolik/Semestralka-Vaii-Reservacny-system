const { Router } = require("express");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  createIngredient,
  getAllIngredients,
} = require("../controllers/ingredientController");

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
  createIngredient,
);

module.exports = ingredientRouter;
