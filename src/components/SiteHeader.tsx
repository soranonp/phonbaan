"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import PhonBaanLogo from "@/components/PhonBaanLogo";

const calculatorLinks = [
  { href: "/", label: "คำนวณผ่อนบ้าน" },
  { href: "/khondo", label: "คำนวณผ่อนคอนโด" },
  { href: "/pho-baan", label: "คำนวณโปะบ้าน" },
  { href: "/wong-ngern-ku", label: "คำนวณวงเงินกู้" },
  { href: "/refinance", label: "คำนวณรีไฟแนนซ์" },
];

const navLinks = [
  { href: "/blog", label: "บทความ" },
  { href: "/about", label: "เกี่ยวกับ" },
  { href: "/contact", label: "ติดต่อ" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-line bg-bg/85 backdrop-blur-md supports-[not_(backdrop-filter:blur(0))]:bg-bg"
      style={{ maxWidth: "100vw" }}
    >
      <div className="container-wrap flex items-center justify-between py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label="PhonBaan — หน้าแรก"
        >
          <PhonBaanLogo
            markClassName="h-8 w-8 sm:h-10 sm:w-10"
            textClassName="text-lg sm:text-xl"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Tools dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              aria-expanded={toolsOpen}
              aria-haspopup="menu"
              className={`flex min-h-[44px] items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/5 ${
                calculatorLinks.some((l) => isActive(l.href))
                  ? "text-accent-bright"
                  : "text-ink-soft"
              }`}
            >
              เครื่องมือ
              <svg
                className={`h-4 w-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {toolsOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full mt-1 w-56 rounded-xl border border-line bg-bg/95 py-1 shadow-lg backdrop-blur-md supports-[not_(backdrop-filter:blur(0))]:bg-bg"
              >
                {calculatorLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    onClick={() => setToolsOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors hover:bg-accent/5 ${
                      isActive(link.href)
                        ? "font-medium text-accent-bright"
                        : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/5 ${
                isActive(link.href) ? "text-accent-bright" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-soft hover:bg-accent/5 md:hidden"
          aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-bg/95 backdrop-blur-md supports-[not_(backdrop-filter:blur(0))]:bg-bg md:hidden"
        >
          <div className="container-wrap py-3">
            <button
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              aria-expanded={mobileToolsOpen}
              className="flex w-full min-h-[44px] items-center justify-between py-2 text-sm font-medium text-ink-soft"
            >
              เครื่องมือ
              <svg
                className={`h-4 w-4 transition-transform ${mobileToolsOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileToolsOpen && (
              <div className="ml-3 border-l-2 border-line pl-3">
                {calculatorLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex min-h-[44px] items-center py-2 text-sm ${
                      isActive(link.href) ? "font-medium text-accent-bright" : "text-ink-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex min-h-[44px] items-center py-2 text-sm ${
                  isActive(link.href) ? "font-medium text-accent-bright" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
