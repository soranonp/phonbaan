import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {
  extractToc,
  getAllSlugs,
  getPost,
  getRelatedPosts,
  postUrl,
} from "@/lib/blog";
import { mdxComponents } from "@/components/blog/MdxComponents";
import TableOfContents from "@/components/blog/TableOfContents";
import SocialShare from "@/components/blog/SocialShare";
import { getHeroComponent } from "@/components/blog/heroes";

interface Params {
  slug: string;
}

interface PageProps {
  params: Promise<Params>;
}

const SITE_URL = "https://phonbaan.com";

export const dynamicParams = false;

export const generateStaticParams = (): Params[] =>
  getAllSlugs().map((slug) => ({ slug }));

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;
  try {
    const post = getPost(slug);
    const url = postUrl(post.slug);
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: url },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url,
        type: "article",
        publishedTime: post.date,
        authors: [post.author ?? "ทีม PhonBaan"],
        locale: "th_TH",
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch {
    return { title: "ไม่พบบทความ" };
  }
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPost(slug);
  } catch {
    notFound();
  }

  const toc = extractToc(post.content);
  const related = getRelatedPosts(slug, 3);
  const Hero = getHeroComponent(post.heroIllustration);
  const url = postUrl(post.slug);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author ?? "ทีม PhonBaan",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PhonBaan",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-mark.svg`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "th",
    wordCount: post.wordCount,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าแรก",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "บทความ",
        item: `${SITE_URL}/blog`,
      },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <article className="container-wrap pt-6 pb-10 md:pt-8">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-soft md:text-sm">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-accent">
                หน้าแรก
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                บทความ
              </Link>
            </li>
            <li aria-hidden>›</li>
            <li
              className="line-clamp-1 font-medium text-ink"
              aria-current="page"
            >
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-accent/20 bg-white/70 px-3 py-1 text-xs font-medium text-accent">
            {post.tag}
          </span>
          <h1 className="thai-heading font-display mt-4 text-3xl font-bold leading-tight text-ink md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-base text-ink-soft md:text-lg">
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3 text-xs text-ink-soft">
            <span>{post.formattedDate}</span>
            <span className="text-line">•</span>
            <span>อ่าน {post.readingMinutes} นาที</span>
            <span className="text-line">•</span>
            <span>{post.author}</span>
          </div>
        </div>

        {/* Hero illustration */}
        <div className="mx-auto mt-8 aspect-[2/1] w-full max-w-4xl overflow-hidden rounded-3xl border border-line shadow-sm">
          <Hero />
        </div>
      </article>

      {/* Content + sidebar */}
      <div className="container-wrap pb-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_240px]">
          <main className="min-w-0">
            <div className="prose-thai max-w-none">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: { remarkPlugins: [remarkGfm] },
                  parseFrontmatter: false,
                }}
              />
            </div>

            {post.relatedCalculator && (
              <div className="mt-12 rounded-2xl border-2 border-accent/30 bg-accent/5 p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                  ลองใช้เครื่องมือคำนวณที่เกี่ยวข้อง
                </p>
                <Link
                  href={post.relatedCalculator}
                  className="mt-2 inline-flex items-center gap-2 font-display text-lg font-semibold text-ink hover:text-accent md:text-xl"
                >
                  เปิดเครื่องคำนวณ →
                </Link>
              </div>
            )}
          </main>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <TableOfContents items={toc} />
            <SocialShare url={url} title={post.title} />
          </aside>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="container-wrap pb-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              บทความที่เกี่ยวข้อง
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-line bg-white/60 p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
                >
                  <span className="mb-3 inline-flex w-fit rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
                    {p.tag}
                  </span>
                  <h3 className="mb-3 font-display text-lg font-bold leading-snug text-ink group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {p.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <span>{p.formattedDate}</span>
                    <span className="text-line">•</span>
                    <span>อ่าน {p.readingMinutes} นาที</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
