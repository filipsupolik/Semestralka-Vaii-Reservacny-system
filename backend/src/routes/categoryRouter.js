const { Router } = require("express");
const {
  getAllCategories,
  addCategory,
} = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", addCategory);

module.exports = categoryRouter;
