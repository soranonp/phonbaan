import type { Metadata } from "next";
import AccordionFAQ from "@/components/AccordionFAQ";

export const metadata: Metadata = {
  title: "ติดต่อเรา | PhonBaan",
  description:
    "มีคำถาม ข้อเสนอแนะ หรืออยากให้เพิ่มเครื่องมือ? ติดต่อทีม PhonBaan ผ่านอีเมล Facebook หรือ Line — เราตอบกลับภายใน 24-48 ชั่วโมง",
  alternates: { canonical: "https://phonbaan.com/contact" },
  openGraph: {
    title: "ติดต่อเรา | PhonBaan",
    description: "ติดต่อทีม PhonBaan ผ่านอีเมล Facebook หรือ Line",
    url: "https://phonbaan.com/contact",
    locale: "th_TH",
    type: "website",
  },
};

const channels = [
  {
    label: "Email",
    value: "hello@phonbaan.com",
    href: "mailto:hello@phonbaan.com",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "Facebook Page",
    value: "facebook.com/phonbaan",
    href: "https://facebook.com/phonbaan",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    label: "Line OA",
    value: "@phonbaan",
    href: "https://line.me/R/ti/p/@phonbaan",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.4 4H4.6A2.6 2.6 0 002 6.6v10.8A2.6 2.6 0 004.6 20H10v-2.5l4.5 2.3.5.2c2.6 0 4-1.4 4-4V6.6A2.6 2.6 0 0019.4 4zM7.5 14H6v-4h1.5v4zm3.6 0H10v-4h1.1l1.4 2v-2H14v4h-1.1l-1.4-2v2zm5.4-2.5h-1.5v.5h1.5V13h-1.5v.5H17V14h-3v-4h3v.5h-1.5v.5h1.5v.5z" />
      </svg>
    ),
  },
];

const topics = [
  {
    title: "พบบั๊กหรือผลคำนวณผิด",
    desc: "หากเครื่องคำนวณให้ผลที่ไม่ตรงกับใบเสนอราคาธนาคารอย่างมีนัยสำคัญ แจ้งเราพร้อมตัวเลข input ที่ใช้ — เราจะตรวจสอบและแก้ไข",
  },
  {
    title: "เสนอเครื่องมือใหม่",
    desc: "อยากให้เพิ่มเครื่องคำนวณอะไร? เช่น คำนวณภาษีโรงเรือน, คำนวณค่าธรรมเนียมโอน, คำนวณดอกเบี้ยบัตรเครดิต — บอกเราได้",
  },
  {
    title: "Guest Post / Content Collaboration",
    desc: "เขียนบทความเกี่ยวกับการกู้ซื้อบ้าน คอนโด การเงินส่วนบุคคล ส่งหัวข้อและตัวอย่างผลงานมา เราคัดเลือกเนื้อหาที่อ้างอิงข้อมูลจริง ไม่ใช่บทความขาย",
  },
  {
    title: "PDPA / ขอลบข้อมูล",
    desc: "ใช้สิทธิ์ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล (PDPA) ขอเข้าถึง / แก้ไข / ลบ / ถอนความยินยอม — ส่งเรื่องมาที่อีเมล เราดำเนินการภายใน 30 วัน",
  },
];

const faqs = [
  {
    q: "รับเขียน Guest Post หรือเปล่า?",
    a: "รับครับ — กรุณาส่งหัวข้อและตัวอย่างผลงานมาที่ hello@phonbaan.com\nเราตอบรับเฉพาะเนื้อหาที่เกี่ยวกับการกู้ซื้อบ้าน/คอนโด การวางแผนการเงิน อ้างอิงข้อมูลจริง และไม่ใช่บทความขาย",
  },
  {
    q: "อยากลงโฆษณาบนเว็บได้ไหม?",
    a: "ปัจจุบันเว็บอยู่ระหว่างเตรียมเปิดให้ลงโฆษณาผ่าน Google AdSense\nสำหรับโฆษณาตรง (Direct ads) สามารถส่งรายละเอียดมาที่อีเมลได้",
  },
  {
    q: "ตอบกลับนานแค่ไหน?",
    a: "โดยเฉลี่ย 24-48 ชั่วโมงในวันทำการ — ในช่วงวันหยุดอาจช้ากว่าปกติเล็กน้อย",
  },
  {
    q: "อยากแก้ไข/ลบข้อมูลของฉันตาม PDPA ทำยังไง?",
    a: "ส่งคำขอมาที่ hello@phonbaan.com ระบุชื่อและอีเมลที่เคยติดต่อ\nเราจะดำเนินการภายใน 30 วันตามที่ พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล กำหนด",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="container-wrap pb-10 pt-12 text-center md:pt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Contact
        </p>
        <h1 className="thai-heading mx-auto max-w-3xl font-display font-bold leading-[1.15] text-ink text-[clamp(26px,6vw,52px)]">
          มีคำถาม ข้อเสนอแนะ
          หรืออยากให้เพิ่ม<em className="text-accent">เครื่องมือ?</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          เราตอบกลับทุกข้อความ — เลือกช่องทางที่สะดวกได้เลย
          โดยเฉลี่ยตอบภายใน 24-48 ชั่วโมง
        </p>
      </section>

      {/* Channels */}
      <section className="container-wrap mx-auto max-w-3xl pb-12">
        <div className="grid gap-3 sm:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-2xl border border-line bg-white/70 p-4 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                {c.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-ink-soft">
                  {c.label}
                </p>
                <p className="truncate text-sm font-medium text-ink">
                  {c.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="container-wrap mx-auto max-w-4xl pb-14">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
          ติดต่อเรื่องอะไรได้บ้าง
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {topics.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-line bg-white/60 p-5"
            >
              <h3 className="mb-2 font-display text-base font-semibold text-ink">
                {t.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy reminder */}
      <section className="container-wrap mx-auto max-w-3xl pb-12">
        <div className="rounded-2xl border border-gold-soft/60 bg-gold-soft/20 p-5 text-sm leading-relaxed text-ink-soft">
          <strong className="text-ink">หมายเหตุเรื่องข้อมูล:</strong>{" "}
          อีเมลและข้อความที่ส่งมาจะถูกเก็บไว้ใช้สำหรับการตอบกลับเท่านั้น — ดูรายละเอียดที่{" "}
          <a
            href="/privacy-policy"
            className="text-accent underline decoration-accent/30 underline-offset-2 hover:text-accent-bright"
          >
            นโยบายความเป็นส่วนตัว
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-wrap mx-auto max-w-3xl pb-20">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
          คำถามที่พบบ่อย
        </h2>
        <AccordionFAQ items={faqs} />
      </section>
    </div>
  );
}
