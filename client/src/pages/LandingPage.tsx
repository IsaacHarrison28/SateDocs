import sateDocsIcon from "@/assets/SateDocs_Icon.png";
import { SateDocsWordmark } from "@/components/SateDocsWordMark";
import { Link } from "react-router";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Background: subtle blue radial glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand-100/60 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[400px] w-[600px] rounded-full bg-brand-50 blur-3xl" />
      </div>

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <img
            src={sateDocsIcon}
            alt="SateDocs logo"
            className="h-20 w-20 rounded-lg object-contain"
            loading="lazy"
          />
          <SateDocsWordmark size="sm" as="span" />
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
          <a
            href="#how-it-works"
            className="transition-colors hover:text-brand-600"
          >
            How it works
          </a>
          <a
            href="#features"
            className="transition-colors hover:text-brand-600"
          >
            Features
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-4xl flex-col items-center justify-center px-6 pb-20 text-center">
        {/* Eyebrow badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
          </span>
          100% free · No signup required
        </div>

        {/* Main headline */}
        <h1 className="text-balance text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          <SateDocsWordmark size="lg" as="h1" />
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-600 sm:text-xl">
          Your all-in-one partner for{" "}
          <span className="font-medium text-slate-900">Image to PDF</span>{" "}
          conversion - fast, private, and completely free.
        </p>

        {/* CTA button */}
        <div className="mt-10">
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
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute inset-x-0 bottom-0 border-t border-slate-200 bg-white/50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} SateDocs. Built for the web.</p>
          <p className="text-xs">
            Created by:{" "}
            <a
              href="https://github.com/IsaacHarrison28"
              target="_blank"
              className="text-brand-500 underline"
            >
              Isaac Harrison
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
