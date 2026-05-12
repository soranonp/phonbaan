export interface ResultCardField {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ResultCardProps {
  /** DOM id used by the exporter to find this card */
  id: string;
  /** Tool title shown in the header bar (e.g. "ค่างวดผ่อนบ้าน") */
  title: string;
  /** Optional one-line context shown under the title (e.g. "บ้านราคา 3,000,000 บาท") */
  subtitle?: string;
  inputs: { label: string; value: string }[];
  results: ResultCardField[];
  /** Tool URL shown in footer (e.g. "phonbaan.com/pho-baan") */
  toolUrl: string;
}

/**
 * Fixed 720×900 share card rendered off-screen for PNG export via html-to-image.
 * Uses Tailwind arbitrary hex values (no CSS variables) so colors capture reliably.
 */
export default function ResultCard({
  id,
  title,
  subtitle,
  inputs,
  results,
  toolUrl,
}: ResultCardProps) {
  const [hero, ...rest] = results;
  return (
    <div
      id={id}
      className="export-card"
      style={{
        width: "720px",
        height: "900px",
        fontFamily:
          'var(--font-sarabun), "Sarabun", -apple-system, BlinkMacSystemFont, sans-serif',
        background:
          "linear-gradient(180deg, #00529c 0%, #00529c 200px, #f4f7fb 200px, #f4f7fb 100%)",
        color: "#1f2937",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-10 pt-8">
        <div className="flex items-center gap-3">
          <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            width="44"
            height="44"
            aria-hidden="true"
          >
            <rect width="64" height="64" rx="14" fill="#ffffff" />
            <g
              fill="none"
              stroke="#00529c"
              strokeWidth={3.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 32 L32 14 L52 32" />
              <path d="M18 30 L18 52 L46 52 L46 30" />
            </g>
            <rect x="28" y="38" width="8" height="14" rx="1.5" fill="#FFB81C" />
          </svg>
          <span
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            PhonBaan
          </span>
        </div>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#ffffff",
            background: "rgba(255,184,28,0.95)",
            padding: "6px 14px",
            borderRadius: "999px",
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          margin: "32px",
          marginTop: "44px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "36px",
          boxShadow: "0 12px 32px rgba(0,82,156,0.12)",
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {subtitle && (
          <p style={{ fontSize: "15px", color: "#5a6b80", margin: 0 }}>
            {subtitle}
          </p>
        )}

        {/* Inputs */}
        <div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#7b8aa0",
              margin: 0,
            }}
          >
            ข้อมูลที่กรอก
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "12px 0 0",
              borderTop: "1px solid #e3e8f0",
            }}
          >
            {inputs.map((row) => (
              <li
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #eef2f7",
                  fontSize: "16px",
                }}
              >
                <span style={{ color: "#5a6b80" }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: "#1f2937" }}>
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hero result */}
        {hero && (
          <div
            style={{
              background:
                hero.highlight === false
                  ? "#f4f7fb"
                  : "linear-gradient(135deg, #ffb81c1a 0%, #00529c0d 100%)",
              border: "2px solid #00529c",
              borderRadius: "16px",
              padding: "24px 28px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#00529c",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              {hero.label}
            </p>
            <p
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "#00529c",
                margin: "6px 0 0",
                fontFeatureSettings: '"tnum"',
                lineHeight: 1.1,
              }}
            >
              {hero.value}
            </p>
          </div>
        )}

        {/* Secondary results */}
        {rest.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {rest.map((row) => (
              <li
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderTop: "1px solid #eef2f7",
                  fontSize: row.highlight ? "18px" : "16px",
                }}
              >
                <span style={{ color: "#5a6b80" }}>{row.label}</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: row.highlight ? "#00529c" : "#1f2937",
                    fontFeatureSettings: '"tnum"',
                  }}
                >
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          marginTop: "12px",
        }}
      >
        <span style={{ fontSize: "13px", color: "#7b8aa0" }}>
          คำนวณเพิ่มเติม → {toolUrl}
        </span>
        <span
          style={{
            fontSize: "11px",
            color: "#7b8aa0",
            fontWeight: 500,
          }}
        >
          phonbaan.com
        </span>
      </div>
    </div>
  );
}
