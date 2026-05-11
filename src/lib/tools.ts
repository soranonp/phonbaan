import { Building2, Home, Landmark, PiggyBank, RefreshCw } from "lucide-react";
import type { RelatedTool } from "@/components/CalculatorPageLayout";

export const ALL_TOOLS: (RelatedTool & { href: string })[] = [
  {
    href: "/",
    icon: Home,
    title: "คำนวณค่างวดผ่อนบ้าน",
    desc: "เครื่องคำนวณหลัก — รู้ค่างวด ดอกเบี้ยรวม และตารางผ่อนทุกงวด",
  },
  {
    href: "/khondo",
    icon: Building2,
    title: "คำนวณผ่อนคอนโด",
    desc: "เครื่องคำนวณสำหรับคนซื้อคอนโด พร้อมประเมินค่าใช้จ่ายส่วนกลาง",
  },
  {
    href: "/pho-baan",
    icon: PiggyBank,
    title: "คำนวณโปะบ้าน",
    desc: "ดูว่าการโปะเงินก้อนช่วยลดดอกเบี้ยและร่นเวลาผ่อนได้กี่ปี",
  },
  {
    href: "/wong-ngern-ku",
    icon: Landmark,
    title: "คำนวณวงเงินกู้",
    desc: "ประเมินวงเงินสูงสุดที่ธนาคารจะปล่อยกู้จากรายได้ของคุณ",
  },
  {
    href: "/refinance",
    icon: RefreshCw,
    title: "คำนวณรีไฟแนนซ์",
    desc: "เปรียบเทียบสินเชื่อเก่ากับเงื่อนไขใหม่ ดูว่ารีไฟแนนซ์คุ้มไหม",
  },
];

/** คืน list เครื่องมือทั้งหมดยกเว้นเส้นทางปัจจุบัน */
export const relatedToolsExcept = (currentHref: string): RelatedTool[] =>
  ALL_TOOLS.filter((t) => t.href !== currentHref);
