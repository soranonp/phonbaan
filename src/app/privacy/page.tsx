import type { Metadata } from "next";
import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | PhonBaan",
  description:
    "นโยบายความเป็นส่วนตัวของ phonbaan.com — เราเคารพและคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)",
  alternates: { canonical: "https://phonbaan.com/privacy" },
  openGraph: {
    title: "นโยบายความเป็นส่วนตัว | PhonBaan",
    description:
      "นโยบายความเป็นส่วนตัว phonbaan.com ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)",
    url: "https://phonbaan.com/privacy",
    locale: "th_TH",
    type: "article",
  },
};

const sections = [
  { id: "data-we-collect", title: "1. ข้อมูลที่เราเก็บรวบรวม" },
  { id: "purpose", title: "2. วัตถุประสงค์การใช้ข้อมูล" },
  { id: "cookies", title: "3. การใช้คุกกี้" },
  { id: "third-parties", title: "4. การเปิดเผยข้อมูลกับบุคคลที่สาม" },
  { id: "your-rights", title: "5. สิทธิของเจ้าของข้อมูล" },
  { id: "retention", title: "6. ระยะเวลาเก็บข้อมูล" },
  { id: "contact-dpo", title: "7. การติดต่อ DPO" },
  { id: "changes", title: "8. การเปลี่ยนแปลงนโยบาย" },
];

export default function PrivacyPage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="border-b border-line bg-white/40 py-12">
        <div className="container-wrap mx-auto max-w-[820px] text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Privacy Policy
          </p>
          <h1 className="thai-heading font-display font-bold text-ink text-[clamp(26px,5.5vw,40px)] leading-[1.2]">
            นโยบายความเป็นส่วนตัว
          </h1>
          <p className="mt-3 text-sm text-ink-soft">
            อัปเดตล่าสุด: 10 พฤษภาคม 2026
          </p>
        </div>
      </section>

      <div className="container-wrap flex flex-col gap-10 py-12 lg:flex-row">
        {/* Sticky TOC (desktop) */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <nav
            aria-label="สารบัญ"
            className="sticky top-24 rounded-xl border border-line bg-white/60 p-5"
          >
            <p className="mb-3 font-display text-xs font-semibold uppercase tracking-wider text-ink-soft">
              สารบัญ
            </p>
            <ul className="space-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <article className="mx-auto w-full max-w-[820px] space-y-10 leading-relaxed text-ink-soft">
          <p className="rounded-xl border border-line bg-white/60 p-5 text-sm">
            phonbaan.com (&ldquo;เรา&rdquo;) ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของผู้ใช้บริการ
            (&ldquo;ท่าน&rdquo;) นโยบายฉบับนี้อธิบายว่าเราเก็บรวบรวมข้อมูลใด ใช้ทำอะไร
            เปิดเผยให้ใคร และท่านมีสิทธิอะไรบ้าง ตาม{" "}
            <strong>พระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)</strong>
          </p>

          <section id="data-we-collect">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">
              1. ข้อมูลที่เราเก็บรวบรวม
            </h2>
            <h3 className="mb-2 mt-4 font-display text-base font-semibold text-ink">
              1.1 ข้อมูลที่ผู้ใช้กรอก
            </h3>
            <p>
              ตัวเลขที่ท่านกรอกในเครื่องคำนวณ (เงินต้น อัตราดอกเบี้ย ระยะเวลา ฯลฯ)
              จะถูก<strong>ประมวลผลภายในเบราว์เซอร์ของท่านเท่านั้น</strong>{" "}
              เราไม่ส่งข้อมูลเหล่านี้กลับไปยังเซิร์ฟเวอร์ของเรา
              และไม่มีการจัดเก็บถาวรใด ๆ
            </p>
            <p className="mt-2">
              หากท่านส่งข้อความผ่านแบบฟอร์มในหน้า{" "}
              <Link href="/contact" className="text-accent hover:text-accent-bright">
                ติดต่อเรา
              </Link>{" "}
              เราจะเก็บ ชื่อ อีเมล และเนื้อหาข้อความ
              เพื่อใช้ตอบกลับและติดตามการสนทนากับท่าน
            </p>

            <h3 className="mb-2 mt-4 font-display text-base font-semibold text-ink">
              1.2 ข้อมูลที่เก็บโดยอัตโนมัติ
            </h3>
            <ul className="ml-5 list-disc space-y-1">
              <li>คุกกี้ (Cookies) และ Local Storage</li>
              <li>หมายเลข IP (IP address)</li>
              <li>ข้อมูลเบราว์เซอร์และอุปกรณ์ (User Agent)</li>
              <li>ข้อมูลการใช้งานผ่าน Google Analytics 4 (GA4)</li>
            </ul>
          </section>

          <section id="purpose">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">
              2. วัตถุประสงค์การใช้ข้อมูล
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>เพื่อให้บริการเครื่องคำนวณและเนื้อหาบนเว็บไซต์</li>
              <li>เพื่อวิเคราะห์และปรับปรุงประสบการณ์การใช้งาน</li>
              <li>เพื่อตอบกลับเมื่อท่านติดต่อเรา</li>
              <li>เพื่อแสดงโฆษณาที่เกี่ยวข้องในอนาคต (เมื่อท่านยินยอม)</li>
              <li>เพื่อปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้อง</li>
            </ul>
          </section>

          <section id="cookies">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">
              3. การใช้คุกกี้
            </h2>
            <p>เราใช้คุกกี้ 3 ประเภท</p>
            <div className="mt-3 space-y-3">
              <div className="rounded-xl border border-line bg-white/60 p-4">
                <p className="mb-1 font-semibold text-ink">คุกกี้ที่จำเป็น</p>
                <p className="text-sm">
                  ใช้จดจำการตั้งค่าคุกกี้ของท่าน — ไม่สามารถปิดใช้งานได้
                </p>
              </div>
              <div className="rounded-xl border border-line bg-white/60 p-4">
                <p className="mb-1 font-semibold text-ink">คุกกี้วิเคราะห์</p>
                <p className="text-sm">
                  Google Analytics 4 — เก็บข้อมูลการใช้งานแบบไม่ระบุตัวตน
                  เพื่อปรับปรุงเว็บไซต์
                </p>
              </div>
              <div className="rounded-xl border border-line bg-white/60 p-4">
                <p className="mb-1 font-semibold text-ink">คุกกี้โฆษณา</p>
                <p className="text-sm">
                  สำหรับ Google AdSense ในอนาคต — แสดงโฆษณาที่เกี่ยวข้องกับท่าน
                </p>
              </div>
            </div>
            <p className="mt-4">
              ท่านสามารถยกเลิกหรือเปลี่ยนความยินยอมได้ตลอดเวลา
              โดยกดปุ่มด้านล่างหรือลิงก์ &ldquo;ตั้งค่าคุกกี้&rdquo; ในส่วนท้ายของเว็บไซต์
            </p>
            <div className="mt-4">
              <CookieSettingsButton className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright">
                เปิดการตั้งค่าคุกกี้ใหม่
              </CookieSettingsButton>
            </div>
          </section>

          <section id="third-parties">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">
              4. การเปิดเผยข้อมูลกับบุคคลที่สาม
            </h2>
            <p>
              เราใช้บริการของผู้ให้บริการบุคคลที่สามเฉพาะเพื่อให้บริการเว็บไซต์เท่านั้น
              และไม่ขายข้อมูลของท่านให้ใคร
            </p>
            <ul className="ml-5 mt-3 list-disc space-y-1">
              <li>
                <strong>Google Analytics</strong> — วิเคราะห์การใช้งานเว็บไซต์
              </li>
              <li>
                <strong>Google AdSense</strong> — แสดงโฆษณา (เมื่อเปิดให้บริการ)
              </li>
              <li>
                <strong>Cloudflare</strong> — โครงสร้างพื้นฐานและความปลอดภัย
              </li>
            </ul>
          </section>

          <section id="your-rights">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">
              5. สิทธิของเจ้าของข้อมูล
            </h2>
            <p>ภายใต้ PDPA ท่านมีสิทธิ 8 ประการ ดังนี้</p>
            <ol className="ml-5 mt-3 list-decimal space-y-1">
              <li>สิทธิได้รับการแจ้งให้ทราบ (Right to be informed)</li>
              <li>สิทธิเข้าถึงข้อมูลส่วนบุคคล (Right of access)</li>
              <li>สิทธิคัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผย (Right to object)</li>
              <li>สิทธิขอให้ลบหรือทำลายข้อมูล (Right to erasure)</li>
              <li>สิทธิขอให้ระงับการใช้ข้อมูล (Right to restrict processing)</li>
              <li>สิทธิให้โอนย้ายข้อมูล (Right to data portability)</li>
              <li>สิทธิขอให้แก้ไขข้อมูล (Right to rectification)</li>
              <li>สิทธิร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล</li>
            </ol>
            <p className="mt-3">
              ท่านสามารถใช้สิทธิเหล่านี้ได้โดยติดต่อมาที่{" "}
              <a
                href="mailto:hello@phonbaan.com"
                className="text-accent hover:text-accent-bright"
              >
                hello@phonbaan.com
              </a>
            </p>
          </section>

          <section id="retention">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">
              6. ระยะเวลาเก็บข้อมูล
            </h2>
            <ul className="ml-5 list-disc space-y-1">
              <li>ข้อมูลความยินยอมคุกกี้: 12 เดือน</li>
              <li>ข้อมูล Google Analytics: 14 เดือน (ตามค่าเริ่มต้น GA4)</li>
              <li>
                อีเมลที่ส่งผ่านแบบฟอร์มติดต่อ: 24 เดือน หรือจนกว่าท่านขอให้ลบ
              </li>
            </ul>
          </section>

          <section id="contact-dpo">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">
              7. การติดต่อ DPO
            </h2>
            <div className="rounded-xl border border-line bg-white/60 p-5">
              <p className="mb-2">
                <strong className="text-ink">เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล</strong>
                <br />
                phonbaan.com
              </p>
              <p>
                อีเมล:{" "}
                <a
                  href="mailto:hello@phonbaan.com"
                  className="text-accent hover:text-accent-bright"
                >
                  hello@phonbaan.com
                </a>
              </p>
            </div>
          </section>

          <section id="changes">
            <h2 className="mb-3 font-display text-xl font-bold text-ink">
              8. การเปลี่ยนแปลงนโยบาย
            </h2>
            <p>
              เราอาจปรับปรุงนโยบายฉบับนี้เป็นครั้งคราว
              หากมีการเปลี่ยนแปลงสาระสำคัญ เราจะประกาศบนหน้านี้
              พร้อมแก้ไขวันที่ &ldquo;อัปเดตล่าสุด&rdquo; ด้านบน
              ขอแนะนำให้ท่านตรวจสอบหน้านี้เป็นระยะ
            </p>
          </section>

          <div className="rounded-xl border border-gold-soft/60 bg-gold-soft/20 p-5">
            <p className="text-sm">
              หากต้องการเปลี่ยนความยินยอมคุกกี้ สามารถกดปุ่มด้านล่างได้ทุกเมื่อ
            </p>
            <div className="mt-3">
              <CookieSettingsButton className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright">
                เปิดการตั้งค่าคุกกี้ใหม่
              </CookieSettingsButton>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
