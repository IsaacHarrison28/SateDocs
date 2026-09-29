import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { parseOptions } from "../middleware/parseOptions.js";

export const routes = Router();

routes.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

routes.post(
  "/convert",
  upload.array("images", 20),
  parseOptions,
  (req, res) => {
    const files = (req.files as Express.Multer.File[]) ?? [];
    res.json({
      success: true,
      message: "Upload received (conversion not yet wired)",
      fileCount: files.length,
      files: files.map((f) => ({
        originalname: f.originalname,
        filename: f.filename,
        size: f.size,
        mimetype: f.mimetype,
      })),
      options: req.conversionOptions,
    });
  },
);
