import express from "express";
import fileUpload from "express-fileupload";
import { imageUploader, getUserImages } from "../controllers/File.Uploader.js";
import File from "../model/File.model.js";

const router = express.Router();

// Middleware for file uploads
router.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Routes
router.post("/upload-image", imageUploader);
router.get("/user-images", getUserImages);
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await File.findByIdAndDelete(req.params.id);
    res.json({ success: true, deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

export default router;
