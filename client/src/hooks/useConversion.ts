import { useCallback, useState } from "react";
import type { ConvertOptions } from "@/types/api";

export type ConversionStatus = "idle" | "converting" | "success" | "error";

interface UseConversionReturn {
  status: ConversionStatus;
  error: string | null;
  convert: (files: File[], options: ConvertOptions) => Promise<void>;
  reset: () => void;
}

export function useConversion(): UseConversionReturn {
  const [status, setStatus] = useState<ConversionStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(
    async (files: File[], options: ConvertOptions) => {
      if (files.length === 0) return;

      setStatus("converting");
      setError(null);

      try {
        // TODO: replace with real API call in the next step
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("Would convert:", {
          fileCount: files.length,
          options,
        });

        setStatus("success");

        // Reset to idle after a short success flash
        window.setTimeout(() => setStatus("idle"), 2000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Conversion failed");
        setStatus("error");
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return { status, error, convert, reset };
}
