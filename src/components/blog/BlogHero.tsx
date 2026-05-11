import type { ReactNode } from "react";

const THAI_FONT =
  "'IBM Plex Sans Thai','Sukhumvit Set','Thonburi','Helvetica Neue',sans-serif";
const MONO_FONT = "'JetBrains Mono', ui-monospace, monospace";

interface Props {
  variant?: string;
}

export default function BlogHero({ variant }: Props) {
  return (
    <svg
      viewBox="0 0 800 400"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="hero-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00529C" />
          <stop offset="55%" stopColor="#1A73C4" />
          <stop offset="100%" stopColor="#FFB81C" />
        </linearGradient>
        <pattern
          id="hero-dots"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="14" cy="14" r="1.4" fill="#FFFFFF" fillOpacity="0.18" />
        </pattern>
      </defs>

      <rect width="800" height="400" fill="url(#hero-bg)" />
      <rect width="800" height="400" fill="url(#hero-dots)" />

      {renderIllustration(variant)}
    </svg>
  );
}

function renderIllustration(variant?: string): ReactNode {
  switch (variant) {
    case "pmt-formula":
      return <PMTFormula />;
    case "rate-comparison":
      return <RateComparison />;
    case "prepayment":
      return <Prepayment />;
    case "refinance":
      return <Refinance />;
    case "loan-limit":
      return <LoanLimit />;
    default:
      return null;
  }
}

/* ────────────── 1. PMT Formula ────────────── */
function PMTFormula() {
  return (
    <g>
      {/* Floating math accents */}
      <text
        x="90"
        y="110"
        fontFamily={MONO_FONT}
        fontSize="48"
        fill="#FFFFFF"
        fillOpacity="0.18"
        fontWeight="700"
      >
        ฿
      </text>
      <text
        x="660"
        y="340"
        fontFamily={MONO_FONT}
        fontSize="40"
        fill="#FFFFFF"
        fillOpacity="0.18"
        fontWeight="700"
      >
        %
      </text>
      <circle cx="120" cy="320" r="6" fill="#FFB81C" fillOpacity="0.7" />
      <circle cx="700" cy="120" r="8" fill="#FFFFFF" fillOpacity="0.35" />

      {/* Formula card */}
      <rect
        x="100"
        y="150"
        width="600"
        height="120"
        rx="16"
        fill="#FFFFFF"
        fillOpacity="0.95"
      />
      <rect
        x="100"
        y="150"
        width="600"
        height="120"
        rx="16"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.4"
        strokeWidth="2"
      />
      <text
        x="400"
        y="218"
        textAnchor="middle"
        fontFamily={MONO_FONT}
        fontSize="26"
        fontWeight="600"
      >
        <tspan fill="#00529C">M</tspan>
        <tspan fill="#0a1d33"> = </tspan>
        <tspan fill="#1A73C4">P</tspan>
        <tspan fill="#0a1d33"> × [</tspan>
        <tspan fill="#FFB81C">r</tspan>
        <tspan fill="#0a1d33">(1+</tspan>
        <tspan fill="#FFB81C">r</tspan>
        <tspan fill="#0a1d33">)</tspan>
        <tspan dy="-10" fontSize="18" fill="#36475C">
          n
        </tspan>
        <tspan dy="10" fill="#0a1d33">
          ] / [(1+
        </tspan>
        <tspan fill="#FFB81C">r</tspan>
        <tspan fill="#0a1d33">)</tspan>
        <tspan dy="-10" fontSize="18" fill="#36475C">
          n
        </tspan>
        <tspan dy="10" fill="#0a1d33">
          {" "}
          − 1]
        </tspan>
      </text>
      <text
        x="400"
        y="246"
        textAnchor="middle"
        fontFamily={THAI_FONT}
        fontSize="11"
        fontWeight="600"
        fill="#36475C"
        letterSpacing="2"
      >
        PMT FORMULA
      </text>
    </g>
  );
}

/* ────────────── 2. Rate Comparison ────────────── */
function RateComparison() {
  return (
    <g>
      {/* Axis baseline */}
      <line
        x1="80"
        y1="340"
        x2="640"
        y2="340"
        stroke="#FFFFFF"
        strokeOpacity="0.35"
        strokeWidth="2"
      />

      {/* Fixed (horizontal) */}
      <line
        x1="80"
        y1="220"
        x2="640"
        y2="220"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="640" cy="220" r="7" fill="#FFFFFF" />
      <text
        x="660"
        y="226"
        fontFamily={THAI_FONT}
        fontSize="14"
        fontWeight="700"
        fill="#FFFFFF"
      >
        คงที่
      </text>

      {/* Floating (wavy) */}
      <path
        d="M80 300 Q160 250, 240 270 T380 230 T500 180 T640 140"
        stroke="#FFB81C"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="640" cy="140" r="7" fill="#FFB81C" />
      <text
        x="660"
        y="146"
        fontFamily={THAI_FONT}
        fontSize="14"
        fontWeight="700"
        fill="#FFB81C"
      >
        ลอยตัว
      </text>

      {/* Title */}
      <text
        x="80"
        y="100"
        fontFamily={THAI_FONT}
        fontSize="13"
        fontWeight="600"
        fill="#FFFFFF"
        fillOpacity="0.75"
        letterSpacing="2"
      >
        ดอกเบี้ย · เปรียบเทียบ
      </text>
    </g>
  );
}

/* ────────────── 3. Prepayment ────────────── */
function Prepayment() {
  return (
    <g>
      {/* Title */}
      <text
        x="80"
        y="110"
        fontFamily={THAI_FONT}
        fontSize="13"
        fontWeight="600"
        fill="#FFFFFF"
        fillOpacity="0.75"
        letterSpacing="2"
      >
        โปะบ้าน · ลดระยะเวลา
      </text>

      {/* No-prepay bar (long) */}
      <text
        x="80"
        y="178"
        fontFamily={THAI_FONT}
        fontSize="12"
        fill="#FFFFFF"
        fillOpacity="0.85"
      >
        ไม่โปะ
      </text>
      <rect
        x="80"
        y="190"
        width="560"
        height="42"
        rx="10"
        fill="#FFFFFF"
        fillOpacity="0.55"
      />
      <text
        x="100"
        y="216"
        fontFamily={THAI_FONT}
        fontSize="13"
        fontWeight="700"
        fill="#FFFFFF"
      >
        30 ปี
      </text>

      {/* Prepay bar (shorter) */}
      <text
        x="80"
        y="262"
        fontFamily={THAI_FONT}
        fontSize="12"
        fill="#FFFFFF"
        fillOpacity="0.85"
      >
        โปะ 300K
      </text>
      <rect
        x="80"
        y="274"
        width="440"
        height="42"
        rx="10"
        fill="#FFFFFF"
      />
      <text
        x="100"
        y="300"
        fontFamily={THAI_FONT}
        fontSize="13"
        fontWeight="700"
        fill="#00529C"
      >
        24 ปี
      </text>

      {/* Saved overlay */}
      <rect
        x="520"
        y="274"
        width="120"
        height="42"
        rx="10"
        fill="#FFB81C"
        fillOpacity="0.25"
        stroke="#FFB81C"
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <text
        x="580"
        y="300"
        textAnchor="middle"
        fontFamily={THAI_FONT}
        fontSize="12"
        fontWeight="700"
        fill="#FFB81C"
      >
        ประหยัด 6 ปี
      </text>
    </g>
  );
}

/* ────────────── 4. Refinance ────────────── */
function Refinance() {
  return (
    <g>
      {/* Title */}
      <text
        x="80"
        y="100"
        fontFamily={THAI_FONT}
        fontSize="13"
        fontWeight="600"
        fill="#FFFFFF"
        fillOpacity="0.75"
        letterSpacing="2"
      >
        รีไฟแนนซ์ · เทียบดอกเบี้ย
      </text>

      {/* Old rate going up */}
      <path
        d="M80 250 L640 150"
        stroke="#FFB81C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="640" cy="150" r="7" fill="#FFB81C" />
      <text
        x="660"
        y="156"
        fontFamily={THAI_FONT}
        fontSize="14"
        fontWeight="700"
        fill="#FFB81C"
      >
        เดิม
      </text>

      {/* New rate going down */}
      <path
        d="M80 180 L640 320"
        stroke="#FFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="640" cy="320" r="7" fill="#FFFFFF" />
      <text
        x="660"
        y="326"
        fontFamily={THAI_FONT}
        fontSize="14"
        fontWeight="700"
        fill="#FFFFFF"
      >
        ใหม่
      </text>

      {/* Intersection point */}
      <circle
        cx="360"
        cy="225"
        r="14"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
      <circle cx="360" cy="225" r="5" fill="#FFFFFF" />
      <text
        x="360"
        y="190"
        textAnchor="middle"
        fontFamily={THAI_FONT}
        fontSize="13"
        fontWeight="700"
        fill="#FFFFFF"
      >
        จุดคุ้มทุน
      </text>
    </g>
  );
}

/* ────────────── 5. Loan Limit / DSR ────────────── */
function LoanLimit() {
  const bars = [
    { x: 180, h: 70, label: "20K" },
    { x: 320, h: 110, label: "30K" },
    { x: 460, h: 170, label: "50K" },
    { x: 600, h: 240, label: "100K" },
  ];
  const barWidth = 70;
  const baseY = 340;
  return (
    <g>
      {/* Title */}
      <text
        x="80"
        y="100"
        fontFamily={THAI_FONT}
        fontSize="13"
        fontWeight="600"
        fill="#FFFFFF"
        fillOpacity="0.75"
        letterSpacing="2"
      >
        วงเงินกู้ · DSR 40%
      </text>

      {/* Baseline */}
      <line
        x1="80"
        y1={baseY}
        x2="720"
        y2={baseY}
        stroke="#FFFFFF"
        strokeOpacity="0.35"
        strokeWidth="2"
      />

      {bars.map((b) => {
        const dsrHeight = b.h * 0.4;
        return (
          <g key={b.label}>
            {/* Available capacity (white opaque) */}
            <rect
              x={b.x - barWidth / 2}
              y={baseY - b.h}
              width={barWidth}
              height={b.h}
              rx="6"
              fill="#FFFFFF"
              fillOpacity="0.5"
            />
            {/* DSR 40% portion (gold) */}
            <rect
              x={b.x - barWidth / 2}
              y={baseY - dsrHeight}
              width={barWidth}
              height={dsrHeight}
              rx="6"
              fill="#FFB81C"
            />
            {/* Income label */}
            <text
              x={b.x}
              y={baseY + 22}
              textAnchor="middle"
              fontFamily={THAI_FONT}
              fontSize="13"
              fontWeight="700"
              fill="#FFFFFF"
            >
              {b.label}
            </text>
          </g>
        );
      })}

      {/* Legend dot */}
      <rect x="660" y="100" width="14" height="14" rx="3" fill="#FFB81C" />
      <text
        x="682"
        y="111"
        fontFamily={THAI_FONT}
        fontSize="12"
        fontWeight="700"
        fill="#FFFFFF"
      >
        40%
      </text>
    </g>
  );
}
