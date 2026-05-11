"use client";

import { formatNumber } from "@/lib/format";

export interface TooltipEntry {
  value: number;
  name: string;
  color: string;
}

export interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  labelPrefix?: string;
  labelSuffix?: string;
  showTotal?: boolean;
  totalLabel?: string;
  unit?: string;
  colorMap?: Record<string, string>;
}

const DEFAULT_COLOR_MAP: Record<string, string> = {
  เงินต้น: "#4ade80",
  เงินต้นสะสม: "#4ade80",
  ยอด: "#4ade80",
  ยอดสะสม: "#4ade80",
  DCA: "#4ade80",
  "เงินที่จะมี": "#4ade80",
  "ลงทุนสะสม": "#4ade80",
  "เงินสะสม": "#4ade80",
  "จ่ายเพิ่ม": "#4ade80",
  ดอกเบี้ย: "#fcd34d",
  ดอกเบี้ยสะสม: "#fcd34d",
  "Lump Sum": "#fcd34d",
  "เป้าหมาย": "#fcd34d",
  "เงินที่ต้องการ": "#fcd34d",
  "จ่ายขั้นต่ำ": "#fcd34d",
};

export default function ChartTooltip({
  active,
  payload,
  label,
  labelPrefix = "ปีที่ ",
  labelSuffix = "",
  showTotal = false,
  totalLabel = "รวม",
  unit = "บาท",
  colorMap = {},
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const merged = { ...DEFAULT_COLOR_MAP, ...colorMap };
  const total = payload.reduce((sum, e) => sum + (Number(e.value) || 0), 0);
  return (
    <div
      className="rounded-xl border px-4 py-3 text-sm shadow-lg"
      style={{ backgroundColor: "#0a0a0a", borderColor: "#1f2937" }}
    >
      <p className="mb-1.5 font-bold" style={{ color: "#ffffff" }}>
        {labelPrefix}
        {label}
        {labelSuffix}
      </p>
      {payload.map((entry, i) => (
        <p
          key={i}
          style={{ color: merged[entry.name] ?? entry.color }}
          className="leading-relaxed"
        >
          {entry.name}:{" "}
          <span className="font-mono">{formatNumber(entry.value)}</span> {unit}
        </p>
      ))}
      {showTotal && (
        <p
          className="mt-2 border-t pt-2"
          style={{ color: "#ffffff", borderColor: "#374151" }}
        >
          {totalLabel}:{" "}
          <span className="font-mono">{formatNumber(total)}</span> {unit}
        </p>
      )}
    </div>
  );
}
