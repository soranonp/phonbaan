import type { Metadata } from "next";
import { Building2, Calculator, FileText, Receipt } from "lucide-react";
import LoanCalculator from "@/components/LoanCalculator";
import CalculatorPageLayout from "@/components/CalculatorPageLayout";
import type { FAQItem } from "@/components/AccordionFAQ";
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
} from "@/lib/calculations";
import { formatNumber } from "@/lib/format";
import { relatedToolsExcept } from "@/lib/tools";

export const metadata: Metadata = {
  title: "คำนวณค่างวดผ่อนคอนโด ฟรี",
  description:
    "เครื่องคำนวณค่างวดผ่อนคอนโดออนไลน์ฟรี ใส่ราคาคอนโด ดอกเบี้ย ระยะเวลา รู้ค่างวด ดอกเบี้ยรวม พร้อมประเมินค่าส่วนกลาง ค่าโอน และค่าใช้จ่ายอื่น",
  alternates: { canonical: "https://phonbaan.com/khondo/" },
};

const FAQS: FAQItem[] = [
  {
    q: "ค่าส่วนกลางคอนโดคำนวณยังไง?",
    a: "ค่าส่วนกลาง (Common Fee) คิดเป็นบาทต่อตารางเมตรต่อเดือน — ส่วนใหญ่อยู่ที่ 40-70 บาท/ตร.ม./เดือน\n\nตัวอย่าง: คอนโด 30 ตร.ม. ค่าส่วนกลาง 50 บาท/ตร.ม. = 30 × 50 = 1,500 บาท/เดือน หรือ 18,000 บาท/ปี\n\nคอนโดหรู สิ่งอำนวยความสะดวกครบ (สระว่ายน้ำ ฟิตเนส 24 ชม.) มักเก็บ 60-100+ บาท/ตร.ม. — ก่อนตัดสินใจซื้อต้องคิดค่าส่วนกลางรวมเข้าไปในงบรายเดือนด้วย",
  },
  {
    q: "ค่าโอนคอนโดและภาษีต่างๆ มีอะไรบ้าง?",
    a: "ค่าใช้จ่ายในการโอนกรรมสิทธิ์คอนโดมือใหม่จากโครงการ:\n\n1. ค่าธรรมเนียมการโอน: 2% ของราคาประเมิน (ปกติแบ่ง 50/50 กับโครงการ = 1%)\n2. ค่าจดจำนอง: 1% ของวงเงินกู้\n3. ค่าอากรแสตมป์: 0.05% ของวงเงินกู้\n4. ค่าประเมินราคา: 3,000-5,000 บาท\n5. ค่าส่วนกลางล่วงหน้า 1-2 ปี + เงินกองทุน 300-500 บาท/ตร.ม.\n\nสำหรับคอนโดมือสอง: เจ้าของเดิมต้องเสียภาษีธุรกิจเฉพาะ 3.3% หากถือครองไม่เกิน 5 ปี — แต่ปกติผู้ขายจะรับผิดชอบเอง",
  },
  {
    q: "ภาษีธุรกิจเฉพาะคืออะไร?",
    a: "ภาษีธุรกิจเฉพาะ (Specific Business Tax) เก็บกรณีขายอสังหาริมทรัพย์ที่ถือครองไม่ถึง 5 ปี ในอัตรา 3.3% ของราคาขาย (รวมภาษีท้องถิ่น)\n\nหากถือครองเกิน 5 ปี จะไม่ต้องเสียภาษีธุรกิจเฉพาะ — แต่ต้องเสียภาษีหัก ณ ที่จ่ายแทน ซึ่งคำนวณจากเงินได้สุทธิและจำนวนปีที่ถือครอง\n\nสำหรับคนซื้อคอนโดมือใหม่จากโครงการไม่ต้องสนใจภาษีนี้ — ผู้ขาย (โครงการ) เป็นคนจ่าย",
  },
  {
    q: "ค่ามิเตอร์น้ำ-ไฟตอนรับโอนคอนโดเท่าไหร่?",
    a: "ค่าติดตั้งมิเตอร์ไฟฟ้า MEA/PEA: 6,000-15,000 บาท ขึ้นอยู่กับขนาดมิเตอร์ (15A สำหรับ 1-2 ห้องนอน)\n\nค่ามิเตอร์ประปา: 3,000-7,000 บาท\n\nบางโครงการรวมค่าติดตั้งมิเตอร์ไว้ในราคาขายแล้ว ตรวจสอบกับเซลส์ก่อนซื้อ — และอย่าลืมเงินมัดจำค่าน้ำ-ไฟอีก 3,000-5,000 บาท",
  },
  {
    q: "ซื้อคอนโดเพื่ออยู่เอง vs ลงทุน — คำนวณต่างกันยังไง?",
    a: "อยู่เอง: คำนวณว่าค่างวด + ค่าส่วนกลาง รวมกันไม่เกิน 35-40% ของรายได้ก็โอเค\n\nลงทุนปล่อยเช่า:\n- ค่าเช่าต่อเดือนควรครอบคลุมค่างวดบ้าน + ค่าส่วนกลาง + ภาษีโรงเรือน 12.5% ของค่าเช่าทั้งปี (ถ้าเก็บได้)\n- yield ที่ดี: 5-7% ต่อปี (= ค่าเช่าทั้งปี ÷ ราคาคอนโด)\n- ทำเลใกล้ BTS/MRT, มหาวิทยาลัย, ออฟฟิศ จะปล่อยเช่าง่าย\n\nระยะคืนทุน: ปกติ 15-20 ปี — เครื่องมือนี้ช่วยคำนวณค่างวดและดอกเบี้ย แต่ yield ต้องเช็คตลาดเอง",
  },
  {
    q: "คอนโดต่างจากบ้านในการขอกู้ยังไง?",
    a: "ธนาคารส่วนใหญ่ให้กู้คอนโดได้สูงสุด 90% ของราคาประเมิน (เท่ากับบ้าน) — แต่:\n\n1. ระยะเวลาผ่อนคอนโดมือสอง อายุอาคาร > 15 ปี อาจถูกจำกัด (20-25 ปี แทน 30 ปี)\n2. ดอกเบี้ยมักสูงกว่าบ้านเล็กน้อย เพราะธนาคารมองว่าเสี่ยงกว่า (ขายต่อยากกว่าบ้าน)\n3. หากเป็นคอนโดในเครือต่างชาติ (foreign quota เกิน 49%) บางธนาคารไม่ปล่อยกู้\n\nลองเครื่องคำนวณวงเงินกู้บ้านเพื่อประเมินวงเงินเบื้องต้น",
  },
];

const HOW_TO = [
  {
    icon: Calculator,
    title: "1. ใส่ราคาคอนโด",
    desc: "ระบุยอดเงินกู้ (ราคาคอนโด − เงินดาวน์ ปกติ 10-20%) อัตราดอกเบี้ย และระยะเวลา",
  },
  {
    icon: Building2,
    title: "2. ดูค่างวดต่อเดือน",
    desc: "เครื่องคำนวณค่างวดให้ทันที พร้อมแสดงดอกเบี้ยรวมตลอดอายุสินเชื่อ",
  },
  {
    icon: Receipt,
    title: "3. บวกค่าส่วนกลาง",
    desc: "อย่าลืมบวกค่าส่วนกลางและภาษีโรงเรือน เพื่อประเมินค่าใช้จ่ายต่อเดือนจริง",
  },
];

const EXAMPLES = [
  { loan: 1_500_000, rate: 3.5, years: 25 },
  { loan: 2_500_000, rate: 3.5, years: 30 },
  { loan: 4_000_000, rate: 3.5, years: 30 },
] as const;

const EXTRA_COSTS = [
  {
    title: "ค่าส่วนกลาง",
    detail: "40-70 บาท/ตร.ม./เดือน — คอนโด 30 ตร.ม. = 1,200-2,100 บาท/เดือน",
    icon: Receipt,
  },
  {
    title: "ค่าโอนกรรมสิทธิ์",
    detail: "2% ของราคาประเมิน (แบ่งกับโครงการ ปกติ 1% ต่อฝ่าย)",
    icon: FileText,
  },
  {
    title: "ค่าจดจำนอง",
    detail: "1% ของวงเงินกู้ + อากรแสตมป์ 0.05%",
    icon: FileText,
  },
  {
    title: "ค่ามิเตอร์น้ำ-ไฟ",
    detail: "ติดตั้งและมัดจำรวมประมาณ 10,000-25,000 บาท",
    icon: Receipt,
  },
];

export default function KhondoPage() {
  return (
    <CalculatorPageLayout
      title={
        <>
          คำนวณค่างวด<span className="italic text-accent">ผ่อนคอนโด</span>
        </>
      }
      subtitle="ใส่ราคาคอนโด ดอกเบี้ย และระยะเวลา — รู้ค่างวด ดอกเบี้ยรวม พร้อมประเมินค่าส่วนกลางและค่าใช้จ่ายในการโอน"
      breadcrumbLabel="คำนวณผ่อนคอนโด"
      badge="เครื่องมือฟรี — ใช้งานง่าย"
      canonicalPath="/khondo/"
      calculator={
        <LoanCalculator
          initialLoan={1_500_000}
          initialRate={3.5}
          initialYears={25}
        />
      }
      faqs={FAQS}
      relatedTools={relatedToolsExcept("/khondo")}
      webAppSchema={{
        name: "คำนวณค่างวดผ่อนคอนโด PhonBaan",
        description:
          "เครื่องคำนวณค่างวดผ่อนคอนโดออนไลน์ฟรี รู้ค่างวด ดอกเบี้ยรวม พร้อมประเมินค่าส่วนกลางและค่าใช้จ่ายในการโอน",
      }}
    >
      {/* How-to */}
      <section className="container-wrap py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            วิธีใช้งาน 3 ขั้นตอน
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HOW_TO.map((step) => (
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

      {/* Extra costs */}
      <section className="container-wrap py-12">
        <div className="rounded-3xl border border-line bg-white/70 p-6 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              ค่าใช้จ่ายอื่นๆ ที่ต้องเตรียม
            </h2>
            <p className="mt-2 text-sm text-ink-soft md:text-base">
              นอกจากค่างวดแล้ว ค่าใช้จ่ายเหล่านี้ต้องเตรียมเงินสดไว้
              คิดเป็นประมาณ 3-5% ของราคาคอนโด
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {EXTRA_COSTS.map((c) => (
              <div
                key={c.title}
                className="flex gap-4 rounded-2xl border border-line bg-bg/40 p-5"
              >
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft/40 text-accent">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-ink">{c.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples */}
      <section className="container-wrap py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
            ตัวอย่างคอนโดที่พบบ่อย
          </h2>
          <p className="mt-2 text-sm text-ink-soft md:text-base">
            คำนวณจากดอกเบี้ย 3.5% ระยะเวลา 25-30 ปี
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {EXAMPLES.map((c) => {
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
    </CalculatorPageLayout>
  );
}
