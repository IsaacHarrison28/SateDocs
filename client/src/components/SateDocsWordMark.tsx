import { cn } from "@/lib/utils";

interface SateDocsWordmarkProps {
  /** "sm" for header, "lg" for hero, "md" for footer */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  /** Render as h1, h2, span, etc. */
  as?: "h1" | "h2" | "span" | "div";
}

const SIZE_MAP = {
  sm: "text-lg tracking-[-0.02em]",
  md: "text-2xl tracking-[-0.02em]",
  lg: "text-4xl tracking-[-0.025em] sm:text-5xl",
  xl: "text-5xl tracking-[-0.03em] sm:text-6xl",
} as const;

export function SateDocsWordmark({
  size = "md",
  className,
  as: Tag = "span",
}: SateDocsWordmarkProps) {
  return (
    <Tag
      className={cn(
        "font-brand font-extrabold leading-none",
        "select-none antialiased",
        SIZE_MAP[size],
        className,
      )}
    >
      <span className="text-navy">Sate</span>
      <span className="text-electric">Docs</span>
    </Tag>
  );
}
