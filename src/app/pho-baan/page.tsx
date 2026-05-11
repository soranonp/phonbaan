import type { Metadata } from "next";
import { Coins, PiggyBank, TrendingDown } from "lucide-react";
import PrepaymentCalculator from "@/components/PrepaymentCalculator";
import CalculatorPageLayout from "@/components/CalculatorPageLayout";
import type { FAQItem } from "@/components/AccordionFAQ";
import { relatedToolsExcept } from "@/lib/tools";

export const metadata: Metadata = {
  title: "คำนวณโปะบ้าน ประหยัดดอกเบี้ย",
  description:
    "เครื่องคำนวณการโปะบ้าน เปรียบเทียบดอกเบี้ยและระยะเวลาผ่อนหลังโปะเงินก้อน เลือกได้ระหว่างลดค่างวดหรือลดระยะเวลา รู้ทันทีว่าประหยัดได้กี่บาท",
  alternates: { canonical: "https://phonbaan.com/pho-baan/" },
};

const FAQS: FAQItem[] = [
  {
    q: "โปะบ้านคืออะไร?",
    a: "โปะบ้าน คือการชำระเงินมากกว่าค่างวดปกติ เพื่อตัดต้นเงินกู้ลง ทำให้ดอกเบี้ยที่จะคิดในงวดถัดไปลดลงตามไปด้วย\n\nมี 2 รูปแบบหลัก:\n\n1. โปะแบบงวด (Recurring Prepayment): จ่ายค่างวดเพิ่มทุกเดือน เช่น ค่างวดปกติ 15,000 จ่ายจริง 20,000\n\n2. โปะแบบเงินก้อน (Lump-sum Prepayment): นำเงินก้อนมาตัดต้นทีเดียว เช่น โบนัสปลายปี 100,000 บาท\n\nเครื่องคำนวณนี้ใช้สำหรับการโปะแบบเงินก้อน",
  },
  {
    q: "โปะแล้วได้อะไร — ลดค่างวด vs ลดระยะเวลา?",
    a: "เมื่อโปะเงินก้อน ธนาคารจะถามว่าต้องการแบบไหน:\n\n1. ลดค่างวด (Reduce Payment): ระยะเวลาผ่อนเท่าเดิม แต่ค่างวดลดลง — มีเงินเหลือใช้จ่ายเพิ่ม\n\n2. ลดระยะเวลา (Reduce Term): ค่างวดเท่าเดิม แต่ผ่อนหมดเร็วขึ้น — ประหยัดดอกเบี้ยรวมได้มากกว่า\n\nแนะนำ \"ลดระยะเวลา\" หากกระแสเงินสดยังโอเค เพราะประหยัดดอกเบี้ยรวมได้มากกว่ามากในระยะยาว",
  },
  {
    q: "โปะเท่าไหร่ถึงคุ้ม?",
    a: "ไม่มีตัวเลขตายตัว แต่หลักการคือ: ทุกบาทที่โปะคือเงินที่ไม่ต้องเสียดอกเบี้ยอีกต่อไป\n\nหากเงินก้อนของคุณ:\n- ฝากธนาคาร ได้ดอกเบี้ย 1-2% ต่อปี\n- ผ่อนบ้าน เสียดอกเบี้ย 5-7% ต่อปี\n\n→ การนำมาโปะคุ้มกว่าฝากออมเสมอ (ผลตอบแทนสูงกว่าและไม่ต้องเสียภาษี)\n\nยกเว้น: ถ้ามีพอร์ตหุ้น/ลงทุนได้ผลตอบแทนสูงกว่าดอกเบี้ยบ้านอย่างมั่นคง การลงทุนอาจคุ้มกว่า แต่มีความเสี่ยง",
  },
  {
    q: "ค่าปรับ Prepayment คืออะไร? เมื่อไหร่ต้องจ่าย?",
    a: "ค่าปรับการชำระคืนก่อนกำหนด (Prepayment Penalty) คือค่าธรรมเนียมที่ธนาคารเก็บเมื่อปิดยอดหรือชำระบางส่วนเร็วเกินไป\n\nสินเชื่อบ้านในไทยปกติ:\n- ปีที่ 1-3: ค่าปรับ 2-3% ของยอดที่ชำระเกิน (เพราะธนาคารยังไม่ได้คืนทุนค่าโปรโมชั่นดอกเบี้ย)\n- หลังปีที่ 3: ปลอดค่าปรับ\n\nก่อนโปะให้ตรวจสัญญาก่อนเสมอ — ส่วนใหญ่จะระบุชัดเจน หากไม่แน่ใจให้โทรถามธนาคาร",
  },
  {
    q: "โปะตอนไหนคุ้มที่สุด?",
    a: "โปะในช่วง 5-7 ปีแรกของสัญญาคุ้มที่สุด เพราะดอกเบี้ยกินสัดส่วนของค่างวดมาก\n\nตัวอย่าง: กู้ 3 ล้าน 30 ปี ดอกเบี้ย 5% — ค่างวด ~16,100 บาท\n- เดือนแรก: ดอกเบี้ย 12,500, เงินต้น 3,600 (ดอกเบี้ย 78%)\n- ปีที่ 10: ดอกเบี้ย 9,200, เงินต้น 6,900 (ดอกเบี้ย 57%)\n- ปีที่ 20: ดอกเบี้ย 4,800, เงินต้น 11,300 (ดอกเบี้ย 30%)\n\nยิ่งโปะเร็ว ดอกเบี้ยที่หายไปยิ่งเยอะ — แต่ต้องผ่านปีที่ 3 ก่อน เพื่อเลี่ยงค่าปรับ",
  },
  {
    q: "ถ้าโปะแล้วยอดเงินไม่พอครอบคลุมงวดต่อไป จะเป็นยังไง?",
    a: "ค่างวดจะคำนวณใหม่ทันทีจากยอดหนี้คงเหลือใหม่ ดังนั้นจะไม่มีปัญหาเงินไม่พอ ตราบใดที่คุณยังจ่ายค่างวดต่อไปตามกำหนด\n\nหากจะปิดยอดทั้งหมดในครั้งเดียว (ปิดบัญชี) ต้องแจ้งธนาคารล่วงหน้า 30 วัน — และตรวจสอบว่ามีค่าปรับ prepayment หรือไม่ ถ้าผ่านปีที่ 3 แล้วปกติไม่มี",
  },
  {
    q: "ระหว่างโปะ vs รีไฟแนนซ์ ทำอะไรก่อนดี?",
    a: "ถ้ามีเงินก้อน + ดอกเบี้ยปัจจุบันยังสูง (>5%) ลองรีไฟแนนซ์ก่อน เพราะ:\n\n1. ดอกเบี้ยรีไฟแนนซ์มักได้โปรโมชั่น ~3% ต่ำกว่าดอกเบี้ยลอยตัวที่จ่ายอยู่\n2. หลังรีไฟแนนซ์แล้วค่อยโปะ จะตัดต้นได้เร็วกว่า\n\nแต่ถ้าดอกเบี้ยปัจจุบันต่ำกว่า 4% อยู่แล้ว การรีไฟแนนซ์อาจไม่คุ้มเพราะค่าใช้จ่ายรีไฟแนนซ์ (~1% ของวงเงิน) สูง — โปะเลยจะคุ้มกว่า\n\nลองเครื่องคำนวณรีไฟแนนซ์เพื่อเปรียบเทียบ",
  },
];

const HOW_TO = [
  {
    icon: PiggyBank,
    title: "1. ใส่ข้อมูลปัจจุบัน",
    desc: "ระบุยอดหนี้คงเหลือ ดอกเบี้ย และระยะเวลาที่เหลือของสินเชื่อปัจจุบัน",
  },
  {
    icon: Coins,
    title: "2. ใส่เงินที่จะโปะ",
    desc: "ระบุจำนวนเงินก้อนที่ต้องการโปะ และเลือกโหมด: ลดค่างวด หรือ ลดระยะเวลา",
  },
  {
    icon: TrendingDown,
    title: "3. ดูผลลัพธ์",
    desc: "ระบบแสดงดอกเบี้ยที่ประหยัดได้ จำนวนเดือนที่ผ่อนหมดเร็วขึ้น และเทียบยอดหนี้กับการไม่โปะ",
  },
];

export default function PhoBaanPage() {
  return (
    <CalculatorPageLayout
      title={
        <>
          คำนวณ<span className="italic text-accent">โปะบ้าน</span> ประหยัดดอกเบี้ย
        </>
      }
      subtitle="โปะเงินก้อนแล้วประหยัดดอกเบี้ยได้กี่บาท? ผ่อนหมดเร็วขึ้นกี่ปี? เลือกได้ระหว่างลดค่างวดหรือลดระยะเวลา เห็นผลลัพธ์ทันที"
      breadcrumbLabel="คำนวณโปะบ้าน"
      badge="ตัดสินใจก่อนโปะ — เห็นผลก่อนจริง"
      canonicalPath="/pho-baan/"
      calculator={<PrepaymentCalculator />}
      faqs={FAQS}
      relatedTools={relatedToolsExcept("/pho-baan")}
      webAppSchema={{
        name: "คำนวณโปะบ้าน PhonBaan",
        description:
          "เครื่องคำนวณการโปะเงินก้อนสำหรับสินเชื่อบ้าน เปรียบเทียบดอกเบี้ยและระยะเวลาผ่อนก่อนตัดสินใจ",
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

      {/* Principle */}
      <section className="container-wrap py-12">
        <div className="rounded-3xl border border-line bg-white/70 p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                ทำไมโปะถึงประหยัดดอกเบี้ย?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                ดอกเบี้ยสินเชื่อบ้านคำนวณจาก{" "}
                <strong className="text-ink">เงินต้นคงเหลือ</strong> ทุกเดือน
                ไม่ใช่จากยอดกู้ดั้งเดิม
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                เมื่อโปะเงินก้อนเข้าไปตัดต้น ยอดหนี้ลด → ดอกเบี้ยที่คิดในเดือนถัดไปลดทันที →
                ค่างวดเดือนถัดไปจะถูกใช้ตัดต้นได้มากขึ้น → ดอกเบี้ยรวมตลอดอายุสินเชื่อลดลงอย่างมีนัยสำคัญ
              </p>
            </div>
            <div className="rounded-2xl bg-accent/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                ตัวอย่าง
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                ยอดหนี้คงเหลือ{" "}
                <span className="font-semibold text-ink">2,500,000 บาท</span>{" "}
                ดอกเบี้ย{" "}
                <span className="font-semibold text-ink">5%</span> เหลือ{" "}
                <span className="font-semibold text-ink">25 ปี</span>
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                หากโปะ{" "}
                <span className="font-mono font-semibold text-accent">
                  300,000 บาท
                </span>{" "}
                แบบลดระยะเวลา จะ:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink-soft">
                <li>
                  • ผ่อนหมดเร็วขึ้น{" "}
                  <span className="font-mono font-semibold text-emerald-700">
                    ~6 ปี
                  </span>
                </li>
                <li>
                  • ประหยัดดอกเบี้ยได้{" "}
                  <span className="font-mono font-semibold text-emerald-700">
                    ~900,000+ บาท
                  </span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-ink-soft">
                ลองปรับสไลเดอร์ด้านบนเพื่อคำนวณกรณีของคุณ
              </p>
            </div>
          </div>
        </div>
      </section>
    </CalculatorPageLayout>
  );
}
