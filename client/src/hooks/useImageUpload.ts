import { useCallback, useEffect, useRef, useState } from "react";
import type { UploadedImage } from "@/types/images";
import { isImageFile } from "@/types/images";

interface UseImageUploadOptions {
  maxFiles?: number;
  maxSizeBytes?: number;
}

interface UseImageUploadReturn {
  images: UploadedImage[];
  addFiles: (files: File[]) => void;
  removeImage: (id: string) => void;
  clearAll: () => void;
  moveImage: (from: number, to: number) => void;
  totalSize: number;
}

const DEFAULT_MAX_FILES = 20;
const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // 10 MB

export function useImageUpload({
  maxFiles = DEFAULT_MAX_FILES,
  maxSizeBytes = DEFAULT_MAX_SIZE,
}: UseImageUploadOptions = {}): UseImageUploadReturn {
  const [images, setImages] = useState<UploadedImage[]>([]);

  // Track every URL we create so we can revoke them on unmount.
  // A ref avoids re-renders when the URL list changes.
  const urlsRef = useRef<Set<string>>(new Set());

  const createObjectURL = useCallback((file: File): string => {
    const url = URL.createObjectURL(file);
    urlsRef.current.add(url);
    return url;
  }, []);

  const revokeObjectURL = useCallback((url: string) => {
    URL.revokeObjectURL(url);
    urlsRef.current.delete(url);
  }, []);

  const addFiles = useCallback(
    (files: File[]) => {
      setImages((current) => {
        const remaining = maxFiles - current.length;
        if (remaining <= 0) return current;

        const incoming = files
          .filter((file) => isImageFile(file) && file.size <= maxSizeBytes)
          // Skip duplicates (same name + size + lastModified)
          .filter(
            (file) =>
              !current.some(
                (img) =>
                  img.name === file.name &&
                  img.size === file.size &&
                  img.file.lastModified === file.lastModified,
              ),
          )
          .slice(0, remaining);

        const created: UploadedImage[] = incoming.map((file) => ({
          id: crypto.randomUUID(),
          file,
          previewUrl: createObjectURL(file),
          name: file.name,
          size: file.size,
          type: file.type,
        }));

        return [...current, ...created];
      });
    },
    [maxFiles, maxSizeBytes, createObjectURL],
  );

  const removeImage = useCallback(
    (id: string) => {
      setImages((current) => {
        const target = current.find((img) => img.id === id);
        if (target) revokeObjectURL(target.previewUrl);
        return current.filter((img) => img.id !== id);
      });
    },
    [revokeObjectURL],
  );

  const clearAll = useCallback(() => {
    setImages((current) => {
      current.forEach((img) => revokeObjectURL(img.previewUrl));
      return [];
    });
  }, [revokeObjectURL]);

  const moveImage = useCallback((from: number, to: number) => {
    setImages((current) => {
      if (
        from === to ||
        from < 0 ||
        to < 0 ||
        from >= current.length ||
        to >= current.length
      ) {
        return current;
      }
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  // Cleanup: revoke every object URL when the component unmounts.
  useEffect(() => {
    const urls = urlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  const totalSize = images.reduce((sum, img) => sum + img.size, 0);

  return { images, addFiles, removeImage, clearAll, moveImage, totalSize };
}
