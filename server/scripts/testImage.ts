import { imageService } from "../src/services/imageService.js";

const testPath = process.argv[2];
if (!testPath) {
  console.error("Usage: tsx scripts/testImage.ts <path-to-image>");
  process.exit(1);
}

const result = await imageService.processImage(testPath, 90);

console.log("Processed image:");
console.log("  buffer size:", result.buffer.byteLength, "bytes");
console.log("  dimensions:", `${result.width}×${result.height}`);
console.log("  mime sniff:", result.buffer.subarray(0, 3).toString("hex"));
