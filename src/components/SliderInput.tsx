"use client";

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
  const handleNumber = (raw: string) => {
    const n = Number(raw.replace(/[^\d.-]/g, ""));
    if (!Number.isFinite(n)) return;
    onChange(Math.min(max, Math.max(min, n)));
  };
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-ink">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            value={format(value)}
            onChange={(e) => handleNumber(e.target.value)}
            className="w-32 rounded-lg border border-line bg-white px-3 py-1.5 text-right text-sm font-mono text-ink focus:border-accent focus:outline-none"
            aria-label={label}
          />
          <span className="text-xs text-ink-soft">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[color:var(--color-accent)]"
        aria-label={`${label} (slider)`}
      />
      <div className="flex justify-between text-[11px] text-ink-soft/70">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
      {hint && <p className="text-[11px] text-ink-soft/80">{hint}</p>}
    </div>
  );
}
