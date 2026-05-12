"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { formatNumber } from "@/lib/format";

interface SliderInputProps {
  label: string;
  unit: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  format?: (n: number) => string;
  hint?: string;
}

// Kept the component name for backwards compatibility — same shape, no slider.
export default function SliderInput({
  label,
  unit,
  value,
  onChange,
  min,
  max,
  step,
  format = formatNumber,
  hint,
}: SliderInputProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const isInteger = step >= 1;
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const formatThousands = (n: number) =>
    new Intl.NumberFormat("th-TH").format(Math.round(n));

  const handleInput = (raw: string) => {
    const cleaned = raw.replace(/[^\d.\-]/g, "");

    if (cleaned === "" || cleaned === "-" || cleaned === ".") {
      setDraft(cleaned);
      setWarning(null);
      return;
    }

    const n = Number(cleaned);
    if (!Number.isFinite(n)) return;

    const clamped = clamp(n);
    onChange(clamped);

    if (n > max) setWarning(`สูงสุด ${format(max)} ${unit}`);
    else if (n < min) setWarning(`ต่ำสุด ${format(min)} ${unit}`);
    else setWarning(null);

    setDraft(isInteger ? formatThousands(clamped) : cleaned);
  };

  const handleBlur = () => {
    setDraft(null);
    setWarning(null);
  };

  const handleStep = (dir: 1 | -1) => {
    onChange(clamp(value + dir * step));
    setDraft(null);
    setWarning(null);
  };

  const displayed = draft ?? format(value);
  const atMax = value >= max;
  const atMin = value <= min;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-ink">{label}</label>
      <div className="flex items-stretch gap-2">
        <button
          type="button"
          onClick={() => handleStep(-1)}
          disabled={atMin}
          aria-label={`ลด${label}`}
          className="shrink-0 rounded-lg border border-line bg-white px-3 text-ink-soft transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-soft"
        >
          <Minus className="h-4 w-4" />
        </button>
        <div
          className={`flex flex-1 items-center rounded-lg border bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-accent/15 ${
            warning ? "border-gold/60" : "border-line focus-within:border-accent"
          }`}
        >
          <input
            type="text"
            inputMode={isInteger ? "numeric" : "decimal"}
            value={displayed}
            onChange={(e) => handleInput(e.target.value)}
            onBlur={handleBlur}
            onFocus={(e) => e.target.select()}
            className="w-full bg-transparent text-right font-mono text-lg font-semibold text-ink outline-none md:text-xl"
            aria-label={label}
          />
          <span className="ml-2 shrink-0 text-xs text-ink-soft">{unit}</span>
        </div>
        <button
          type="button"
          onClick={() => handleStep(1)}
          disabled={atMax}
          aria-label={`เพิ่ม${label}`}
          className="shrink-0 rounded-lg border border-line bg-white px-3 text-ink-soft transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink-soft"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <p className={`text-[11px] ${warning ? "text-gold" : "text-ink-soft/80"}`}>
        {warning ?? (
          <>
            {hint ? `${hint} · ` : ""}
            {format(min)} – {format(max)} {unit}
          </>
        )}
      </p>
    </div>
  );
}
