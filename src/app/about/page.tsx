import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา | PhonBaan",
  description:
    "เรื่องราวของ PhonBaan — เครื่องมือคำนวณค่างวดผ่อนบ้านภาษาไทย ฟรี ไม่ต้องสมัคร ออกแบบให้ใช้งานง่ายและแม่นยำ พร้อมข้อจำกัดความรับผิดชอบที่ชัดเจน",
  alternates: { canonical: "https://phonbaan.com/about" },
  openGraph: {
    title: "เกี่ยวกับเรา | PhonBaan",
    description:
      "เครื่องมือคำนวณผ่อนบ้านที่ใช้ง่าย ฟรี ไม่ต้องสมัครสมาชิก",
    url: "https://phonbaan.com/about",
    locale: "th_TH",
    type: "website",
  },
};

const reasons = [
  {
    title: "ฟรี 100% ไม่ต้องสมัคร",
    desc: "ใช้งานได้ทันที ไม่บังคับลงทะเบียน ไม่มีค่าใช้จ่ายแอบแฝง",
  },
  {
    title: "ประมวลผลใน Browser",
    desc: "ตัวเลขที่คุณกรอกไม่ถูกส่งไปยังเซิร์ฟเวอร์ ปลอดภัยและเป็นส่วนตัว",
  },
  {
    title: "ภาษาไทย สูตรแม่นยำ",
    desc: "อิงสูตรการเงินมาตรฐาน อธิบายเป็นภาษาไทยเข้าใจง่าย",
  },
  {
    title: "อัปเดตเนื้อหาสม่ำเสมอ",
    desc: "บทความและเครื่องมือใหม่เพิ่มขึ้นทุกสัปดาห์ ตามแนวโน้มตลาด",
  },
];

export default function AboutPage() {
  const postCount = getAllPosts().length;

  return (
    <div className="bg-bg">
      {/* Hero */}
      <section className="container-wrap pb-10 pt-12 text-center md:pt-20">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          About PhonBaan
        </p>
        <h1 className="thai-heading mx-auto max-w-3xl font-display font-bold leading-[1.15] text-ink text-[clamp(26px,6vw,52px)]">
          เครื่องมือคำนวณผ่อนบ้านที่{" "}
          <em className="text-accent">ใช้ง่าย ฟรี</em>{" "}
          ไม่ต้องสมัครสมาชิก
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
          เราเชื่อว่าทุกคนควรเข้าถึงเครื่องมือวางแผนผ่อนบ้านที่ดีโดยไม่มีกำแพงสมัครสมาชิก
          ไม่ต้องดาวน์โหลด ไม่ต้องเปิดเผยข้อมูลส่วนตัว
        </p>
      </section>

      {/* Mission */}
      <section className="container-wrap mx-auto max-w-[820px] pb-12">
        <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            พันธกิจของเรา
          </h2>
          <p className="leading-relaxed text-ink-soft">
            PhonBaan มุ่งมั่นที่จะเป็นเพื่อนคู่คิดของคนไทยในการตัดสินใจกู้ซื้อบ้านและคอนโด
            ผ่านเครื่องมือคำนวณที่เข้าใจง่าย ตอบโจทย์การใช้งานจริง และเนื้อหาที่อ้างอิงข้อมูลจริง
            เราไม่ใช่นายหน้า ไม่ขายสินเชื่อ
            จึงสามารถนำเสนอข้อมูลที่<strong>ตรงไปตรงมา ไม่ลำเอียง</strong>
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            เราเชื่อว่าการเข้าใจค่างวด ดอกเบี้ย และตารางผ่อนของบ้าน
            คือทักษะที่ทุกคนควรมีก่อนตัดสินใจกู้
            — และทุกคนควรเข้าถึงได้โดยไม่ต้องจ่ายเงิน
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="container-wrap mx-auto max-w-5xl pb-14">
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-ink">
          ทำไมต้องใช้เว็บนี้
        </h2>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          {reasons.map((r) => (
            <div
              key={r.title}
              className="rounded-xl border border-line bg-white/60 p-6"
            >
              <h3 className="mb-2 font-display text-base font-semibold text-ink">
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formula accuracy */}
      <section className="container-wrap mx-auto max-w-[820px] pb-14">
        <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            ความถูกต้องของข้อมูล
          </h2>
          <p className="leading-relaxed text-ink-soft">
            เครื่องคำนวณของเราใช้สูตร{" "}
            <strong className="text-ink">PMT (Payment Formula)</strong>{" "}
            ซึ่งเป็นสูตรมาตรฐานเดียวกับที่{" "}
            ธนาคารพาณิชย์ทุกแห่งใช้คำนวณค่างวดสินเชื่อบ้าน
            ทำให้ผลลัพธ์ตรงกับใบเสนอราคาของธนาคารหากใส่ข้อมูลตรงกัน
          </p>
          <div className="mt-4 rounded-xl bg-bg p-4 font-mono text-sm text-ink md:text-base">
            M = P × [r(1+r)<sup>n</sup>] ÷ [(1+r)<sup>n</sup> − 1]
          </div>
          <p className="mt-4 leading-relaxed text-ink-soft">
            ผลลัพธ์อาจต่างจากตัวเลขจริงของธนาคารเล็กน้อย (หลักสิบบาท) เนื่องจาก:
          </p>
          <ul className="mt-3 ml-5 list-disc space-y-1.5 text-sm leading-relaxed text-ink-soft">
            <li>การปัดเศษทศนิยมตอนแสดงผลของแต่ละธนาคารต่างกัน</li>
            <li>วันที่ตัดรอบของแต่ละธนาคารต่างกัน</li>
            <li>ดอกเบี้ยลอยตัวที่จะเปลี่ยนตามที่ธนาคารประกาศในแต่ละช่วง</li>
            <li>ค่าธรรมเนียมและประกันต่างๆ ที่บางธนาคารบวกเข้าค่างวด</li>
          </ul>
          <p className="mt-4 leading-relaxed text-ink-soft">
            สำหรับ DSR (Debt Service Ratio) เราอ้างอิงเกณฑ์ 40% สำหรับพนักงานประจำ
            35% สำหรับฟรีแลนซ์ และ 30% สำหรับเจ้าของกิจการ
            ซึ่งเป็นมาตรฐานทั่วไปของธนาคารพาณิชย์ในไทย
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="container-wrap mx-auto max-w-[820px] pb-14">
        <div className="rounded-2xl border border-line bg-white/60 p-6 sm:p-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink">
            ใครอยู่เบื้องหลัง PhonBaan
          </h2>
          <p className="leading-relaxed text-ink-soft">
            PhonBaan ดูแลโดย{" "}
            <strong className="text-ink">ทีม PhonBaan</strong> —
            กลุ่มคนทำเว็บที่สนใจเรื่องการเงินส่วนบุคคล มีพื้นฐานทั้งด้านการเขียนซอฟต์แวร์
            และประสบการณ์การกู้บ้าน-รีไฟแนนซ์-โปะบ้านจริง
          </p>
          <p className="mt-3 leading-relaxed text-ink-soft">
            เราไม่ใช่นายหน้า ไม่ขายสินเชื่อ ไม่รับค่าคอมมิชชั่นจากธนาคาร —
            จึงสามารถนำเสนอข้อมูลที่ตรงไปตรงมาและเป็นกลาง
            หากท่านมีข้อเสนอแนะหรือพบความผิดพลาด{" "}
            <a
              href="/contact"
              className="text-accent underline decoration-accent/30 underline-offset-2 hover:text-accent-bright"
            >
              ติดต่อเราได้ทันที
            </a>
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="container-wrap mx-auto max-w-[820px] pb-14">
        <div className="rounded-2xl border border-gold-soft/60 bg-gold-soft/30 p-6 sm:p-7">
          <h2 className="mb-3 font-display text-xl font-bold text-ink">
            ข้อจำกัดความรับผิดชอบ (Disclaimer)
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-ink-soft">
            <li>
              <strong className="text-ink">เครื่องมือเป็นเพียงการประมาณการ</strong>
              {" "}— อัตราดอกเบี้ยจริงและเงื่อนไขสินเชื่อขึ้นอยู่กับสถาบันการเงินที่ท่านยื่นกู้
            </li>
            <li>
              <strong className="text-ink">ไม่ใช่คำแนะนำทางการเงิน</strong>
              {" "}— เนื้อหาทั้งหมดมีจุดประสงค์เพื่อการศึกษาเท่านั้น
            </li>
            <li>
              <strong className="text-ink">แนะนำให้ปรึกษาธนาคารและผู้เชี่ยวชาญ</strong>
              {" "}— ก่อนตัดสินใจกู้หรือทำธุรกรรมที่มีนัยสำคัญ
            </li>
          </ul>
        </div>
      </section>

      {/* Stats */}
      <section className="container-wrap mx-auto max-w-4xl pb-14">
        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-ink p-6 text-center sm:grid-cols-3 sm:p-8">
          <div>
            <p className="font-display text-3xl font-bold text-gold md:text-4xl">
              5+
            </p>
            <p className="mt-1 text-sm text-bg/70">เครื่องคำนวณ</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-gold md:text-4xl">
              {postCount}+
            </p>
            <p className="mt-1 text-sm text-bg/70">บทความ</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-gold md:text-4xl">
              ทุกสัปดาห์
            </p>
            <p className="mt-1 text-sm text-bg/70">อัปเดตเนื้อหา</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-wrap mx-auto max-w-3xl pb-20 text-center">
        <h2 className="mb-3 font-display text-2xl font-bold text-ink">
          พร้อมคำนวณค่างวดบ้านของคุณแล้วหรือยัง?
        </h2>
        <p className="mb-6 text-ink-soft">
          เริ่มต้นด้วยเครื่องคำนวณค่างวดผ่อนบ้าน — ใช้งานได้ทันที ไม่ต้องสมัคร
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
          >
            ลองใช้เครื่องคำนวณ
          </Link>
          <Link
            href="/blog"
            className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/30"
          >
            อ่านบทความ
          </Link>
        </div>
      </section>
    </div>
  );
}
