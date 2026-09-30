import { useCallback, useRef, useState } from "react";
import {
  convertImages,
  downloadBlob,
  type ConversionProgress,
} from "@/services/api";
import type { ConvertOptions } from "@/types/api";

export type ConversionStatus = "idle" | "converting" | "success" | "error";

interface UseConversionReturn {
  status: ConversionStatus;
  error: string | null;
  progress: ConversionProgress;
  convert: (files: File[], options: ConvertOptions) => Promise<void>;
  reset: () => void;
}

const INITIAL_PROGRESS: ConversionProgress = {
  uploadPercent: 0,
  downloadPercent: 0,
  phase: "uploading",
};

export function useConversion(): UseConversionReturn {
  const [status, setStatus] = useState<ConversionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] =
    useState<ConversionProgress>(INITIAL_PROGRESS);
  const abortRef = useRef<AbortController | null>(null);

  const convert = useCallback(
    async (files: File[], options: ConvertOptions) => {
      if (files.length === 0) return;

      setStatus("converting");
      setError(null);
      setProgress(INITIAL_PROGRESS);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const blob = await convertImages(files, options, {
          signal: controller.signal,
          onProgress: setProgress,
        });

        const filename = `satedocs-${Date.now()}.pdf`;
        downloadBlob(blob, filename);

        setStatus("success");
        window.setTimeout(() => setStatus("idle"), 2000);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          setStatus("idle");
          return;
        }
        setError(err instanceof Error ? err.message : "Conversion failed");
        setStatus("error");
      } finally {
        abortRef.current = null;
      }
    },
    [],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStatus("idle");
    setError(null);
    setProgress(INITIAL_PROGRESS);
  }, []);

  return { status, error, progress, convert, reset };
}
