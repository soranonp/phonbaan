const THAI_FONT =
  "'IBM Plex Sans Thai','Sukhumvit Set','Thonburi','Helvetica Neue',sans-serif";

const FIXED_RATES = [3.0, 3.0, 3.0, 5.05, 5.05, 5.05, 5.05];
const FLOAT_RATES = [2.8, 3.5, 4.2, 5.05, 5.05, 5.05, 5.05];
const YEARS = [1, 2, 3, 4, 5, 6, 7];

// Chart bounds (viewBox 800x460)
const LEFT = 70;
const RIGHT = 760;
const TOP = 60;
const BOTTOM = 360;
const Y_MAX = 7; // %

const xForYearCenter = (yi: number) =>
  LEFT + (yi + 0.5) * ((RIGHT - LEFT) / YEARS.length);
const yForPct = (p: number) => BOTTOM - (p / Y_MAX) * (BOTTOM - TOP);

const FIXED_COLOR = "#00529C";
const FLOAT_COLOR = "#FFB81C";

export default function LoanComparisonChart() {
  const barWidth = 28;
  const halfGap = 3;
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 800 460"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="กราฟเปรียบเทียบดอกเบี้ยลอยตัวกับคงที่ ปีที่ 1-7"
        className="h-auto w-full rounded-2xl border border-line bg-white"
      >
        <rect width="800" height="460" rx="20" fill="#f5f7fb" />

        {/* Title */}
        <text
          x="400"
          y="36"
          textAnchor="middle"
          fontFamily={THAI_FONT}
          fontSize="14"
          fontWeight="600"
          fill="#0a1d33"
        >
          ดอกเบี้ยจริงต่อปี — คงที่ vs ลอยตัว (% ต่อปี)
        </text>

        {/* Horizontal grid + Y-axis labels */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((p) => (
          <g key={`grid-${p}`}>
            <line
              x1={LEFT}
              y1={yForPct(p)}
              x2={RIGHT}
              y2={yForPct(p)}
              stroke={p === 0 ? "#0a1d33" : "#e2eaf5"}
              strokeWidth={p === 0 ? 1.5 : 1}
            />
            <text
              x={LEFT - 8}
              y={yForPct(p) + 4}
              textAnchor="end"
              fontFamily={THAI_FONT}
              fontSize="11"
              fill="#36475c"
            >
              {p}%
            </text>
          </g>
        ))}

        {/* Promo period shaded background (years 1-3) */}
        <rect
          x={LEFT}
          y={TOP}
          width={3 * ((RIGHT - LEFT) / YEARS.length)}
          height={BOTTOM - TOP}
          fill="#ffe0a3"
          fillOpacity="0.18"
        />
        <text
          x={LEFT + (3 * (RIGHT - LEFT)) / YEARS.length / 2}
          y={TOP + 16}
          textAnchor="middle"
          fontFamily={THAI_FONT}
          fontSize="11"
          fontWeight="600"
          fill="#a06a00"
        >
          ช่วงโปรโมชั่น 3 ปี
        </text>

        {/* Bars */}
        {YEARS.map((y, i) => {
          const cx = xForYearCenter(i);
          const fixedH = BOTTOM - yForPct(FIXED_RATES[i]);
          const floatH = BOTTOM - yForPct(FLOAT_RATES[i]);
          return (
            <g key={y}>
              {/* Fixed bar (left) */}
              <rect
                x={cx - barWidth - halfGap}
                y={yForPct(FIXED_RATES[i])}
                width={barWidth}
                height={fixedH}
                rx="3"
                fill={FIXED_COLOR}
              />
              <text
                x={cx - barWidth / 2 - halfGap}
                y={yForPct(FIXED_RATES[i]) - 6}
                textAnchor="middle"
                fontFamily={THAI_FONT}
                fontSize="10"
                fontWeight="600"
                fill={FIXED_COLOR}
              >
                {FIXED_RATES[i].toFixed(2)}
              </text>
              {/* Floating bar (right) */}
              <rect
                x={cx + halfGap}
                y={yForPct(FLOAT_RATES[i])}
                width={barWidth}
                height={floatH}
                rx="3"
                fill={FLOAT_COLOR}
              />
              <text
                x={cx + barWidth / 2 + halfGap}
                y={yForPct(FLOAT_RATES[i]) - 6}
                textAnchor="middle"
                fontFamily={THAI_FONT}
                fontSize="10"
                fontWeight="600"
                fill="#a06a00"
              >
                {FLOAT_RATES[i].toFixed(2)}
              </text>
              {/* Year label */}
              <text
                x={cx}
                y={BOTTOM + 20}
                textAnchor="middle"
                fontFamily={THAI_FONT}
                fontSize="12"
                fill="#36475c"
              >
                ปีที่ {y}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform="translate(220, 410)">
          <rect width="14" height="14" rx="3" fill={FIXED_COLOR} />
          <text
            x="22"
            y="11"
            fontFamily={THAI_FONT}
            fontSize="13"
            fill="#0a1d33"
          >
            ดอกเบี้ยคงที่ (Fixed Rate)
          </text>
        </g>
        <g transform="translate(450, 410)">
          <rect width="14" height="14" rx="3" fill={FLOAT_COLOR} />
          <text
            x="22"
            y="11"
            fontFamily={THAI_FONT}
            fontSize="13"
            fill="#0a1d33"
          >
            ดอกเบี้ยลอยตัว (Floating)
          </text>
        </g>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-ink-soft">
        สมมติฐาน: MRR 6.55% — หลังปีที่ 3 ทั้งสองแบบเข้าสู่ลอยตัว
        MRR − 1.5% เหมือนกัน (5.05%)
      </figcaption>
    </figure>
  );
}
