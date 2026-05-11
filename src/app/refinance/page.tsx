import type { Metadata } from "next";
import { ClipboardList, RefreshCw, Scale } from "lucide-react";
import RefinanceCalculator from "@/components/RefinanceCalculator";
import CalculatorPageLayout from "@/components/CalculatorPageLayout";
import type { FAQItem } from "@/components/AccordionFAQ";
import { relatedToolsExcept } from "@/lib/tools";

export const metadata: Metadata = {
  title: "คำนวณรีไฟแนนซ์บ้าน คุ้มหรือไม่",
  description:
    "เครื่องคำนวณรีไฟแนนซ์บ้านออนไลน์ฟรี เปรียบเทียบสินเชื่อเก่ากับเงื่อนไขใหม่ รู้ค่างวดใหม่ ดอกเบี้ยรวมที่ประหยัด จุดคุ้มทุน และบอกชัดว่าคุ้มหรือไม่",
  alternates: { canonical: "https://phonbaan.com/refinance/" },
};

const FAQS: FAQItem[] = [
  {
    q: "รีไฟแนนซ์บ้านคืออะไร?",
    a: "การรีไฟแนนซ์ (Refinance) คือการย้ายสินเชื่อบ้านจากธนาคารหนึ่งไปอีกธนาคารหนึ่ง เพื่อให้ได้เงื่อนไขที่ดีกว่า — โดยมากคือดอกเบี้ยที่ต่ำลง\n\nธนาคารใหม่จะปลดจำนองเดิม จดจำนองใหม่ และให้สินเชื่อใหม่เท่ายอดหนี้คงเหลือ — คุณก็ผ่อนตามสัญญาใหม่ต่อ\n\nบางครั้งเรียกว่า \"retention\" หากเป็นการขอลดดอกเบี้ยกับธนาคารเดิม (ไม่ต้องย้าย ไม่มีค่าจดจำนองใหม่)",
  },
  {
    q: "รีไฟแนนซ์ตอนไหนคุ้ม?",
    a: "หลักการ 3 ข้อ:\n\n1. ผ่านปีที่ 3 แล้ว — สัญญาเดิมหมดช่วงปลอดค่าปรับ prepayment\n\n2. ดอกเบี้ยใหม่ต่ำกว่าเดิมอย่างน้อย 0.5-1% — ถ้าน้อยกว่านี้ค่าใช้จ่ายรีไฟแนนซ์อาจไม่คุ้ม\n\n3. ยอดหนี้ยังเยอะ (>1 ล้านบาท) — ยิ่งยอดหนี้สูง การลดดอกเบี้ยยิ่งประหยัดเยอะ\n\nลองใส่ตัวเลขในเครื่องคำนวณด้านบน — มันจะคำนวณจุดคุ้มทุนและบอกชัดว่าคุ้มหรือไม่",
  },
  {
    q: "ค่าใช้จ่ายในการรีไฟแนนซ์มีอะไรบ้าง?",
    a: "ค่าใช้จ่ายรวมประมาณ 1-2% ของยอดหนี้คงเหลือ:\n\n1. ค่าจดจำนองใหม่: 1% ของวงเงินกู้ (เพดาน 200,000 บาท)\n2. ค่าอากรแสตมป์: 0.05% ของวงเงิน\n3. ค่าประเมินราคา: 3,000-5,000 บาท\n4. ค่าธรรมเนียมขอข้อมูล (statement, NCB): ~500 บาท\n5. ค่าปลดจำนองธนาคารเดิม: ~1,000 บาท\n6. ค่าประกันอัคคีภัย (ถ้าหมดอายุ): 2,000-5,000 บาท\n\nบางธนาคารมีโปรโมชั่น \"รีไฟแนนซ์ฟรีค่าจดจำนอง\" คุ้มมาก — แต่จะมีเงื่อนไขผูกผ่อน 3 ปี ห้าม prepay\n\nค่าใช้จ่ายในเครื่องคำนวณนี้ default ที่ 1% ของยอดหนี้ ปรับได้ตามจริง",
  },
  {
    q: "รีไฟแนนซ์กับ retention ต่างกันยังไง?",
    a: "Retention (ขอลดดอกเบี้ยกับธนาคารเดิม):\n- ไม่ต้องเปลี่ยนธนาคาร ไม่มีค่าจดจำนอง\n- ดอกเบี้ยอาจลดลงประมาณ 0.5-1%\n- ใช้เวลาเร็ว 1-2 สัปดาห์\n- ทำได้ทุก 2-3 ปี\n\nRefinance (ย้ายธนาคาร):\n- มีค่าใช้จ่าย 1-2% ของยอดหนี้\n- ดอกเบี้ยลดลงได้มากกว่า (ธนาคารใหม่ให้โปรโมชั่นดอกเบี้ยต่ำเพื่อแย่งลูกค้า)\n- ใช้เวลา 1-2 เดือน ต้องเตรียมเอกสารใหม่\n- ทำได้ทุก 3 ปี (หลังพ้นช่วงปลอดค่าปรับ)\n\nเทคนิค: ลองขอ retention ก่อน หากธนาคารเดิมไม่ลดให้ ค่อยขู่ว่าจะ refinance — ส่วนใหญ่จะลดให้",
  },
  {
    q: "รีไฟแนนซ์แล้วได้ดอกเบี้ยเหมือนลูกค้าใหม่ไหม?",
    a: "ใช่ครับ — ธนาคารใหม่จะให้โปรโมชั่นดอกเบี้ยพิเศษเหมือนลูกค้ารายใหม่ทุกประการ\n\nโครงสร้างดอกเบี้ยรีไฟแนนซ์ทั่วไป (2026):\n- 3 ปีแรก: คงที่ 2.5-3.5% (โปรโมชั่น)\n- หลังปี 3: ลอยตัว MRR − 1.5% ถึง MRR − 2% (ปกติ 5-6%)\n\nเฉลี่ย 3 ปีแรก: 3% — ต่ำกว่าดอกเบี้ยลอยตัวของสัญญาเก่าที่อยู่ที่ 6-7% มากพอสมควร นี่คือเหตุผลที่หลายคนรีไฟแนนซ์ทุก 3 ปี",
  },
  {
    q: "เอกสารที่ต้องเตรียมในการรีไฟแนนซ์มีอะไรบ้าง?",
    a: "เอกสารหลัก (เหมือนการกู้บ้านใหม่):\n\n1. บัตรประชาชน + ทะเบียนบ้าน (ตนเองและคู่สมรส)\n2. ทะเบียนสมรส (ถ้ามี)\n3. สลิปเงินเดือนล่าสุด 3 เดือน + หนังสือรับรองการทำงาน\n4. Statement บัญชีเงินเดือน 6-12 เดือนล่าสุด\n5. แบบ ภ.ง.ด. 50 (ฟรีแลนซ์) หรืองบการเงิน (เจ้าของกิจการ)\n6. สำเนาโฉนดที่ดิน + สัญญาซื้อขายเดิม\n7. statement สินเชื่อปัจจุบัน + ใบเสร็จผ่อนล่าสุด 3 เดือน\n8. หนังสือรับรองยอดหนี้คงเหลือจากธนาคารเดิม\n\nกระบวนการอนุมัติ: 2-4 สัปดาห์ — รวมประเมินอสังหาฯ และตรวจเครดิต",
  },
  {
    q: "จุดคุ้มทุนคำนวณยังไง?",
    a: "จุดคุ้มทุน (Break-even point) คือจำนวนเดือนที่ต้องผ่อนหลังรีไฟแนนซ์ เพื่อให้เงินที่ประหยัดจากดอกเบี้ยใหม่ คุ้มกับค่าใช้จ่ายรีไฟแนนซ์\n\nสูตร: จุดคุ้มทุน = ค่าใช้จ่ายรีไฟแนนซ์ ÷ เงินที่ประหยัดได้ต่อเดือน\n\nตัวอย่าง: ค่าใช้จ่ายรีไฟแนนซ์ 30,000 บาท ประหยัดได้ 3,000 บาท/เดือน → จุดคุ้มทุน 10 เดือน\n\nหากคุณวางแผนอยู่บ้านหลังนี้นานกว่า 10 เดือน = คุ้มแน่นอน หากกะจะขายภายใน 6 เดือนต่อมา = ไม่คุ้ม",
  },
];

const HOW_TO = [
  {
    icon: ClipboardList,
    title: "1. ใส่สินเชื่อปัจจุบัน",
    desc: "ระบุยอดหนี้คงเหลือ ดอกเบี้ยปัจจุบัน และระยะเวลาที่เหลือของสัญญาเก่า",
  },
  {
    icon: RefreshCw,
    title: "2. ใส่เงื่อนไขใหม่",
    desc: "ระบุดอกเบี้ยและระยะเวลาที่ธนาคารใหม่เสนอ พร้อมค่าใช้จ่ายในการรีไฟแนนซ์",
  },
  {
    icon: Scale,
    title: "3. ดูคำตัดสิน",
    desc: "ระบบบอกชัดว่ารีไฟแนนซ์คุ้มหรือไม่ พร้อมจุดคุ้มทุนและเงินที่ประหยัดได้",
  },
];

export default function RefinancePage() {
  return (
    <CalculatorPageLayout
      title={
        <>
          คำนวณ<span className="italic text-accent">รีไฟแนนซ์บ้าน</span>{" "}
          คุ้มหรือไม่
        </>
      }
      subtitle="เปรียบเทียบสินเชื่อเก่ากับเงื่อนไขใหม่ — ระบบคำนวณค่างวดใหม่ ดอกเบี้ยที่ประหยัด จุดคุ้มทุน และบอกชัดว่าคุ้มหรือไม่"
      breadcrumbLabel="คำนวณรีไฟแนนซ์"
      badge="ตัดสินใจก่อนยื่นรีไฟแนนซ์"
      canonicalPath="/refinance/"
      calculator={<RefinanceCalculator />}
      faqs={FAQS}
      relatedTools={relatedToolsExcept("/refinance")}
      webAppSchema={{
        name: "คำนวณรีไฟแนนซ์บ้าน PhonBaan",
        description:
          "เครื่องเปรียบเทียบสินเชื่อบ้านเก่ากับเงื่อนไขรีไฟแนนซ์ใหม่ พร้อมคำนวณจุดคุ้มทุน",
      }}
    >
      <section className="container-wrap py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
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

      {/* Checklist */}
      <section className="container-wrap py-12">
        <div className="rounded-3xl border border-line bg-white/70 p-6 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              เช็คก่อนรีไฟแนนซ์
            </h2>
            <p className="mt-2 text-sm text-ink-soft md:text-base">
              ตอบ &quot;ใช่&quot; ทั้ง 3 ข้อ = พร้อมยื่นรีไฟแนนซ์ได้
            </p>
          </div>
          <div className="mt-8 space-y-4">
            {[
              {
                title: "ผ่อนมาแล้วเกิน 3 ปี?",
                detail:
                  "หากยังไม่ครบ 3 ปี อาจมีค่าปรับ prepayment 2-3% ของยอดที่ปิด — รอให้ครบก่อนค่อยรีไฟแนนซ์",
              },
              {
                title: "ดอกเบี้ยใหม่ต่ำกว่าเดิมอย่างน้อย 0.5-1%?",
                detail:
                  "หากน้อยกว่านี้ ค่าใช้จ่ายรีไฟแนนซ์อาจทำให้ไม่คุ้ม — ลองขอ retention กับธนาคารเดิมก่อน",
              },
              {
                title: "ยอดหนี้คงเหลือยังเยอะ (>1 ล้านบาท)?",
                detail:
                  "ยิ่งยอดหนี้เยอะ การลดดอกเบี้ยยิ่งประหยัดเยอะ — หากยอดน้อยกว่า 5 แสน อาจไม่คุ้มค่าใช้จ่ายรีไฟแนนซ์",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border border-line bg-bg/40 p-5"
              >
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </CalculatorPageLayout>
  );
}
