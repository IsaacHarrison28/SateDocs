import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { parseOptions } from "../middleware/parseOptions.js";
import { convert } from "../controllers/convertController.js";

export const routes = Router();

routes.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

routes.post("/convert", upload.array("images", 20), parseOptions, convert);
