import { Link } from "react-router";
import sateDocsIcon from "@/assets/SateDocs_Icon.png";
import { SateDocsWordmark } from "@/components/SateDocsWordMark";
import { DropZone } from "@/components/DropZone";
import type { UploadedImage } from "@/types/images";

export default function ConverterPage() {
  const handleFiles = (files: File[]) => {
    const images: UploadedImage[] = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    console.log("Received images:", images);
    // Later: feed these into a state hook
  };

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src={sateDocsIcon}
              alt="SateDocs logo"
              className="h-20 w-20 object-contain mix-blend-multiply"
            />
            <SateDocsWordmark size="sm" as="span" />
          </Link>

          <Link
            to="/"
            className="text-sm text-slate-600 transition-colors hover:text-brand-600"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Convert images to PDF
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Drop your images below. They'll be combined into a single PDF.
          </p>
        </div>

        <DropZone onFiles={handleFiles} />
      </main>
    </div>
  );
}
