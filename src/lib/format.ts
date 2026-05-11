const safe = (value: number): number =>
  Number.isFinite(value) ? value : 0;

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(safe(value)));

export const formatNumberShort = (value: number): string => {
  const v = safe(value);
  if (v >= 1_000_000) {
    return `${(v / 1_000_000).toFixed(1)}M`;
  }
  if (v >= 1_000) {
    return `${(v / 1_000).toFixed(0)}K`;
  }
  return v.toFixed(0);
};

/** "1,500,000 บาท" */
export const formatTHB = (value: number): string =>
  `${formatNumber(value)} บาท`;

/** "2.50%" — สำหรับแสดงดอกเบี้ย/อัตรา */
export const formatPercent = (value: number, digits = 2): string =>
  `${safe(value).toFixed(digits)}%`;
