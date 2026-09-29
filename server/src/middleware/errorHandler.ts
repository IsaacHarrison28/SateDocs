import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";
import { cleanupService } from "../services/cleanupService.js";

export const errorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  _next,
) => {
  const paths: string[] = [];
  if (req.file) paths.push(req.file.path);
  if (Array.isArray(req.files)) {
    for (const f of req.files) paths.push(f.path);
  } else if (req.files && typeof req.files === "object") {
    for (const arr of Object.values(req.files)) {
      for (const f of arr) paths.push(f.path);
    }
  }

  if (paths.length > 0) {
    await cleanupService.deleteFiles(paths);
  }

  const isAppError = err instanceof AppError;
  const status = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal server error";

  if (!isAppError || status >= 500) {
    logger.error(
      {
        stack: err instanceof Error ? err.stack : undefined,
        path: req.path,
        method: req.method,
      },
      err instanceof Error ? err.message : String(err),
    );
  }

  res.status(status).json({ success: false, message });
};
