import type { UploadedImage } from "@/types/images";
import { ImageCard } from "./ImageCard";
import { formatBytes } from "@/lib/utils";

interface ImagePreviewGridProps {
  images: UploadedImage[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  totalSize: number;
}

export function ImagePreviewGrid({
  images,
  onRemove,
  onClearAll,
  totalSize,
}: ImagePreviewGridProps) {
  if (images.length === 0) return null;

  return (
    <section className="mt-8 animate-fade-in">
      {/* Header row */}
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            {images.length} {images.length === 1 ? "image" : "images"} ready
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Total {formatBytes(totalSize)} · drag to reorder (coming soon)
          </p>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Clear all
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            index={index}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}
