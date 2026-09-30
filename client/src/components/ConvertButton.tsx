import { cn } from "@/lib/utils";
import type { ConversionStatus } from "@/hooks/useConversion";
import type { ConversionProgress } from "@/services/api";

interface ConvertButtonProps {
  status: ConversionStatus;
  disabled: boolean;
  onClick: () => void;
  progress: ConversionProgress;
}

/** Blends upload + download into a single 0–100 number for the bar. */
function totalPercent(progress: ConversionProgress): number {
  const { phase, uploadPercent, downloadPercent } = progress;

  if (phase === "uploading") {
    // Upload is 0–50% of the visible bar
    return Math.round(uploadPercent * 0.5);
  }
  if (phase === "processing") {
    // Hold at 50% while the server works; slight breathing via CSS
    return 50;
  }
  if (phase === "downloading") {
    // Download is 50–100%
    return 50 + Math.round(downloadPercent * 0.5);
  }
  return 100;
}

function phaseLabel(progress: ConversionProgress): string {
  switch (progress.phase) {
    case "uploading":
      return `Uploading… ${progress.uploadPercent}%`;
    case "processing":
      return "Processing on server…";
    case "downloading":
      return `Downloading… ${progress.downloadPercent}%`;
    case "done":
      return "Done!";
  }
}

export function ConvertButton({
  status,
  disabled,
  onClick,
  progress,
}: ConvertButtonProps) {
  const isConverting = status === "converting";
  const isSuccess = status === "success";
  const percent = isConverting ? totalPercent(progress) : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isConverting}
      className={cn(
        "group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl",
        "px-6 py-3.5 text-base font-semibold text-white",
        "transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        // Idle
        !isConverting &&
          !isSuccess &&
          !disabled &&
          "bg-brand-600 hover:bg-brand-700",
        // Success
        isSuccess && "bg-emerald-600",
        // Disabled (idle disabled, not converting)
        disabled && !isConverting && "cursor-not-allowed bg-slate-300",
        // Converting — base color
        isConverting && "bg-slate-200 cursor-wait",
      )}
    >
      {/* Progress fill — only rendered while converting */}
      {isConverting && (
        <div
          className="absolute inset-y-0 left-0 bg-brand-600 transition-[width] duration-200 ease-out"
          style={{ width: `${percent}%` }}
          aria-hidden
        />
      )}

      {/* Label */}
      <span
        className={cn(
          "relative z-10 flex items-center gap-2",
          isConverting && "text-slate-800 mix-blend-luminosity",
        )}
      >
        {/* Idle */}
        {!isConverting && !isSuccess && "Convert to PDF"}

        {/* Converting */}
        {isConverting && (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
              />
            </svg>
            <span>{phaseLabel(progress)}</span>
          </>
        )}

        {/* Success */}
        {isSuccess && (
          <>
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span>Done!</span>
          </>
        )}
      </span>
    </button>
  );
}
