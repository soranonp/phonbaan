import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "404 ไม่พบหน้า | PhonBaan",
  description: "ไม่พบหน้าที่คุณค้นหา อาจเป็นลิงก์เก่า หรือพิมพ์ URL ผิด",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  {
    href: "/",
    title: "คำนวณผ่อนบ้าน",
    desc: "เครื่องมือหลัก คำนวณค่างวดและตารางผ่อน",
  },
  {
    href: "/khondo",
    title: "คำนวณผ่อนคอนโด",
    desc: "คำนวณค่างวดผ่อนคอนโด",
  },
  {
    href: "/pho-baan",
    title: "คำนวณโปะบ้าน",
    desc: "ดูว่าโปะเท่าไหร่ ประหยัดดอกเบี้ยได้กี่บาท",
  },
  {
    href: "/refinance",
    title: "คำนวณรีไฟแนนซ์",
    desc: "เทียบดอกเบี้ยก่อน-หลังรีไฟแนนซ์",
  },
];

export default function NotFound() {
  const latestPosts = getAllPosts().slice(0, 3);
  return (
    <div className="bg-bg">
      <section className="container-wrap pb-12 pt-16 text-center md:pt-24">
        <p
          className="font-display italic text-accent leading-none"
          style={{ fontSize: "clamp(96px, 22vw, 200px)", fontWeight: 200 }}
        >
          404
        </p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
          ไม่พบหน้าที่คุณกำลังหา
        </h1>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          อาจจะเป็นลิงก์เก่า หรือพิมพ์ URL ผิด — ลองดูเครื่องมือยอดนิยมและบทความล่าสุดด้านล่าง
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
          >
            กลับหน้าหลัก
          </Link>
          <Link
            href="/blog"
            className="rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent/30"
          >
            ดูบทความทั้งหมด
          </Link>
        </div>
      </section>

      <section className="container-wrap mx-auto max-w-4xl pb-12">
        <h2 className="mb-4 text-center font-display text-lg font-semibold text-ink">
          เครื่องมือยอดนิยม
        </h2>
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          {QUICK_LINKS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-xl border border-line bg-white/60 p-5 transition-all hover:border-accent/30 hover:shadow-md"
            >
              <h3 className="mb-1.5 font-display text-base font-semibold text-ink group-hover:text-accent">
                {tool.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="container-wrap mx-auto max-w-4xl pb-20">
          <h2 className="mb-4 text-center font-display text-lg font-semibold text-ink">
            บทความล่าสุด
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-line bg-white/60 p-5 transition-all hover:border-accent/30 hover:shadow-md"
              >
                <span className="mb-2 inline-flex w-fit rounded-full border border-accent/20 bg-accent/5 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                  {post.tag}
                </span>
                <h3 className="mb-2 line-clamp-2 font-display text-sm font-semibold text-ink group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-ink-soft">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
