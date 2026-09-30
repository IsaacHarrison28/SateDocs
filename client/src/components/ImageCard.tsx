import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { UploadedImage } from "@/types/images";
import { cn, formatBytes } from "@/lib/utils";

interface ImageCardProps {
  image: UploadedImage;
  index: number;
  onRemove: (id: string) => void;
}

export function ImageCard({ image, index, onRemove }: ImageCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-200 bg-white",
        "transition-[border-color,box-shadow] duration-150",
        // Idle + hover
        "hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/5",
        // Dragging
        isDragging && "z-10 border-brand-500 shadow-xl shadow-brand-500/20",
        // Cursor for draggable
        "cursor-grab active:cursor-grabbing touch-none",
      )}
      {...attributes}
      {...listeners}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={image.previewUrl}
          alt={image.name}
          loading="lazy"
          draggable={false}
          className="pointer-events-none h-full w-full object-cover"
        />

        {/* Order badge */}
        <span className="pointer-events-none absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/70 text-xs font-semibold text-white backdrop-blur-sm">
          {index + 1}
        </span>

        {/* Remove button */}
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(image.id);
          }}
          aria-label={`Remove ${image.name}`}
          className={cn(
            "absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full",
            "bg-white/90 text-slate-700 backdrop-blur-sm",
            "opacity-0 transition-all group-hover:opacity-100",
            "hover:bg-red-500 hover:text-white",
            "focus:outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand-500",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Meta */}
      <div className="px-3 py-2">
        <p
          className="truncate text-xs font-medium text-slate-700"
          title={image.name}
        >
          {image.name}
        </p>
        <p className="mt-0.5 text-[11px] text-slate-500">
          {formatBytes(image.size)}
        </p>
      </div>
    </div>
  );
}
