import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import CookieSettingsButton from "./CookieSettingsButton";
import PhonBaanLogo from "./PhonBaanLogo";

const toolLinks = [
  { href: "/", label: "คำนวณผ่อนบ้าน" },
  { href: "/khondo", label: "คำนวณผ่อนคอนโด" },
  { href: "/pho-baan", label: "คำนวณโปะบ้าน" },
  { href: "/wong-ngern-ku", label: "คำนวณวงเงินกู้" },
  { href: "/refinance", label: "คำนวณรีไฟแนนซ์" },
];

const navLinks = [
  { href: "/blog", label: "บทความทั้งหมด" },
  { href: "/about", label: "เกี่ยวกับเรา" },
  { href: "/contact", label: "ติดต่อ" },
];

const policyLinks = [
  { href: "/privacy-policy", label: "นโยบายความเป็นส่วนตัว" },
  { href: "/cookie-policy", label: "นโยบายคุกกี้" },
];

const socials = [
  {
    href: "https://facebook.com/phonbaan",
    label: "Facebook",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z" />
      </svg>
    ),
  },
  {
    href: "https://twitter.com/phonbaan",
    label: "X / Twitter",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zM17.083 19.77h1.832L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "https://line.me/R/ti/p/@phonbaan",
    label: "Line",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.4 4H4.6A2.6 2.6 0 002 6.6v10.8A2.6 2.6 0 004.6 20H10v-2.5l4.5 2.3.5.2c2.6 0 4-1.4 4-4V6.6A2.6 2.6 0 0019.4 4zM7.5 14H6v-4h1.5v4zm3.6 0H10v-4h1.1l1.4 2v-2H14v4h-1.1l-1.4-2v2zm5.4-2.5h-1.5v.5h1.5V13h-1.5v.5H17V14h-3v-4h3v.5h-1.5v.5h1.5v.5z" />
      </svg>
    ),
  },
];

export default function SiteFooter() {
  const featuredPosts = getAllPosts().slice(0, 3);
  const contentLinks = [
    ...featuredPosts.map((p) => ({
      href: `/blog/${p.slug}`,
      label: p.title,
    })),
    ...navLinks,
  ];
  return (
    <footer
      className="border-t-4 border-gold bg-ink text-bg/70"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-3">
            <PhonBaanLogo
              markClassName="h-9 w-9"
              textClassName="text-xl"
              variant="white"
            />
          </div>
          <p className="text-sm leading-relaxed">
            เครื่องมือคำนวณการเงินออนไลน์ ใช้งานฟรี ไม่ต้องสมัครสมาชิก
          </p>
          <div className="mt-4 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-bg/70 transition-colors hover:border-gold/50 hover:text-gold"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* เครื่องมือ */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">
            เครื่องมือ
          </h3>
          <ul className="space-y-2">
            {toolLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* เนื้อหา */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">
            เนื้อหา
          </h3>
          <ul className="space-y-2">
            {contentLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* นโยบาย */}
        <div>
          <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-gold">
            นโยบาย
          </h3>
          <ul className="space-y-2">
            {policyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton className="text-left text-sm transition-colors hover:text-white" />
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wrap py-5 text-center text-xs text-bg/40">
          <p>© 2026 phonbaan.com — สงวนลิขสิทธิ์</p>
          <p className="mt-1">
            ผลลัพธ์จากเครื่องมือนี้เป็นเพียงการประมาณการเท่านั้น
            ไม่ใช่คำแนะนำทางการเงิน อัตราดอกเบี้ยจริงและเงื่อนไขสินเชื่อขึ้นอยู่กับสถาบันการเงิน
          </p>
        </div>
      </div>
    </footer>
  );
}
