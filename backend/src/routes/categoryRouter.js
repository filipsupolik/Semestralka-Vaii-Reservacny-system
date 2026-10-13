const { Router } = require("express");
const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const {
  upload,
  processCategoryImage,
} = require("../middleware/uploadMiddleware");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  upload.single("image"),
  processCategoryImage,
  addCategory,
);
categoryRouter.put(
  "/:categoryId",
  authMiddleware,
  requireRole("ADMIN"),
  upload.single("image"),
  processCategoryImage,
  updateCategory,
);
categoryRouter.delete(
  "/:categoryId",
  authMiddleware,
  requireRole("ADMIN"),
  deleteCategory,
);

module.exports = categoryRouter;
