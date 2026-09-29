import sharp from "sharp";
import { AppError } from "../utils/AppError.js";
import type { ProcessedImage } from "../types/conversion.js";

/**
 * Maximum width or height (in pixels) that we keep.
 * Larger images get resized down before embedding.
 * 4000px is enough for A4 at 300 DPI without bloating the PDF.
 */
const MAX_DIMENSION = 4000;

class ImageService {
  async processImage(filePath: string, quality = 90): Promise<ProcessedImage> {
    try {
      // 1. Read metadata first so we know original dimensions.
      const metadata = await sharp(filePath).metadata();

      if (!metadata.width || !metadata.height) {
        throw new AppError("Could not read image dimensions", 400);
      }

      // 2. Build the processing pipeline.
      let pipeline = sharp(filePath).rotate();

      // 3. Resize only if the image is bigger than our cap.
      if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
        pipeline = pipeline.resize(MAX_DIMENSION, MAX_DIMENSION, {
          fit: "inside",
          withoutEnlargement: true,
        });
      }

      // 4. Encode as JPEG and get both the buffer and final info.
      const { data, info } = await pipeline
        .jpeg({ quality, mozjpeg: true })
        .toBuffer({ resolveWithObject: true });

      return {
        buffer: data,
        width: info.width,
        height: info.height,
      };
    } catch (err) {
      if (err instanceof AppError) throw err;

      throw new AppError(
        `Failed to process image: ${
          err instanceof Error ? err.message : "unknown error"
        }`,
        400,
      );
    }
  }
}

export const imageService = new ImageService();
