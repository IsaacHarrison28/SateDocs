import type { Express } from "express";
import { imageService } from "./imageService.js";
import { pdfService } from "./pdfService.js";
import { cleanupService } from "./cleanupService.js";
import type { ConvertOptions } from "../types/conversion.js";

class ConversionService {
  async convert(
    files: Express.Multer.File[],
    options: ConvertOptions,
  ): Promise<Uint8Array> {
    const paths = files.map((f) => f.path);

    try {
      const pdf = await pdfService.createDocument();

      // Sequential to preserve page order.
      for (const file of files) {
        const image = await imageService.processImage(
          file.path,
          options.imageQuality,
        );
        await pdfService.addImagePage(pdf, image, options);
      }

      return await pdf.save();
    } finally {
      // Always runs — success or failure.
      // The controller's response is unaffected by this.
      await cleanupService.deleteFiles(paths);
    }
  }
}

export const conversionService = new ConversionService();
