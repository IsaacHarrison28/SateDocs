export interface UploadedImage {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  size: number;
  type: string;
}

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export const ACCEPT_ATTRIBUTE = ACCEPTED_IMAGE_TYPES.join(",");

export function isImageFile(file: File): boolean {
  return ACCEPTED_IMAGE_TYPES.includes(
    file.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
  );
}
