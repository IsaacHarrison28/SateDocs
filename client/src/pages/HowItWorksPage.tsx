import { Link } from "react-router";
import { SateDocsWordmark } from "@/components/SateDocsWordMark";
import { HowItWorksStep } from "@/components/HowItWorksStep";
import {
  UploadIcon,
  LayersIcon,
  SlidersIcon,
  DownloadIcon,
} from "@/components/ui/Icons";

export default function HowItWorksPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[600px] rounded-full bg-brand-50 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-24">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          How SateDocs works
        </div>

        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          From a folder of images to{" "}
          <span className="text-brand-600">a single PDF</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
          Four steps. No signup. No uploads to third parties. Everything happens
          on our server and files are deleted the moment your PDF is ready.
        </p>
      </section>

      {/* Steps */}
      <section className="mx-auto mt-16 max-w-2xl px-6 sm:mt-20">
        <HowItWorksStep
          step={1}
          title="Upload your images"
          description="Drag & drop one or more images onto the converter, or click to browse your device. We accept JPG, PNG, WebP, and HEIC up to 20 files at a time."
          icon={<UploadIcon />}
        />
        <HowItWorksStep
          step={2}
          title="Arrange the order"
          description="Drag thumbnails to rearrange them. Each card shows its page number so you always know what the final PDF will look like before you convert."
          icon={<LayersIcon />}
        />
        <HowItWorksStep
          step={3}
          title="Fine-tune your PDF"
          description="Choose page size (A4, Letter, Legal, or fit-to-image), orientation, margin, and image quality. Every setting updates the exact layout you'll get."
          icon={<SlidersIcon />}
        />
        <HowItWorksStep
          step={4}
          title="Download instantly"
          description="Click Convert and your PDF is generated on the fly. It downloads automatically — no email, no waiting list, no watermark."
          icon={<DownloadIcon />}
          isLast
        />
      </section>

      {/* Trust strip */}
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:grid-cols-3 sm:p-8">
          <TrustItem
            title="Private by default"
            description="Files are processed and deleted immediately. Nothing is stored."
          />
          <TrustItem
            title="No limits, no cost"
            description="No account, no daily cap, no watermark. Free forever."
          />
          <TrustItem
            title="Runs anywhere"
            description="Works in any modern browser on desktop, tablet, or phone."
          />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto mt-16 max-w-3xl px-6 pb-24 text-center">
        <SateDocsWordmark size="md" as="div" className="mb-6" />

        <p className="mx-auto mb-8 max-w-lg text-pretty text-base text-slate-600">
          Ready to give it a try? It takes less than a minute.
        </p>

        <Link
          to="/convert"
          className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-brand-600/20 transition-all hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          Convert your images
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}

function TrustItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        {description}
      </p>
    </div>
  );
}
