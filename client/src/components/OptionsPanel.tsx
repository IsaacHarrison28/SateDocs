import type { ConvertOptions } from "@/types/api";
import { PAGE_SIZE_LABELS, ORIENTATION_LABELS } from "@/lib/constants";
import { SegmentedControl } from "./ui/SegmentedControl";
import { RangeSlider } from "./ui/RangeSlider";

interface OptionsPanelProps {
  options: ConvertOptions;
  onChange: (options: ConvertOptions) => void;
}

export function OptionsPanel({ options, onChange }: OptionsPanelProps) {
  const update = <K extends keyof ConvertOptions>(
    key: K,
    value: ConvertOptions[K],
  ) => onChange({ ...options, [key]: value });

  const isFitToImage = options.pageSize === "fit-to-image";

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="mb-4">
        <h2 className="text-sm font-semibold text-slate-900">PDF settings</h2>
        <p className="mt-0.5 text-xs text-slate-500">
          Fine-tune how your PDF will look.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Page size */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Page size
          </label>
          <SegmentedControl
            value={options.pageSize}
            onChange={(v) => update("pageSize", v)}
            options={[
              { value: "A4", label: PAGE_SIZE_LABELS.A4 },
              { value: "Letter", label: PAGE_SIZE_LABELS.Letter },
              { value: "Legal", label: PAGE_SIZE_LABELS.Legal },
              {
                value: "fit-to-image",
                label: PAGE_SIZE_LABELS["fit-to-image"],
              },
            ]}
          />
        </div>

        {/* Orientation */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Orientation
          </label>
          <SegmentedControl
            value={options.orientation}
            onChange={(v) => update("orientation", v)}
            disabled={isFitToImage}
            options={[
              {
                value: "portrait",
                label: ORIENTATION_LABELS.portrait,
              },
              {
                value: "landscape",
                label: ORIENTATION_LABELS.landscape,
              },
            ]}
          />
        </div>

        {/* Margin */}
        <RangeSlider
          label="Margin"
          value={options.margin}
          min={0}
          max={80}
          step={4}
          unit=" pt"
          onChange={(v) => update("margin", v)}
          disabled={isFitToImage}
        />

        {/* Quality */}
        <RangeSlider
          label="Image quality"
          value={options.imageQuality}
          min={60}
          max={100}
          step={1}
          unit="%"
          onChange={(v) => update("imageQuality", v)}
        />
      </div>

      {/* Contextual hint */}
      {isFitToImage && (
        <p className="mt-4 rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
          Each page will match the exact size of its image. Margin and
          orientation are disabled.
        </p>
      )}
    </section>
  );
}
