import type { ConvertOptions } from "./conversion.js";

declare global {
  namespace Express {
    interface Request {
      conversionOptions?: ConvertOptions;
    }
  }
}

export {};
