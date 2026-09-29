import type { Request, Response, NextFunction } from "express";
import { conversionService } from "../services/conversionService.js";
import { AppError } from "../utils/AppError.js";
import { logger } from "../utils/logger.js";

export async function convert(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    if (!files || files.length === 0) {
      throw new AppError("No images uploaded", 400);
    }

    // parseOptions ran before this controller; the field is guaranteed set.
    const options = req.conversionOptions;
    if (!options) {
      throw new AppError("Conversion options missing", 500);
    }

    const startedAt = Date.now();
    const pdfBytes = await conversionService.convert(files, options);
    const durationMs = Date.now() - startedAt;

    logger.info(
      {
        fileCount: files.length,
        durationMs,
        sizeBytes: pdfBytes.byteLength,
      },
      "Conversion complete",
    );

    const filename = `satedocs-${Date.now()}.pdf`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Length", pdfBytes.byteLength.toString());

    res.send(Buffer.from(pdfBytes));
  } catch (err) {
    next(err);
  }
}
