import fs from "node:fs/promises";
import path from "node:path";
import { imageService } from "../src/services/imageService.js";
import { pdfService } from "../src/services/pdfService.js";
import type { ConvertOptions } from "../src/types/conversion.js";

const imagePaths = process.argv.slice(2);

if (imagePaths.length === 0) {
  console.error("Usage: tsx scripts/testPdf.ts <path1> [path2] [path3] ...");
  process.exit(1);
}

const options: ConvertOptions = {
  pageSize: "A4",
  orientation: "portrait",
  margin: 20,
  imageQuality: 90,
};

const pdf = await pdfService.createDocument();

for (const imagePath of imagePaths) {
  console.log(`Processing: ${path.basename(imagePath)}`);
  const image = await imageService.processImage(
    imagePath,
    options.imageQuality,
  );
  console.log(
    `  → ${image.width}×${image.height}, ${image.buffer.byteLength} bytes`,
  );

  await pdfService.addImagePage(pdf, image, options);
}

const bytes = await pdf.save();
const output = `./test-output-${Date.now()}.pdf`;
await fs.writeFile(output, bytes);

console.log(`\n✅ Wrote ${bytes.byteLength} bytes to ${output}`);
