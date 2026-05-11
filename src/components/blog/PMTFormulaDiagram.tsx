const VARIABLES = [
  {
    x: 100,
    color: "#00529C",
    letter: "M",
    label: "ค่างวดต่อเดือน",
    sub: "(บาท)",
  },
  {
    x: 300,
    color: "#1A73C4",
    letter: "P",
    label: "ยอดเงินกู้",
    sub: "(บาท)",
  },
  {
    x: 500,
    color: "#FFB81C",
    letter: "r",
    label: "ดอกเบี้ยต่อเดือน",
    sub: "ดอกเบี้ยต่อปี ÷ 12 ÷ 100",
  },
  {
    x: 700,
    color: "#36475C",
    letter: "n",
    label: "จำนวนงวดทั้งหมด",
    sub: "ปี × 12",
  },
];

const THAI_FONT =
  "'IBM Plex Sans Thai','Sukhumvit Set','Thonburi','Helvetica Neue',sans-serif";
const MONO_FONT = "'JetBrains Mono', ui-monospace, monospace";

export default function PMTFormulaDiagram() {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 800 420"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="แผนภาพอธิบายสูตร PMT: M = P × [r(1+r)^n] / [(1+r)^n − 1]"
        className="h-auto w-full rounded-2xl border border-line bg-white"
      >
        <defs>
          <linearGradient id="pmt-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f5f7fb" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>

        <rect width="800" height="420" rx="20" fill="url(#pmt-bg)" />

        {/* Title */}
        <text
          x="400"
          y="46"
          textAnchor="middle"
          fontFamily={THAI_FONT}
          fontSize="13"
          fontWeight="600"
          fill="#36475c"
          letterSpacing="3"
        >
          PMT FORMULA
        </text>

        {/* Formula box */}
        <rect
          x="60"
          y="80"
          width="680"
          height="100"
          rx="14"
          fill="#ffffff"
          stroke="#d6dfeb"
        />
        <text
          x="400"
          y="142"
          textAnchor="middle"
          fontFamily={MONO_FONT}
          fontSize="30"
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
          <tspan fill="#36475C" dy="-12" fontSize="20">
            n
          </tspan>
          <tspan fill="#0a1d33" dy="12">
            ] / [(1+
          </tspan>
          <tspan fill="#FFB81C">r</tspan>
          <tspan fill="#0a1d33">)</tspan>
          <tspan fill="#36475C" dy="-12" fontSize="20">
            n
          </tspan>
          <tspan fill="#0a1d33" dy="12">
            {" "}
            − 1]
          </tspan>
        </text>

        {/* Connecting lines from formula to legend */}
        {VARIABLES.map((v) => (
          <line
            key={`line-${v.letter}`}
            x1={v.x}
            y1="240"
            x2={v.x}
            y2="265"
            stroke={v.color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 4"
          />
        ))}

        {/* Variable legend */}
        {VARIABLES.map((v) => (
          <g key={v.letter}>
            <circle cx={v.x} cy="290" r="26" fill={v.color} />
            <text
              x={v.x}
              y="290"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={MONO_FONT}
              fontSize="26"
              fontWeight="700"
              fill="#ffffff"
            >
              {v.letter}
            </text>
            <text
              x={v.x}
              y="350"
              textAnchor="middle"
              fontFamily={THAI_FONT}
              fontSize="15"
              fontWeight="600"
              fill="#0a1d33"
            >
              {v.label}
            </text>
            <text
              x={v.x}
              y="372"
              textAnchor="middle"
              fontFamily={THAI_FONT}
              fontSize="12"
              fill="#36475c"
            >
              {v.sub}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="mt-3 text-center text-sm text-ink-soft">
        สูตร PMT — แต่ละสีคือตัวแปรหนึ่งตัว
      </figcaption>
    </figure>
  );
}
