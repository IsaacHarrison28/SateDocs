import { cn } from "@/lib/utils";
import type { ConversionStatus } from "@/hooks/useConversion";

interface ConvertButtonProps {
  status: ConversionStatus;
  disabled: boolean;
  onClick: () => void;
}

export function ConvertButton({
  status,
  disabled,
  onClick,
}: ConvertButtonProps) {
  const isConverting = status === "converting";
  const isSuccess = status === "success";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isConverting}
      className={cn(
        "group relative inline-flex w-full items-center justify-center gap-2 rounded-xl",
        "px-6 py-3.5 text-base font-semibold text-white",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
        // Idle
        !isConverting &&
          !isSuccess &&
          !disabled &&
          "bg-brand-600 shadow-lg shadow-brand-600/20 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30 active:scale-[0.98]",
        // Success
        isSuccess && "bg-emerald-600 shadow-lg shadow-emerald-600/20",
        // Disabled
        (disabled || isConverting) && "cursor-not-allowed",
        disabled && "bg-slate-300 shadow-none hover:bg-slate-300",
      )}
    >
      {/* Loading spinner */}
      {isConverting && (
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
      )}

      {/* Success check */}
      {isSuccess && (
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
      )}

      {/* Label */}
      <span>
        {isConverting && "Converting…"}
        {isSuccess && "Done!"}
        {!isConverting && !isSuccess && "Convert to PDF"}
      </span>
    </button>
  );
}
