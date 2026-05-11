import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  tag: string;
  date: string; // ISO yyyy-mm-dd
  author?: string;
  relatedCalculator?: string;
  relatedPosts?: string[];
  heroIllustration?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingMinutes: number;
  wordCount: number;
  formattedDate: string;
}

export interface PostFull extends PostMeta {
  content: string;
}

const SITE_URL = "https://phonbaan.com";

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.mdx?$/, ""));
}

function readPostFile(slug: string): {
  data: PostFrontmatter;
  content: string;
} {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const parsed = matter(raw);
  return {
    data: parsed.data as PostFrontmatter,
    content: parsed.content,
  };
}

// Strip markdown syntax to count actual content characters
function stripMarkdown(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]\([^)]*\)/g, "$1")
    .replace(/[#*_>~|\-]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ");
}

// Estimate Thai word count: count Thai characters and divide by ~4 chars/word
// English words: count whitespace-separated tokens. Sum both.
export function estimateWordCount(content: string): number {
  const stripped = stripMarkdown(content);
  const thaiChars = (stripped.match(/[฀-๿]/g) ?? []).length;
  const nonThaiTokens = stripped
    .replace(/[฀-๿]+/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 0 && /[a-zA-Z0-9%฿]/.test(t)).length;
  const thaiWords = Math.ceil(thaiChars / 4);
  return thaiWords + nonThaiTokens;
}

function calcReadingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200));
}

export function formatThaiDate(iso: string): string {
  const d = new Date(iso);
  // date-fns Thai locale -> e.g. "10 พฤษภาคม 2026"
  return format(d, "d MMMM yyyy", { locale: th });
}

export function getPostMeta(slug: string): PostMeta {
  const { data, content } = readPostFile(slug);
  const wordCount = estimateWordCount(content);
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    tag: data.tag,
    date: data.date,
    author: data.author ?? "ทีม PhonBaan",
    relatedCalculator: data.relatedCalculator,
    relatedPosts: data.relatedPosts,
    heroIllustration: data.heroIllustration,
    wordCount,
    readingMinutes: calcReadingMinutes(wordCount),
    formattedDate: formatThaiDate(data.date),
  };
}

export function getPost(slug: string): PostFull {
  const meta = getPostMeta(slug);
  const { content } = readPostFile(slug);
  return { ...meta, content };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  // First, explicit related posts in frontmatter
  const explicit = (current.relatedPosts ?? [])
    .map((s) => all.find((p) => p.slug === s))
    .filter((p): p is PostMeta => Boolean(p));
  // Fill the rest from same tag, then any remaining
  const others = all.filter(
    (p) => p.slug !== slug && !explicit.some((e) => e.slug === p.slug),
  );
  const sameTag = others.filter((p) => p.tag === current.tag);
  const merged = [...explicit, ...sameTag, ...others];
  // dedupe and trim
  const seen = new Set<string>();
  const result: PostMeta[] = [];
  for (const p of merged) {
    if (seen.has(p.slug)) continue;
    seen.add(p.slug);
    result.push(p);
    if (result.length >= limit) break;
  }
  return result;
}

export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

// Extract h2/h3 headings from markdown for table of contents
export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function thaiSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*_~"'()\[\]{}.,!?:;]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2].trim();
    items.push({ id: thaiSlug(text), text, level });
  }
  return items;
}
