import Link from "next/link";
import { Building2, Home, RefreshCw, TrendingDown, Wallet } from "lucide-react";

interface Tool {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const TOOLS: Tool[] = [
  {
    href: "/",
    icon: Home,
    title: "คำนวณผ่อนบ้าน",
    desc: "ค่างวด ดอกเบี้ย ตารางผ่อน",
  },
  {
    href: "/khondo",
    icon: Building2,
    title: "คำนวณผ่อนคอนโด",
    desc: "รวมค่าส่วนกลาง ค่าโอน",
  },
  {
    href: "/pho-baan",
    icon: TrendingDown,
    title: "คำนวณโปะบ้าน",
    desc: "ลดดอกเบี้ย ผ่อนหมดเร็วขึ้น",
  },
  {
    href: "/wong-ngern-ku",
    icon: Wallet,
    title: "คำนวณวงเงินกู้",
    desc: "ประเมินวงเงินจากรายได้",
  },
  {
    href: "/refinance",
    icon: RefreshCw,
    title: "คำนวณรีไฟแนนซ์",
    desc: "คุ้มไหมที่จะย้ายธนาคาร",
  },
];

interface ToolsBarProps {
  /** Path of the currently-displayed page — matches the `href` of the active tool */
  currentPath: string;
}

const normalize = (p: string) => (p === "/" ? "/" : p.replace(/\/$/, ""));

export default function ToolsBar({ currentPath }: ToolsBarProps) {
  const current = normalize(currentPath);
  return (
    <section
      aria-label="เครื่องคำนวณทั้งหมด"
      className="container-wrap pb-2 pt-2 md:pb-4 md:pt-4"
    >
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:pb-0">
        {TOOLS.map((tool) => {
          const isActive = tool.href === current;
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex w-[180px] shrink-0 snap-start flex-col gap-1.5 rounded-xl border bg-white p-3.5 transition-all md:w-auto md:p-4 ${
                isActive
                  ? "border-accent shadow-sm ring-1 ring-accent/20"
                  : "border-line hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              }`}
            >
              <div
                className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                  isActive
                    ? "bg-accent text-white"
                    : "bg-gold-soft/40 text-accent group-hover:bg-accent/10"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <h3
                className={`text-sm font-semibold leading-tight ${
                  isActive ? "text-accent" : "text-ink group-hover:text-accent"
                }`}
              >
                {tool.title}
              </h3>
              <p className="text-[11px] leading-snug text-ink-soft md:text-xs">
                {tool.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
