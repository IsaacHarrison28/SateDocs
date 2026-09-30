import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import type { UploadedImage } from "@/types/images";
import { ImageCard } from "./ImageCard";
import { formatBytes } from "@/lib/utils";

interface ImagePreviewGridProps {
  images: UploadedImage[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onReorder: (from: number, to: number) => void;
  totalSize: number;
}

export function ImagePreviewGrid({
  images,
  onRemove,
  onClearAll,
  onReorder,
  totalSize,
}: ImagePreviewGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = images.findIndex((img) => img.id === active.id);
    const toIndex = images.findIndex((img) => img.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;

    onReorder(fromIndex, toIndex);
  };

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
            Total {formatBytes(totalSize)} · drag to reorder
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

      {/* Grid — wrapped in DndContext */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={rectSortingStrategy}
        >
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
        </SortableContext>
      </DndContext>
    </section>
  );
}
