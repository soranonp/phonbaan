import type { Metadata } from "next";
import { Briefcase, Landmark, Wallet } from "lucide-react";
import LoanLimitCalculator from "@/components/LoanLimitCalculator";
import CalculatorPageLayout from "@/components/CalculatorPageLayout";
import type { FAQItem } from "@/components/AccordionFAQ";
import { relatedToolsExcept } from "@/lib/tools";

export const metadata: Metadata = {
  title: "คำนวณวงเงินกู้บ้านที่ได้รับอนุมัติ",
  description:
    "เครื่องคำนวณวงเงินกู้บ้านสูงสุดจากรายได้และภาระหนี้ปัจจุบัน รองรับ DSR ตามอาชีพ พนักงานประจำ ฟรีแลนซ์ ค้าขาย พร้อมตารางสำรองรายได้เพิ่ม-ลด",
  alternates: { canonical: "https://phonbaan.com/wong-ngern-ku/" },
};

const FAQS: FAQItem[] = [
  {
    q: "DSR คืออะไร? ทำไมธนาคารถึงใช้ตัวเลขนี้?",
    a: "DSR (Debt Service Ratio) คือสัดส่วนภาระหนี้ต่อรายได้ — สูตร: DSR = ภาระหนี้รวมต่อเดือน ÷ รายได้ต่อเดือน × 100\n\nธนาคารใช้ตัวเลขนี้เป็นเกณฑ์หลักในการอนุมัติสินเชื่อ เพราะสะท้อนความสามารถในการชำระหนี้\n\nเกณฑ์ทั่วไปของธนาคารไทย:\n- พนักงานประจำ: DSR ≤ 40%\n- ฟรีแลนซ์/รายได้ไม่ประจำ: DSR ≤ 30-35%\n- เจ้าของกิจการ/ค้าขาย: DSR ≤ 30%\n\nบางธนาคารอาจอนุมัติได้ถึง 50-60% หากเป็นลูกค้าชั้นดี รายได้สูง และเครดิตดีมาก",
  },
  {
    q: "ทำไมอาชีพต่างกัน DSR ถึงต่างกัน?",
    a: "ธนาคารมองความเสี่ยงต่างกันตามความมั่นคงของรายได้:\n\n1. พนักงานประจำ: เงินเดือนแน่นอน มีสลิป มีนายจ้าง → ปล่อยกู้ได้ DSR สูงกว่า\n\n2. ฟรีแลนซ์: รายได้ไม่สม่ำเสมอ ต้องใช้ statement 6-12 เดือน → ปล่อยกู้ DSR ต่ำกว่าเพื่อกันสำรอง\n\n3. เจ้าของกิจการ: รายได้ผันผวนตามธุรกิจ ต้องใช้งบการเงิน → DSR ต่ำสุดเพราะเสี่ยงสูง\n\nหากเป็นฟรีแลนซ์/ค้าขาย ลองเตรียม statement และเอกสารให้ครบ — บางธนาคารยินดีปล่อยกู้ DSR สูงขึ้นถ้าเครดิตและรายได้พิสูจน์ได้",
  },
  {
    q: "อายุมีผลต่อระยะเวลาผ่อนยังไง?",
    a: "ธนาคารกำหนดว่าอายุ ณ วันสิ้นสุดสัญญาต้องไม่เกิน 65 ปี (บางที่ 70 ปี)\n\nสูตร: ระยะเวลาผ่อนสูงสุด = 65 − อายุปัจจุบัน\n\nตัวอย่าง:\n- อายุ 30 ปี → ผ่อนได้สูงสุด 35 ปี (แต่ส่วนใหญ่จำกัด 30 ปี)\n- อายุ 45 ปี → ผ่อนได้สูงสุด 20 ปี\n- อายุ 55 ปี → ผ่อนได้สูงสุด 10 ปี\n\nระยะเวลาผ่อนสั้นลง = ค่างวดสูงขึ้น = วงเงินกู้ลดลง — คนอายุมากอาจต้องการเงินดาวน์มากขึ้น หรือกู้ร่วมกับลูก",
  },
  {
    q: "ภาระหนี้เดิมรวมอะไรบ้าง?",
    a: "ธนาคารจะดูจาก credit bureau (NCB) ภาระหนี้ที่ต้องนำมาคำนวณ DSR:\n\n1. ค่างวดบัตรเครดิต — ขั้นต่ำ 10% ของยอดที่ใช้ (ถึงแม้คุณจะจ่ายเต็มก็ตาม)\n2. ผ่อนรถยนต์ / มอเตอร์ไซค์\n3. สินเชื่อบุคคล / สินเชื่อรถยนต์ส่วนบุคคล\n4. ค่างวดบ้านหลังเดิม (ถ้ามี)\n5. ค้ำประกันให้คนอื่น (บางธนาคารนับ บางที่ไม่นับ)\n\nเคล็ดลับ: ก่อนยื่นกู้ ปิดบัตรเครดิตที่ไม่ใช้ และโปะหนี้สั้นๆ ที่จะหมดเร็ว — DSR ดีขึ้นทันที",
  },
  {
    q: "ถ้ารายได้ไม่พอ จะเพิ่มวงเงินกู้ได้ยังไง?",
    a: "วิธีที่ใช้กันบ่อย:\n\n1. กู้ร่วม — เพิ่มผู้กู้ร่วม (คู่สมรส พ่อแม่ พี่น้อง) รายได้รวมกันเพิ่มวงเงิน\n\n2. เพิ่มเงินดาวน์ — ลดวงเงินกู้ลง ค่างวดต่ำลง DSR ดีขึ้น\n\n3. ขยายระยะเวลาผ่อน — แต่ติดเพดานอายุ 65 ปี\n\n4. ลดภาระหนี้เดิมก่อนยื่น — ปิดบัตรเครดิต/สินเชื่อสั้นๆ\n\n5. เลือกธนาคารที่ DSR ผ่อนปรน — บางที่ให้ถึง 50-60% สำหรับลูกค้ารายได้สูง\n\n6. หาแหล่งรายได้เสริม — Statement รายได้เสริมที่พิสูจน์ได้ (เช่นค่าเช่า) จะถูกนับรวมในรายได้",
  },
  {
    q: "เครื่องคำนวณนี้ตรงกับที่ธนาคารอนุมัติจริงไหม?",
    a: "ผลลัพธ์ที่ได้เป็นการประมาณการเบื้องต้นตามเกณฑ์ DSR มาตรฐาน\n\nธนาคารจริงจะพิจารณาปัจจัยเพิ่มเติม:\n- credit score ใน NCB (เกรด A-F)\n- ความมั่นคงของอาชีพ (อายุงาน, ประเภทบริษัท)\n- เงินสำรองในบัญชี (ปกติ 3-6 เดือนของค่างวด)\n- ราคาประเมินอสังหาฯ (LTV — ปกติให้กู้ 80-90%)\n- ผลิตภัณฑ์สินเชื่อพิเศษ (โครงการรัฐ, สวัสดิการ)\n\nแนะนำให้นำผลลัพธ์ไปยื่นกับ 2-3 ธนาคารเพื่อเปรียบเทียบ",
  },
];

const HOW_TO = [
  {
    icon: Wallet,
    title: "1. ใส่รายได้และภาระหนี้",
    desc: "ระบุรายได้ต่อเดือน และภาระหนี้สินที่ผ่อนอยู่ (บัตรเครดิต ผ่อนรถ ฯลฯ)",
  },
  {
    icon: Briefcase,
    title: "2. เลือกอาชีพและอายุ",
    desc: "อาชีพต่างกันธนาคารยอม DSR ต่างกัน อายุกำหนดระยะเวลาผ่อนสูงสุด",
  },
  {
    icon: Landmark,
    title: "3. ดูวงเงินสูงสุด",
    desc: "ระบบคำนวณวงเงินที่กู้ได้ตามเกณฑ์ DSR พร้อมตารางจำลองหากรายได้เพิ่ม-ลด",
  },
];

export default function WongNgernKuPage() {
  return (
    <CalculatorPageLayout
      title={
        <>
          คำนวณ<span className="italic text-accent">วงเงินกู้บ้าน</span>{" "}
          ที่ได้รับอนุมัติ
        </>
      }
      subtitle="ประเมินวงเงินสูงสุดที่ธนาคารจะปล่อยกู้จากรายได้และภาระหนี้ปัจจุบัน รองรับ DSR ตามอาชีพ — พนักงานประจำ ฟรีแลนซ์ ค้าขาย"
      breadcrumbLabel="คำนวณวงเงินกู้"
      badge="ประเมินก่อนยื่นจริง"
      canonicalPath="/wong-ngern-ku/"
      calculator={<LoanLimitCalculator />}
      faqs={FAQS}
      relatedTools={relatedToolsExcept("/wong-ngern-ku")}
      webAppSchema={{
        name: "คำนวณวงเงินกู้บ้าน PhonBaan",
        description:
          "เครื่องประเมินวงเงินสินเชื่อบ้านสูงสุดตามเกณฑ์ DSR ของธนาคารไทย",
      }}
    >
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

      {/* Formula */}
      <section className="container-wrap py-12">
        <div className="rounded-3xl border border-line bg-white/70 p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
                สูตรคำนวณวงเงินกู้
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft md:text-base">
                ธนาคารคำนวณวงเงินสูงสุดจาก DSR (Debt Service Ratio) — สัดส่วนภาระหนี้ต่อรายได้
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-xl bg-bg p-4 text-sm">
                  <p className="text-ink-soft">ขั้นที่ 1: หาความสามารถผ่อนสูงสุด</p>
                  <p className="mt-1 font-mono text-ink">
                    ค่างวดสูงสุด = (รายได้ × DSR) − ภาระหนี้เดิม
                  </p>
                </div>
                <div className="rounded-xl bg-bg p-4 text-sm">
                  <p className="text-ink-soft">
                    ขั้นที่ 2: ย้อนสูตร PMT หาวงเงินกู้
                  </p>
                  <p className="mt-1 font-mono text-ink">
                    วงเงินกู้ = ค่างวด × [(1+r)<sup>n</sup>−1] ÷ [r(1+r)<sup>n</sup>]
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-accent/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                ตัวอย่าง
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                เงินเดือน{" "}
                <span className="font-semibold text-ink">50,000 บาท</span>{" "}
                พนักงานประจำ (DSR 40%) ไม่มีภาระหนี้
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
                <li>
                  ค่างวดสูงสุด = 50,000 × 40% ={" "}
                  <span className="font-mono font-semibold text-ink">
                    20,000
                  </span>{" "}
                  บาท/เดือน
                </li>
                <li>
                  ที่ดอกเบี้ย 6% × 30 ปี ⇒ วงเงินกู้ ≈{" "}
                  <span className="font-mono font-bold text-accent">
                    3,335,000 บาท
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-ink-soft">
                หากเงินเดือนขึ้นเป็น 60,000 (+20%) วงเงินจะเพิ่มเป็นประมาณ 4,000,000 บาท
              </p>
            </div>
          </div>
        </div>
      </section>
    </CalculatorPageLayout>
  );
}
