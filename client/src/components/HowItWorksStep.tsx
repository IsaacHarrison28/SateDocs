import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HowItWorksStepProps {
  step: number;
  title: string;
  description: string;
  icon: ReactNode;
  isLast?: boolean;
}

export function HowItWorksStep({
  step,
  title,
  description,
  icon,
  isLast = false,
}: HowItWorksStepProps) {
  return (
    <div className="relative flex gap-5 sm:gap-6">
      {/* Left column: number + connector line */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center",
            "rounded-full border-2 border-brand-200 bg-white",
            "text-sm font-extrabold text-brand-600",
            "shadow-sm shadow-brand-500/10",
          )}
          aria-hidden
        >
          {step}
        </div>

        {!isLast && (
          <div
            className="mt-2 w-px flex-1 bg-gradient-to-b from-brand-200 to-transparent"
            aria-hidden
          />
        )}
      </div>

      {/* Right column: content */}
      <div className={cn("flex-1 pb-10", isLast && "pb-0")}>
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            {icon}
          </div>
          <h3 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">
            {title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
