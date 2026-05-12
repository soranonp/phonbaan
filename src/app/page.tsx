import Link from "next/link";
import type { Metadata } from "next";
import { Calculator, Sliders, ChartBarStacked } from "lucide-react";
import LoanCalculator from "@/components/LoanCalculator";
import AccordionFAQ, { type FAQItem } from "@/components/AccordionFAQ";
import ToolsBar from "@/components/ToolsBar";
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
} from "@/lib/calculations";
import { formatNumber } from "@/lib/format";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  alternates: { canonical: "https://phonbaan.com/" },
};

const HOW_TO_STEPS = [
  {
    icon: Sliders,
    title: "1. ใส่ข้อมูลสินเชื่อ",
    desc: "ระบุยอดเงินกู้ อัตราดอกเบี้ย และระยะเวลาที่ต้องการผ่อน ปรับด้วย slider ได้ทันที",
  },
  {
    icon: Calculator,
    title: "2. ดูค่างวดต่อเดือน",
    desc: "ระบบคำนวณค่างวดให้อัตโนมัติด้วยสูตร PMT มาตรฐาน พร้อมแสดงดอกเบี้ยรวมและยอดผ่อนทั้งหมด",
  },
  {
    icon: ChartBarStacked,
    title: "3. วางแผนการผ่อน",
    desc: "ดูตารางผ่อนรายเดือนและกราฟเปรียบเทียบเงินต้นกับดอกเบี้ย เพื่อวางแผนโปะหรือรีไฟแนนซ์",
  },
] as const;

const EXAMPLE_CASES = [
  { loan: 2_000_000, rate: 3, years: 30 },
  { loan: 5_000_000, rate: 4, years: 30 },
  { loan: 10_000_000, rate: 5, years: 30 },
] as const;

const FAQS: FAQItem[] = [
  {
    q: "ค่างวดผ่อนบ้านคำนวณยังไง?",
    a: "ค่างวดผ่อนบ้านคำนวณด้วยสูตร PMT (Payment) มาตรฐาน: M = P × [r(1+r)^n] / [(1+r)^n − 1]\n\nโดย P = ยอดเงินกู้, r = อัตราดอกเบี้ยต่อเดือน (อัตราดอกเบี้ยต่อปี ÷ 12 ÷ 100), n = จำนวนงวด (ปี × 12)\n\nสูตรนี้ทำให้ค่างวดเท่ากันทุกเดือน แต่ในช่วงแรกๆ ดอกเบี้ยจะกินสัดส่วนมาก พอผ่อนไปนานๆ เงินต้นถึงจะเริ่มลดเร็วขึ้น",
  },
  {
    q: "ดอกเบี้ยลอยตัวกับคงที่ต่างกันยังไง?",
    a: "ดอกเบี้ยคงที่ (Fixed Rate): อัตราดอกเบี้ยตายตัวตามที่ตกลง เช่น 3% ต่อปีตลอด 3 ปีแรก ค่างวดคงที่ทำให้วางแผนง่าย\n\nดอกเบี้ยลอยตัว (Floating Rate): ผูกกับอัตราอ้างอิงของธนาคาร เช่น MRR − 1% เปลี่ยนตามที่ธนาคารประกาศ ค่างวดอาจขึ้น-ลงได้\n\nสินเชื่อบ้านส่วนใหญ่ในไทยใช้แบบผสม คือ 3 ปีแรกคงที่ (โปรโมชั่น) แล้วค่อยลอยตัวตาม MRR หลังจากนั้น",
  },
  {
    q: "MRR/MLR คืออะไร?",
    a: "MRR (Minimum Retail Rate): อัตราดอกเบี้ยขั้นต่ำสำหรับลูกค้ารายย่อยชั้นดี ใช้กับสินเชื่อบ้าน บัตรเครดิต และสินเชื่อบุคคล\n\nMLR (Minimum Loan Rate): อัตราขั้นต่ำสำหรับลูกค้ารายใหญ่ มักต่ำกว่า MRR\n\nMOR (Minimum Overdraft Rate): อัตราขั้นต่ำสำหรับสินเชื่อเบิกเกินบัญชี\n\nสินเชื่อบ้านส่วนใหญ่จะเสนอเป็น MRR − x% เช่น MRR − 1.5% หากธนาคารใดมี MRR ที่ 7.05% ดอกเบี้ยที่ได้คือ 5.55% ต่อปี",
  },
  {
    q: "กู้ได้สูงสุดเท่าไหร่จากเงินเดือน?",
    a: "หลักเกณฑ์ทั่วไปของธนาคารไทย: ค่างวดผ่อนบ้านรวมกับหนี้อื่นๆ ไม่ควรเกิน 40% ของรายได้ต่อเดือน (Debt Service Ratio — DSR)\n\nตัวอย่าง: เงินเดือน 50,000 บาท ผ่อนได้สูงสุดประมาณ 20,000 บาท/เดือน หากดอกเบี้ย 6% ระยะเวลา 30 ปี จะกู้ได้ราว 3.3 ล้านบาท\n\nธนาคารจะดู credit bureau, อายุการทำงาน, ภาระหนี้สินอื่น และความมั่นคงของอาชีพประกอบด้วย ลองใช้เครื่องคำนวณวงเงินกู้เพื่อประเมินเบื้องต้น",
  },
  {
    q: "โปะบ้านช่วยลดดอกเบี้ยได้จริงไหม?",
    a: "ช่วยจริง และช่วยมาก เพราะดอกเบี้ยบ้านคำนวณจากเงินต้นคงเหลือทุกเดือน ยิ่งโปะเร็วยิ่งคุ้ม\n\nตัวอย่าง: กู้ 3 ล้าน 30 ปี ดอกเบี้ย 5% หากโปะเพิ่ม 5,000 บาท/เดือน จะหมดหนี้เร็วขึ้นราว 9 ปี และประหยัดดอกเบี้ยได้ราว 9-10 แสนบาท\n\nควรโปะในช่วง 5-7 ปีแรกเพราะดอกเบี้ยมากที่สุด แต่ก่อนโปะให้ตรวจสัญญาว่ามีค่าปรับ prepayment หรือไม่ — ส่วนใหญ่ปลอดค่าปรับหลังพ้น 3 ปี",
  },
  {
    q: "รีไฟแนนซ์เมื่อไหร่คุ้ม?",
    a: "รีไฟแนนซ์มักคุ้มเมื่อ:\n\n1. ผ่อนครบ 3 ปี ที่สัญญาเดิมหมดโปรโมชั่น (พ้นช่วงปลอดค่าปรับ prepayment)\n2. อัตราใหม่ต่ำกว่าเดิมอย่างน้อย 0.5-1%\n3. ยอดหนี้คงเหลือยังเยอะ (โดยทั่วไป > 1 ล้านบาท)\n\nต้องคำนวณค่าใช้จ่ายในการรีไฟแนนซ์ด้วย: ค่าจดจำนองใหม่ 1% ของวงเงิน, ค่าประเมิน 3,000-5,000 บาท, ค่าอากรแสตมป์ 0.05%\n\nถ้าประหยัดดอกเบี้ยรวมหลังหักค่าใช้จ่ายแล้วยังคุ้ม = ควรรีไฟแนนซ์",
  },
  {
    q: "เครื่องคำนวณนี้แม่นยำแค่ไหน?",
    a: "เครื่องคำนวณใช้สูตร PMT มาตรฐานเดียวกับที่ธนาคารใช้ ผลลัพธ์จะตรงกับใบเสนอราคาของธนาคารหากใส่ข้อมูลตรงกัน\n\nอย่างไรก็ตาม ผลลัพธ์ที่ได้เป็นการประมาณการเบื้องต้น ตัวเลขจริงจากธนาคารอาจต่างเล็กน้อยเพราะ:\n\n- การปัดเศษทศนิยม\n- วันที่ตัดรอบของแต่ละธนาคารต่างกัน\n- ดอกเบี้ยลอยตัวที่จะเปลี่ยนตามประกาศของธนาคาร\n- ค่าธรรมเนียมแฝงต่างๆ\n\nแนะนำให้นำตัวเลขนี้ไปเปรียบเทียบกับใบเสนอราคาจากธนาคารก่อนตัดสินใจ",
  },
  {
    q: "มีค่าใช้จ่ายอื่นนอกจากค่างวดไหม?",
    a: "มีหลายรายการที่ต้องเตรียมเงินไว้:\n\n1. เงินดาวน์: ปกติ 10-20% ของราคาบ้าน (กู้ได้ 80-90%)\n2. ค่าจดจำนอง: 1% ของวงเงินกู้ (จ่ายให้กรมที่ดิน)\n3. ค่าโอนกรรมสิทธิ์: 2% ของราคาประเมิน (มักแบ่งกับผู้ขาย 50/50)\n4. ค่าอากรแสตมป์: 0.05% ของวงเงินกู้\n5. ค่าประเมินราคา: 3,000-5,000 บาท\n6. ค่าประกันอัคคีภัย: 2,000-5,000 บาท/ปี\n7. ค่าประกัน MRTA (ทางเลือก): 1-3% ของวงเงิน จ่ายครั้งเดียวคุ้มครองหลายปี\n\nรวมทั้งหมดประมาณ 3-5% ของราคาบ้าน ควรเตรียมเงินสดส่วนนี้ไว้ก่อนซื้อ",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,82,156,0.08) 0%, rgba(0,82,156,0.02) 60%, transparent 100%)",
          }}
        />
        <div className="container-wrap pt-10 pb-6 md:pt-16 md:pb-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-3 py-1 text-xs font-medium text-accent">
              <Calculator className="h-3.5 w-3.5" />
              เครื่องมือฟรี — ไม่ต้องสมัครสมาชิก
            </span>
            <h1 className="thai-heading font-display mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-ink">
              คำนวณค่างวดผ่อนบ้าน{" "}
              <span className="italic text-accent">ฟรี ใช้งานง่าย</span>
            </h1>
            <p className="mt-4 text-base text-ink-soft md:text-lg">
              ใส่ยอดเงินกู้ ดอกเบี้ย และระยะเวลา —{" "}
              รู้ค่างวดต่อเดือน ดอกเบี้ยรวม และตารางผ่อนทุกงวดในไม่กี่วินาที
              ช่วยให้คุณวางแผนซื้อบ้านได้อย่างมั่นใจ
            </p>
          </div>
        </div>
      </section>

      {/* Tools bar — discoverability of other calculators */}
      <ToolsBar currentPath="/" />

      {/* Calculator */}
      <section className="container-wrap pb-12 pt-4 md:pt-6">
        <LoanCalculator />
      </section>

      {/* How to */}
      <section className="container-wrap py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            วิธีใช้งาน 3 ขั้นตอน
          </h2>
          <p className="mt-2 text-sm text-ink-soft md:text-base">
            ออกแบบให้ใช้งานง่าย ไม่ต้องมีความรู้ทางการเงินก็เริ่มได้
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HOW_TO_STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-2xl border border-line bg-white/60 p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <step.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Formula */}
      <section className="container-wrap py-12">
        <div className="rounded-3xl border border-line bg-white/70 p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
                สูตรการคำนวณค่างวด
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                เครื่องคำนวณใช้สูตร PMT (Payment){" "}
                ซึ่งเป็นสูตรมาตรฐานที่ธนาคารทั่วโลกใช้คำนวณค่างวดสินเชื่อรายเดือนแบบเท่ากันทุกงวด
              </p>
              <div className="mt-4 rounded-xl bg-bg p-4 font-mono text-sm text-ink md:text-base">
                M = P × [r(1+r)<sup>n</sup>] ÷ [(1+r)<sup>n</sup> − 1]
              </div>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                <li>
                  <span className="font-mono font-semibold text-ink">M</span> ={" "}
                  ค่างวดต่อเดือน (บาท)
                </li>
                <li>
                  <span className="font-mono font-semibold text-ink">P</span> ={" "}
                  ยอดเงินกู้ (บาท)
                </li>
                <li>
                  <span className="font-mono font-semibold text-ink">r</span> ={" "}
                  อัตราดอกเบี้ยต่อเดือน (ดอกเบี้ยต่อปี ÷ 12 ÷ 100)
                </li>
                <li>
                  <span className="font-mono font-semibold text-ink">n</span> ={" "}
                  จำนวนงวด (ปี × 12)
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-accent/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                ตัวอย่าง
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                กู้ <span className="font-semibold text-ink">3,000,000 บาท</span>{" "}
                ดอกเบี้ย{" "}
                <span className="font-semibold text-ink">3.5% ต่อปี</span>{" "}
                ระยะเวลา{" "}
                <span className="font-semibold text-ink">30 ปี</span>
              </p>
              <div className="mt-4 space-y-1.5 text-sm text-ink-soft">
                <p>
                  r = 3.5 ÷ 12 ÷ 100 ={" "}
                  <span className="font-mono text-ink">0.002917</span>
                </p>
                <p>
                  n = 30 × 12 = <span className="font-mono text-ink">360</span>{" "}
                  งวด
                </p>
                <p className="pt-2">
                  ค่างวดต่อเดือน ≈{" "}
                  <span className="font-mono font-bold text-accent">
                    {formatNumber(calculateMonthlyPayment(3_000_000, 3.5, 30))}{" "}
                    บาท
                  </span>
                </p>
                <p>
                  ดอกเบี้ยรวม 30 ปี ≈{" "}
                  <span className="font-mono font-bold text-ink">
                    {formatNumber(calculateTotalInterest(3_000_000, 3.5, 30))}{" "}
                    บาท
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="container-wrap py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            ตัวอย่างการคำนวณ
          </h2>
          <p className="mt-2 text-sm text-ink-soft md:text-base">
            ดูตัวเลขจริงจาก 3 กรณีที่พบบ่อย เพื่อเปรียบเทียบก่อนตัดสินใจ
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {EXAMPLE_CASES.map((c) => {
            const monthly = calculateMonthlyPayment(c.loan, c.rate, c.years);
            const interest = calculateTotalInterest(c.loan, c.rate, c.years);
            return (
              <div
                key={c.loan}
                className="rounded-2xl border border-line bg-white/70 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  กู้ {formatNumber(c.loan)} บาท
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {c.years} ปี ดอกเบี้ย {c.rate}%
                </p>
                <div className="mt-4 border-t border-line pt-4">
                  <p className="text-xs text-ink-soft">ค่างวดต่อเดือน</p>
                  <p className="mt-1 font-mono text-2xl font-bold text-accent">
                    {formatNumber(monthly)}{" "}
                    <span className="text-sm font-medium text-ink-soft">
                      บาท
                    </span>
                  </p>
                </div>
                <p className="mt-3 text-xs text-ink-soft">
                  ดอกเบี้ยรวม{" "}
                  <span className="font-mono font-semibold text-gold">
                    {formatNumber(interest)} บาท
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest posts */}
      {latestPosts.length > 0 && (
        <section className="container-wrap py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              บทความล่าสุด
            </h2>
            <p className="mt-2 text-sm text-ink-soft md:text-base">
              เรื่องน่ารู้เกี่ยวกับการกู้ซื้อบ้าน คอนโด โปะ และรีไฟแนนซ์
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-white/60 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
              >
                <span className="mb-3 inline-flex w-fit rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                  {post.tag}
                </span>
                <h3 className="mb-3 font-display text-lg font-bold leading-snug text-ink group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-ink-soft">
                  <span>{post.formattedDate}</span>
                  <span className="text-line">•</span>
                  <span>อ่าน {post.readingMinutes} นาที</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-white px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
            >
              ดูบทความทั้งหมด →
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="container-wrap py-12">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              คำถามที่พบบ่อย
            </h2>
            <p className="mt-2 text-sm text-ink-soft md:text-base">
              เรื่องที่ควรรู้ก่อนกู้บ้าน — ตอบโดยอ้างอิงเกณฑ์ธนาคารในไทย
            </p>
          </div>
          <div className="mt-8">
            <AccordionFAQ items={FAQS} />
          </div>
        </div>
      </section>
    </>
  );
}
