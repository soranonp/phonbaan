import Link from "next/link";

const THAI_FONT =
  "'IBM Plex Sans Thai','Sukhumvit Set','Thonburi','Helvetica Neue',sans-serif";

// Scenario: 2.5M loan, 5% rate, 30-year term, lump sum 300K (reduce-term mode)
const FULL_YEARS = 30;
const PREPAY_YEARS = 24; // approximate after 300K lump sum, reduce-term
const FULL_INTEREST = 2330000;
const PREPAY_INTEREST = 1610000;
const SAVING = FULL_INTEREST - PREPAY_INTEREST;

const LEFT = 200;
const RIGHT = 740;
const yearToX = (y: number) => LEFT + (y / FULL_YEARS) * (RIGHT - LEFT);

const NO_PREPAY_COLOR = "#FFB81C";
const PREPAY_COLOR = "#00529C";
const SAVED_COLOR = "#10B981"; // emerald

export default function PrepaymentSavings() {
  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 800 360"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="เทียบระยะเวลาผ่อนระหว่างไม่โปะกับโปะเงินก้อน 300,000 บาท"
        className="h-auto w-full rounded-2xl border border-line bg-white"
      >
        <rect width="800" height="360" rx="20" fill="#f5f7fb" />

        {/* Title */}
        <text
          x="400"
          y="34"
          textAnchor="middle"
          fontFamily={THAI_FONT}
          fontSize="14"
          fontWeight="600"
          fill="#0a1d33"
        >
          ผลของการโปะเงินก้อน 300,000 บาท (ลดระยะเวลา)
        </text>
        <text
          x="400"
          y="54"
          textAnchor="middle"
          fontFamily={THAI_FONT}
          fontSize="11"
          fill="#36475c"
        >
          ยอดหนี้ 2,500,000 · ดอกเบี้ย 5% ต่อปี · เดิม 30 ปี
        </text>

        {/* === Scenario 1: No prepay === */}
        <text
          x={LEFT - 12}
          y={120}
          textAnchor="end"
          dominantBaseline="middle"
          fontFamily={THAI_FONT}
          fontSize="13"
          fontWeight="600"
          fill="#0a1d33"
        >
          ไม่โปะ
        </text>
        <rect
          x={LEFT}
          y={100}
          width={yearToX(FULL_YEARS) - LEFT}
          height={40}
          rx="6"
          fill={NO_PREPAY_COLOR}
        />
        <text
          x={yearToX(FULL_YEARS) - 10}
          y={123}
          textAnchor="end"
          fontFamily={THAI_FONT}
          fontSize="12"
          fontWeight="700"
          fill="#a06a00"
        >
          ผ่อน 30 ปี
        </text>
        <text
          x={LEFT + 10}
          y={123}
          fontFamily={THAI_FONT}
          fontSize="11"
          fill="#ffffff"
          fontWeight="600"
        >
          ดอกเบี้ยรวม ≈ {(FULL_INTEREST / 1_000_000).toFixed(2)}M บาท
        </text>

        {/* === Scenario 2: Prepay === */}
        <text
          x={LEFT - 12}
          y={200}
          textAnchor="end"
          dominantBaseline="middle"
          fontFamily={THAI_FONT}
          fontSize="13"
          fontWeight="600"
          fill="#0a1d33"
        >
          โปะ 300K
        </text>
        <rect
          x={LEFT}
          y={180}
          width={yearToX(PREPAY_YEARS) - LEFT}
          height={40}
          rx="6"
          fill={PREPAY_COLOR}
        />
        <text
          x={yearToX(PREPAY_YEARS) - 10}
          y={203}
          textAnchor="end"
          fontFamily={THAI_FONT}
          fontSize="12"
          fontWeight="700"
          fill="#ffffff"
        >
          ผ่อน {PREPAY_YEARS} ปี
        </text>
        <text
          x={LEFT + 10}
          y={203}
          fontFamily={THAI_FONT}
          fontSize="11"
          fill="#ffffff"
          fontWeight="600"
        >
          ดอกเบี้ยรวม ≈ {(PREPAY_INTEREST / 1_000_000).toFixed(2)}M บาท
        </text>

        {/* Saved time overlay */}
        <rect
          x={yearToX(PREPAY_YEARS)}
          y={180}
          width={yearToX(FULL_YEARS) - yearToX(PREPAY_YEARS)}
          height={40}
          rx="6"
          fill={SAVED_COLOR}
          fillOpacity="0.18"
          stroke={SAVED_COLOR}
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <text
          x={(yearToX(PREPAY_YEARS) + yearToX(FULL_YEARS)) / 2}
          y={205}
          textAnchor="middle"
          fontFamily={THAI_FONT}
          fontSize="11"
          fontWeight="700"
          fill={SAVED_COLOR}
        >
          ประหยัด {FULL_YEARS - PREPAY_YEARS} ปี
        </text>

        {/* X-axis ticks */}
        <line
          x1={LEFT}
          y1={250}
          x2={RIGHT}
          y2={250}
          stroke="#0a1d33"
          strokeWidth="1.5"
        />
        {[0, 5, 10, 15, 20, 25, 30].map((y) => (
          <g key={y}>
            <line
              x1={yearToX(y)}
              y1={250}
              x2={yearToX(y)}
              y2={256}
              stroke="#0a1d33"
              strokeWidth="1.5"
            />
            <text
              x={yearToX(y)}
              y={272}
              textAnchor="middle"
              fontFamily={THAI_FONT}
              fontSize="11"
              fill="#36475c"
            >
              {y}
            </text>
          </g>
        ))}
        <text
          x={RIGHT + 8}
          y={272}
          fontFamily={THAI_FONT}
          fontSize="11"
          fill="#36475c"
        >
          ปี
        </text>

        {/* Savings callout */}
        <g transform="translate(400, 310)">
          <rect
            x="-150"
            y="-20"
            width="300"
            height="36"
            rx="18"
            fill={SAVED_COLOR}
          />
          <text
            textAnchor="middle"
            y="4"
            fontFamily={THAI_FONT}
            fontSize="14"
            fontWeight="700"
            fill="#ffffff"
          >
            ประหยัดดอกเบี้ย ≈ {Math.round(SAVING / 1000)}K บาท ·
            หมดเร็วขึ้น {FULL_YEARS - PREPAY_YEARS} ปี
          </text>
        </g>
      </svg>
      <figcaption className="mt-3 text-center text-sm text-ink-soft">
        ตัวเลขประมาณการจากการคำนวณจริง — ลอง
        <Link
          href="/pho-baan"
          className="text-accent underline decoration-accent/30 underline-offset-2 hover:text-accent-bright"
        >
          เครื่องคำนวณโปะบ้าน
        </Link>{" "}
        ดูสถานการณ์ของคุณเอง
      </figcaption>
    </figure>
  );
}
