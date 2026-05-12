import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Fraunces, IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CookieBanner from "@/components/CookieBanner";
import BackToTop from "@/components/BackToTop";
import GAPageView from "@/components/GAPageView";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Display: 700 for headings, 600 italic for emphasis inside headings
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700"],
  style: ["normal", "italic"],
});

// Body: 400 baseline + 600 for semibold. Browser synthesizes 500/700.
const ibmPlex = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "600"],
});

// Mono: single weight 500 — used only for tabular numbers; not preloaded
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["500"],
  preload: false,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://phonbaan.com"),
  title: {
    default: "คำนวณค่างวดผ่อนบ้าน ฟรี | PhonBaan",
    template: "%s | PhonBaan",
  },
  description:
    "เครื่องคำนวณค่างวดผ่อนบ้านออนไลน์ฟรี ใส่ยอดกู้ ดอกเบี้ย และระยะเวลา รู้ค่างวดต่อเดือน ดอกเบี้ยรวม และตารางผ่อนทุกงวด พร้อมเครื่องมือโปะบ้าน รีไฟแนนซ์ และวงเงินกู้",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "โปรแกรมคำนวณค่างวดผ่อนบ้าน — ฟรี ใช้ง่าย",
    description:
      "คำนวณค่างวดผ่อนบ้านออนไลน์ฟรี รู้ค่างวดต่อเดือน ดอกเบี้ยรวม และตารางผ่อนรายปี",
    url: "https://phonbaan.com",
    siteName: "PhonBaan",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PhonBaan — คำนวณค่างวดผ่อนบ้าน",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "โปรแกรมคำนวณค่างวดผ่อนบ้าน | PhonBaan",
    description:
      "คำนวณค่างวดผ่อนบ้านออนไลน์ฟรี รู้ค่างวดต่อเดือน ดอกเบี้ยรวม และตารางผ่อนรายปี",
    images: ["/twitter-image.png"],
  },
  alternates: {
    canonical: "https://phonbaan.com/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#00529C",
};

const webAppLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "โปรแกรมคำนวณค่างวดผ่อนบ้าน",
  url: "https://phonbaan.com",
  description:
    "คำนวณค่างวดผ่อนบ้านออนไลน์ฟรี รู้ค่างวดต่อเดือน ดอกเบี้ยรวม และตารางผ่อนรายปี",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "THB" },
  inLanguage: "th",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PhonBaan",
  alternateName: "คำนวณผ่อนบ้าน",
  url: "https://phonbaan.com",
  logo: "https://phonbaan.com/logo-mark.svg",
  description: "เครื่องมือคำนวณค่างวดผ่อนบ้านภาษาไทย ฟรี",
  foundingDate: "2026",
  email: "hello@phonbaan.com",
  sameAs: [
    "https://facebook.com/phonbaan",
    "https://twitter.com/phonbaan",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="th"
      className={`${fraunces.variable} ${ibmPlex.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <GoogleAnalytics />
        <a href="#main-content" className="skip-link">
          ข้ามไปยังเนื้อหา
        </a>
        {GA_ID && (
          <Suspense fallback={null}>
            <GAPageView />
          </Suspense>
        )}
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
        <CookieBanner />
      </body>
    </html>
  );
}
