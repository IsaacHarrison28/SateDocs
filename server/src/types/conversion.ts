export type PageSize = "A4" | "Letter" | "Legal" | "fit-to-image";
export type Orientation = "portrait" | "landscape";

export interface ConvertOptions {
  pageSize: PageSize;
  orientation: Orientation;
  margin: number;
  imageQuality: number;
}

export interface ProcessedImage {
  buffer: Buffer;
  width: number;
  height: number;
}

export interface PageDimensions {
  width: number;
  height: number;
}
