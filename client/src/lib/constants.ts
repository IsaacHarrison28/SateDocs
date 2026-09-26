import type { ConvertOptions } from "@/types/api";

export const DEFAULT_OPTIONS: ConvertOptions = {
  pageSize: "A4",
  orientation: "portrait",
  margin: 20,
  imageQuality: 90,
};

export const PAGE_SIZE_LABELS: Record<ConvertOptions["pageSize"], string> = {
  A4: "A4",
  Letter: "Letter",
  Legal: "Legal",
  "fit-to-image": "Fit to image",
};

export const ORIENTATION_LABELS: Record<ConvertOptions["orientation"], string> =
  {
    portrait: "Portrait",
    landscape: "Landscape",
  };
