"use client";

interface Props {
  minHeight?: number;
}

export default function ChartSkeleton({ minHeight = 320 }: Props) {
  return (
    <div
      className="w-full animate-pulse rounded-xl bg-line/30"
      style={{ minHeight, height: minHeight }}
      role="status"
      aria-label="กำลังโหลดกราฟ"
    >
      <span className="sr-only">กำลังโหลดกราฟ...</span>
    </div>
  );
}
