import type { ConvertOptions } from "@/types/api";

const API_BASE = import.meta.env.VITE_API_URL ?? "/api";

export interface ConversionProgress {
  /** 0–100 during upload */
  uploadPercent: number;
  /** 0–100 during download */
  downloadPercent: number;
  /** "uploading" | "processing" | "downloading" | "done" */
  phase: "uploading" | "processing" | "downloading" | "done";
}

export interface ConvertImagesCallbacks {
  onProgress?: (progress: ConversionProgress) => void;
  signal?: AbortSignal;
}

export function convertImages(
  images: File[],
  options: ConvertOptions,
  callbacks: ConvertImagesCallbacks = {},
): Promise<Blob> {
  const { onProgress, signal } = callbacks;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    images.forEach((file) => formData.append("images", file));
    formData.append("options", JSON.stringify(options));

    let phase: ConversionProgress["phase"] = "uploading";
    let uploadPercent = 0;
    let downloadPercent = 0;

    const emit = () => {
      onProgress?.({ uploadPercent, downloadPercent, phase });
    };

    // --- Upload progress ---
    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      uploadPercent = Math.round((event.loaded / event.total) * 100);
      emit();

      if (uploadPercent >= 100) {
        phase = "processing";
        emit();
      }
    };

    // --- Download progress ---
    xhr.onprogress = (event) => {
      // First byte arriving = server started sending the PDF
      if (phase !== "downloading") {
        phase = "downloading";
      }

      if (event.lengthComputable) {
        downloadPercent = Math.round((event.loaded / event.total) * 100);
      }
      emit();
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        phase = "done";
        downloadPercent = 100;
        emit();

        const blob = xhr.response as Blob;
        resolve(blob);
      } else {
        // Try to parse a JSON error body, else fall back to status text
        let message = `Request failed (${xhr.status})`;
        try {
          const data = JSON.parse(xhr.responseText) as { message?: string };
          if (data.message) message = data.message;
        } catch {
          /* not JSON */
        }
        reject(new Error(message));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during conversion"));
    xhr.ontimeout = () => reject(new Error("Request timed out"));
    xhr.onabort = () => reject(new DOMException("Aborted", "AbortError"));

    // Support AbortSignal (same shape as fetch's signal)
    if (signal) {
      if (signal.aborted) {
        reject(new DOMException("Aborted", "AbortError"));
        return;
      }
      signal.addEventListener("abort", () => xhr.abort(), { once: true });
    }

    xhr.open("POST", `${API_BASE}/convert`);
    xhr.responseType = "blob";
    xhr.send(formData);
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
