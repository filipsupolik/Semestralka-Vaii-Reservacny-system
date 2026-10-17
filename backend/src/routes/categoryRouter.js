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
const { validate } = require("../middleware/validateMiddleware");
const {
  categoryParamsSchema,
  categoryCreateSchema,
  categoryUpdateSchema,
} = require("../schemas/categorySchemas");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  upload.single("image"),
  processCategoryImage,
  validate({ body: categoryCreateSchema }),
  addCategory,
);
categoryRouter.put(
  "/:categoryId",
  authMiddleware,
  requireRole("ADMIN"),
  upload.single("image"),
  processCategoryImage,
  validate({ params: categoryParamsSchema, body: categoryUpdateSchema }),
  updateCategory,
);
categoryRouter.delete(
  "/:categoryId",
  authMiddleware,
  requireRole("ADMIN"),
  validate({ params: categoryParamsSchema }),
  deleteCategory,
);

module.exports = categoryRouter;
