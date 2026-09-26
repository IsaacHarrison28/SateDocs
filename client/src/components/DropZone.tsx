import { useCallback, useRef, useState } from "react";
import type { DragEvent, ChangeEvent, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { ACCEPT_ATTRIBUTE, isImageFile } from "@/types/images";
import { UploadCloudIcon } from "@/components/ui/Icons";

interface DropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSizeBytes?: number;
  disabled?: boolean;
  className?: string;
}

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export function DropZone({
  onFiles,
  accept = ACCEPT_ATTRIBUTE,
  maxFiles = 20,
  maxSizeBytes = DEFAULT_MAX_SIZE,
  disabled = false,
  className,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Counter prevents flicker when dragging over child elements
  const dragCounter = useRef(0);

  const handleFiles = useCallback(
    (incoming: File[]) => {
      const valid = incoming.filter(
        (file) => isImageFile(file) && file.size <= maxSizeBytes,
      );
      const limited = valid.slice(0, maxFiles);

      if (limited.length < incoming.length) {
        setIsRejected(true);
        window.setTimeout(() => setIsRejected(false), 600);
      }

      if (limited.length > 0) {
        onFiles(limited);
      }
    },
    [maxFiles, maxSizeBytes, onFiles],
  );

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current += 1;
    if (e.dataTransfer.items.length > 0) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragCounter.current = 0;
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) handleFiles(files);
    },
    [disabled, handleFiles],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) handleFiles(files);
      // Reset so selecting the same file again still fires onChange
      e.target.value = "";
    },
    [handleFiles],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [disabled],
  );

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label="Upload images by dropping them here or clicking to browse"
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        // Base layout
        "group relative flex w-full cursor-pointer flex-col items-center justify-center",
        "rounded-2xl border-2 border-dashed px-6 py-14 text-center",
        "transition-all duration-200 ease-out select-none",

        // Idle
        "border-slate-300 bg-slate-50/50 hover:border-brand-400 hover:bg-brand-50/40",

        // Focus (keyboard a11y)
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",

        // Dragging
        isDragging &&
          "border-brand-500 bg-brand-50 scale-[1.01] shadow-lg shadow-brand-500/10",

        // Rejection flash
        isRejected && "border-red-400 bg-red-50 animate-shake",

        // Disabled
        disabled && "pointer-events-none opacity-50",

        className,
      )}
    >
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleInputChange}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
      />

      {/* Icon */}
      <div
        className={cn(
          "mb-5 flex h-16 w-16 items-center justify-center rounded-full",
          "bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-200",
          "group-hover:scale-105 group-hover:ring-brand-200",
          isDragging && "scale-110 ring-brand-300 bg-brand-50",
        )}
      >
        <UploadCloudIcon
          className={cn(
            "h-8 w-8 text-slate-400 transition-colors",
            "group-hover:text-brand-500",
            isDragging && "text-brand-600",
          )}
        />
      </div>

      {/* Primary text */}
      <p className="text-base font-medium text-slate-800">
        {isDragging ? "Drop your images here" : "Drag & drop your images"}
      </p>

      {/* Secondary text */}
      <p className="mt-1.5 text-sm text-slate-500">
        or{" "}
        <span className="font-medium text-brand-600 underline underline-offset-2">
          click to browse
        </span>
      </p>

      {/* Constraints hint */}
      <p className="mt-4 text-xs text-slate-400">
        JPG, PNG, WebP, HEIC &middot; up to {maxFiles} files &middot;{" "}
        {Math.round(maxSizeBytes / 1024 / 1024)} MB each
      </p>
    </div>
  );
}
