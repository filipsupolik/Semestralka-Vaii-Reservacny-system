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

const processImage = async (req, res, next) => {
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
    const filepath = `uploads/restaurants/${filename}`;

    await sharp(req.file.buffer)
      .resize(800, 600, {
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

module.exports = { upload, processImage };
