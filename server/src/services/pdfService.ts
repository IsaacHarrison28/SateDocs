import { PDFDocument } from "pdf-lib";
import type {
  ProcessedImage,
  PageDimensions,
  ConvertOptions,
  PageSize,
  Orientation,
} from "../types/conversion.js";

/**
 * Standard page sizes in PDF points (1 pt = 1/72 inch).
 * Portrait orientation — landscape swaps width/height at use time.
 */
const PAGE_SIZES: Record<Exclude<PageSize, "fit-to-image">, PageDimensions> = {
  A4: { width: 595.28, height: 841.89 },
  Letter: { width: 612, height: 792 },
  Legal: { width: 612, height: 1008 },
};

interface DrawPlacement {
  x: number;
  y: number;
  width: number;
  height: number;
}

class PdfService {
  async createDocument(): Promise<PDFDocument> {
    const pdf = await PDFDocument.create();

    pdf.setTitle("SateDocs Conversion");
    pdf.setCreator("SateDocs");
    pdf.setProducer("SateDocs");
    pdf.setCreationDate(new Date());
    pdf.setModificationDate(new Date());

    return pdf;
  }

  async addImagePage(
    pdf: PDFDocument,
    image: ProcessedImage,
    options: ConvertOptions,
  ): Promise<void> {
    const dimensions = this.resolvePageDimensions(
      options.pageSize,
      options.orientation,
      image,
    );

    const page = pdf.addPage([dimensions.width, dimensions.height]);
    const embedded = await pdf.embedJpg(image.buffer);

    const placement = this.fitImageOnPage(
      image,
      dimensions,
      options.pageSize === "fit-to-image" ? 0 : options.margin,
    );

    page.drawImage(embedded, placement);
  }

  private resolvePageDimensions(
    pageSize: PageSize,
    orientation: Orientation,
    image: ProcessedImage,
  ): PageDimensions {
    // "fit-to-image" ignores orientation entirely — the page IS the image.
    if (pageSize === "fit-to-image") {
      return { width: image.width, height: image.height };
    }

    const base = PAGE_SIZES[pageSize];

    return orientation === "landscape"
      ? { width: base.height, height: base.width }
      : base;
  }

  /**
   * Computes the position and size to draw an image on a page:
   * scale to fit within margins, preserving aspect ratio, then center.
   */
  private fitImageOnPage(
    image: ProcessedImage,
    page: PageDimensions,
    margin: number,
  ): DrawPlacement {
    const maxWidth = page.width - margin * 2;
    const maxHeight = page.height - margin * 2;

    // Never upscale — if the image is smaller than the page, keep it as-is.
    const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);

    const width = image.width * scale;
    const height = image.height * scale;

    return {
      x: (page.width - width) / 2,
      y: (page.height - height) / 2,
      width,
      height,
    };
  }
}

export const pdfService = new PdfService();
