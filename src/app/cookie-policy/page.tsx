import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "นโยบายคุกกี้ | PhonBaan",
  description:
    "นโยบายคุกกี้ของ phonbaan.com — รายละเอียดประเภทคุกกี้ที่ใช้ วิธีจัดการความยินยอม และขั้นตอนปิดคุกกี้ใน Chrome, Safari, Firefox",
  alternates: { canonical: "https://phonbaan.com/cookie-policy" },
  openGraph: {
    title: "นโยบายคุกกี้ | PhonBaan",
    description: "ประเภทคุกกี้ที่ใช้และวิธีปิดคุกกี้ในเบราว์เซอร์ต่างๆ",
    url: "https://phonbaan.com/cookie-policy",
    locale: "th_TH",
    type: "article",
  },
};

const cookieTypes = [
  {
    id: "necessary",
    title: "คุกกี้ที่จำเป็น (Strictly Necessary)",
    badge: "บังคับ",
    badgeClass: "bg-ink/10 text-ink",
    desc:
      "คุกกี้ที่จำเป็นต่อการทำงานพื้นฐานของเว็บไซต์ ไม่สามารถปิดใช้งานได้ — เช่น การจดจำการตั้งค่าความยินยอมคุกกี้ของท่าน เพื่อไม่ต้องถามซ้ำในการเข้าชมครั้งถัดไป",
    items: [
      { name: "cookie_consent_v1", purpose: "จดจำตัวเลือกความยินยอมคุกกี้", retention: "12 เดือน" },
    ],
  },
  {
    id: "analytics",
    title: "คุกกี้วิเคราะห์ (Analytics)",
    badge: "เลือกได้",
    badgeClass: "bg-accent/10 text-accent",
    desc:
      "ช่วยให้เราเข้าใจว่าผู้ใช้มีปฏิสัมพันธ์กับเว็บไซต์อย่างไร เก็บข้อมูลแบบไม่ระบุตัวตน เช่น จำนวนการเข้าชม หน้าที่ได้รับความนิยม เวลาที่ใช้บนเว็บ",
    items: [
      { name: "_ga", purpose: "ระบุผู้ใช้แบบไม่ระบุตัวตน (Google Analytics)", retention: "14 เดือน" },
      { name: "_ga_*", purpose: "เก็บสถานะ session (Google Analytics 4)", retention: "14 เดือน" },
    ],
  },
  {
    id: "marketing",
    title: "คุกกี้โฆษณา (Marketing)",
    badge: "เลือกได้",
    badgeClass: "bg-gold/20 text-gold",
    desc:
      "ใช้สำหรับแสดงโฆษณาที่เกี่ยวข้องกับความสนใจของท่าน (Google AdSense) — ปัจจุบันเว็บนี้ยังไม่ได้เปิดให้บริการ แต่ขอแจ้งให้ทราบล่วงหน้า เพื่อความโปร่งใส",
    items: [
      { name: "(ยังไม่ใช้งาน)", purpose: "Google AdSense ในอนาคต", retention: "—" },
    ],
  },
];

const browserGuides = [
  {
    name: "Google Chrome",
    steps: [
      "เปิด Chrome แล้วคลิกเมนู ⋮ (มุมขวาบน) → การตั้งค่า (Settings)",
      "เลือก ความเป็นส่วนตัวและความปลอดภัย (Privacy and Security)",
      "คลิก คุกกี้และข้อมูลไซต์อื่นๆ (Cookies and other site data)",
      "เลือกตัวเลือกการบล็อกคุกกี้ตามต้องการ หรือเพิ่ม phonbaan.com ในรายการบล็อก",
    ],
  },
  {
    name: "Safari (Mac)",
    steps: [
      "เปิด Safari → เมนู Safari → การตั้งค่า (Preferences)",
      "เลือกแท็บ ความเป็นส่วนตัว (Privacy)",
      "เลือก บล็อกคุกกี้ทั้งหมด (Block all cookies)",
      "ถ้าต้องการลบคุกกี้ของ phonbaan.com เฉพาะ ให้คลิก จัดการข้อมูลเว็บไซต์ (Manage Website Data)",
    ],
  },
  {
    name: "Safari (iPhone / iPad)",
    steps: [
      "ไปที่ ตั้งค่า (Settings) → Safari",
      "เลื่อนลงไปที่ ความเป็นส่วนตัวและความปลอดภัย (Privacy & Security)",
      "เปิดสวิตช์ บล็อกคุกกี้ทั้งหมด (Block All Cookies)",
    ],
  },
  {
    name: "Mozilla Firefox",
    steps: [
      "เปิด Firefox แล้วคลิกเมนู ☰ → การตั้งค่า (Settings)",
      "เลือกแท็บ ความเป็นส่วนตัวและความปลอดภัย (Privacy & Security)",
      "ในส่วน Cookies and Site Data คลิก จัดการข้อยกเว้น (Manage Exceptions)",
      "เพิ่ม phonbaan.com แล้วเลือก บล็อก (Block)",
    ],
  },
  {
    name: "Microsoft Edge",
    steps: [
      "เปิด Edge แล้วคลิกเมนู ⋯ (มุมขวาบน) → การตั้งค่า (Settings)",
      "เลือก คุกกี้และสิทธิ์ของไซต์ (Cookies and site permissions)",
      "คลิก จัดการและลบคุกกี้และข้อมูลไซต์",
      "เปิด/ปิดตามต้องการ",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="border-b border-line bg-white/40 py-12">
        <div className="container-wrap mx-auto max-w-[820px] text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Cookie Policy
          </p>
          <h1 className="thai-heading font-display font-bold text-ink text-[clamp(26px,5.5vw,40px)] leading-[1.2]">
            นโยบายคุกกี้
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            วันที่บังคับใช้: 11 พฤษภาคม 2026
          </p>
        </div>
      </section>

      <article className="container-wrap mx-auto max-w-[820px] space-y-12 py-12 leading-relaxed text-ink-soft">
        <section>
          <p className="rounded-xl border border-line bg-white/60 p-5 text-sm">
            หน้านี้อธิบายประเภทคุกกี้ที่ phonbaan.com ใช้
            วัตถุประสงค์ของแต่ละประเภท และวิธีจัดการคุกกี้ของท่าน —
            เป็นส่วนเสริมของ{" "}
            <Link
              href="/privacy-policy"
              className="text-accent hover:text-accent-bright"
            >
              นโยบายความเป็นส่วนตัว
            </Link>
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            คุกกี้คืออะไร?
          </h2>
          <p>
            คุกกี้ (Cookies) คือไฟล์ข้อความขนาดเล็กที่เว็บไซต์ฝากไว้บนอุปกรณ์ของท่าน
            เพื่อจดจำการตั้งค่าและพฤติกรรมการใช้งาน
            คุกกี้ส่วนใหญ่ไม่สามารถระบุตัวตนของท่านได้โดยตรง
            แต่ช่วยให้เว็บไซต์ทำงานได้ดีขึ้นและตรงกับความต้องการของท่าน
          </p>
        </section>

        <section>
          <h2 className="mb-6 font-display text-2xl font-bold text-ink">
            ประเภทคุกกี้ที่เราใช้
          </h2>
          <div className="space-y-6">
            {cookieTypes.map((c) => (
              <div
                key={c.id}
                id={c.id}
                className="rounded-2xl border border-line bg-white/60 p-6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-bold text-ink">
                    {c.title}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${c.badgeClass}`}
                  >
                    {c.badge}
                  </span>
                </div>
                <p className="text-sm">{c.desc}</p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-line text-left text-ink">
                        <th className="pb-2 pr-3 font-semibold">ชื่อคุกกี้</th>
                        <th className="pb-2 pr-3 font-semibold">วัตถุประสงค์</th>
                        <th className="pb-2 font-semibold">ระยะเวลา</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.items.map((item) => (
                        <tr
                          key={item.name}
                          className="border-b border-line/50 last:border-b-0"
                        >
                          <td className="py-2 pr-3 font-mono text-accent">
                            {item.name}
                          </td>
                          <td className="py-2 pr-3">{item.purpose}</td>
                          <td className="py-2">{item.retention}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            จัดการความยินยอมในเว็บนี้
          </h2>
          <p>
            ท่านสามารถเปลี่ยนความยินยอมคุกกี้ได้ตลอดเวลา
            โดยกดปุ่มด้านล่างเพื่อเปิดหน้าต่างตั้งค่าใหม่:
          </p>
          <div className="mt-4">
            <CookieSettingsButton className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright">
              เปิดการตั้งค่าคุกกี้
            </CookieSettingsButton>
          </div>
          <p className="mt-3 text-sm">
            หรือกดลิงก์ &ldquo;ตั้งค่าคุกกี้&rdquo; ในส่วนท้ายของทุกหน้าเว็บไซต์
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            วิธีปิดคุกกี้ในเบราว์เซอร์
          </h2>
          <p className="mb-4 text-sm">
            หากต้องการปิดคุกกี้ทั้งหมดของทุกเว็บไซต์ (ไม่ใช่แค่ phonbaan.com)
            สามารถตั้งค่าผ่านเบราว์เซอร์ที่ท่านใช้ได้โดยตรง:
          </p>
          <div className="space-y-4">
            {browserGuides.map((b) => (
              <details
                key={b.name}
                className="group rounded-xl border border-line bg-white/60 p-5 transition-colors hover:border-accent/30"
              >
                <summary className="flex cursor-pointer items-center justify-between font-display text-base font-semibold text-ink">
                  {b.name}
                  <svg
                    className="h-4 w-4 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <ol className="ml-5 mt-3 list-decimal space-y-1.5 text-sm">
                  {b.steps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              </details>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-gold-soft/60 bg-gold-soft/20 p-4 text-sm">
            <strong className="text-ink">หมายเหตุ:</strong>{" "}
            การปิดคุกกี้อาจทำให้บางฟีเจอร์บนเว็บไซต์ทำงานไม่สมบูรณ์
            เช่น การจดจำการตั้งค่าความยินยอม
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            ติดต่อสอบถามเพิ่มเติม
          </h2>
          <p>
            หากท่านมีคำถามเกี่ยวกับนโยบายคุกกี้นี้
            สามารถติดต่อเราที่{" "}
            <a
              href="mailto:hello@phonbaan.com"
              className="text-accent hover:text-accent-bright"
            >
              hello@phonbaan.com
            </a>{" "}
            หรือผ่านหน้า{" "}
            <Link
              href="/contact"
              className="text-accent hover:text-accent-bright"
            >
              ติดต่อเรา
            </Link>
          </p>
        </section>
      </article>
    </div>
  );
}
