import Link from "next/link";
import type { ReactNode } from "react";
import { Calculator } from "lucide-react";
import AccordionFAQ, { type FAQItem } from "@/components/AccordionFAQ";
import ToolsBar from "@/components/ToolsBar";

export interface RelatedTool {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

interface Props {
  title: ReactNode;
  subtitle: string;
  breadcrumbLabel: string;
  badge?: string;
  canonicalPath: string;
  calculator: ReactNode;
  /** เนื้อหา/section ระหว่าง calculator กับ FAQ — เช่น how-to, formula, examples */
  children?: ReactNode;
  faqs: FAQItem[];
  relatedTools: RelatedTool[];
  /** Schema.org WebApplication object (without @context/type — auto-added) */
  webAppSchema: {
    name: string;
    description: string;
  };
}

const baseUrl = "https://phonbaan.com";

export default function CalculatorPageLayout({
  title,
  subtitle,
  breadcrumbLabel,
  badge,
  canonicalPath,
  calculator,
  children,
  faqs,
  relatedTools,
  webAppSchema,
}: Props) {
  const url = `${baseUrl}${canonicalPath}`;

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: webAppSchema.name,
    description: webAppSchema.description,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "THB" },
    inLanguage: "th",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าแรก",
        item: `${baseUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabel,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero + breadcrumb */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,82,156,0.08) 0%, rgba(0,82,156,0.02) 60%, transparent 100%)",
          }}
        />
        <div className="container-wrap pt-6 pb-6 md:pt-8 md:pb-10">
          <nav
            aria-label="Breadcrumb"
            className="text-xs text-ink-soft md:text-sm"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-accent">
                  หน้าแรก
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li className="font-medium text-ink" aria-current="page">
                {breadcrumbLabel}
              </li>
            </ol>
          </nav>

          <div className="mx-auto mt-6 max-w-3xl text-center md:mt-8">
            {badge && (
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-3 py-1 text-xs font-medium text-accent">
                <Calculator className="h-3.5 w-3.5" />
                {badge}
              </span>
            )}
            <h1 className="thai-heading font-display mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-ink">
              {title}
            </h1>
            <p className="mt-4 text-base text-ink-soft md:text-lg">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Tools bar — discoverability of other calculators */}
      <ToolsBar currentPath={canonicalPath} />

      {/* Calculator */}
      <section className="container-wrap pb-12 pt-4 md:pt-6">{calculator}</section>

      {/* Page-specific content (how-to, formula, examples, etc.) */}
      {children}

      {/* Related tools */}
      {relatedTools.length > 0 && (
        <section className="container-wrap py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink">
              เครื่องมืออื่นที่เกี่ยวข้อง
            </h2>
            <p className="mt-2 text-sm text-ink-soft md:text-base">
              เครื่องคำนวณที่ช่วยวางแผนการเงินบ้านในขั้นถัดไป
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col rounded-2xl border border-line bg-white/70 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-soft/40 text-accent">
                  <tool.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold text-ink group-hover:text-accent">
                  {tool.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {tool.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  เปิดเครื่องมือ →
                </span>
              </Link>
            ))}
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
              ตอบโดยอ้างอิงเกณฑ์ของธนาคารพาณิชย์ในไทย
            </p>
          </div>
          <div className="mt-8">
            <AccordionFAQ items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
