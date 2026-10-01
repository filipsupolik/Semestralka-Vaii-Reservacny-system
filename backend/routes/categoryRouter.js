const { Router } = require("express");
const { getAllCategories } = require("../controllers/categoryController");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);

module.exports = categoryRouter;
