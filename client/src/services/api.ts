import type { ConvertOptions } from "@/types/api";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

export async function convertImages(
  images: File[],
  options: ConvertOptions,
  signal?: AbortSignal,
): Promise<Blob> {
  const formData = new FormData();

  images.forEach((file) => formData.append("images", file));
  formData.append("options", JSON.stringify(options));

  const res = await fetch(`${API_BASE}/convert`, {
    method: "POST",
    body: formData,
    signal,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = (await res.json()) as { message?: string };
      if (data.message) message = data.message;
    } catch {
      // Response wasn't JSON; keep fallback.
    }
    throw new Error(message);
  }

  return res.blob();
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
