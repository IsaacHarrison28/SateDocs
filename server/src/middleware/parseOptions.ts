import type { Request, Response, NextFunction } from "express";
import { config } from "../config/index.js";
import { AppError } from "../utils/AppError.js";
import type {
  ConvertOptions,
  PageSize,
  Orientation,
} from "../types/conversion.js";

const VALID_PAGE_SIZES: PageSize[] = ["A4", "Letter", "Legal", "fit-to-image"];

const VALID_ORIENTATIONS: Orientation[] = ["portrait", "landscape"];

export function parseOptions(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  try {
    const raw = req.body?.options;

    // No options sent → use defaults
    const parsed: Partial<ConvertOptions> = raw
      ? (JSON.parse(raw) as Partial<ConvertOptions>)
      : {};

    const options: ConvertOptions = {
      pageSize: VALID_PAGE_SIZES.includes(parsed.pageSize as PageSize)
        ? (parsed.pageSize as PageSize)
        : config.pdf.defaultPageSize,

      orientation: VALID_ORIENTATIONS.includes(
        parsed.orientation as Orientation,
      )
        ? (parsed.orientation as Orientation)
        : "portrait",

      margin:
        typeof parsed.margin === "number" &&
        parsed.margin >= 0 &&
        parsed.margin <= 200
          ? parsed.margin
          : config.pdf.defaultMargin,

      imageQuality:
        typeof parsed.imageQuality === "number"
          ? Math.min(100, Math.max(1, parsed.imageQuality))
          : config.pdf.defaultQuality,
    };

    req.conversionOptions = options;
    next();
  } catch {
    next(new AppError("Invalid options payload", 400));
  }
}
