const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed"));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter,
});

const createProcessImage = ({ folder, width, height }) => {
  return async (req, res, next) => {
    if (!req.file) {
      return next();
    }

    try {
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, 10);
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const filename = `${timestamp}-${randomSuffix}${path.extname(req.file.originalname)}`;
      const filepath = `uploads/${folder}/${filename}`;

      await sharp(req.file.buffer)
        .resize(width, height, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 80 })
        .toFile(filepath);

      req.file.filename = filename;
      req.file.path = filepath;

      next();
    } catch (error) {
      next(error);
    }
  };
};

const processImage = createProcessImage({
  folder: "restaurants",
  width: 800,
  height: 600,
});

const processCategoryImage = createProcessImage({
  folder: "categories",
  width: 128,
  height: 128,
});

module.exports = { upload, processImage, processCategoryImage };
