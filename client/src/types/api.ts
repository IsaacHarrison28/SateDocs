export type PageSize = "A4" | "Letter" | "Legal" | "fit-to-image";
export type Orientation = "portrait" | "landscape";

export interface ConvertOptions {
  pageSize: PageSize;
  orientation: Orientation;
  margin: number; // in PDF points (1 pt = 1/72 inch)
  imageQuality: number; // 1–100
}
