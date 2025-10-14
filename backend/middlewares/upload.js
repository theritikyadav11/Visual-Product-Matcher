import multer from "multer";
import cloudinary from "../config/cloudinary.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files allowed"), false);
    } else {
      cb(null, true);
    }
  },
});

/** uploads file to Cloudinary and attaches secure_url to req */
export const handleCloudinaryUpload = async (req, res, next) => {
  try {
    if (!req.file) throw new Error("No image uploaded");
    // Upload buffer to Cloudinary
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) return next(error);
        req.imageUrl = result.secure_url;
        next();
      })
      .end(req.file.buffer);
  } catch (err) {
    next(err);
  }
};
