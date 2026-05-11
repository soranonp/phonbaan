import type { ReactNode } from "react";
import Link from "next/link";
import { thaiSlug } from "@/lib/blog";

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function HeadingAnchor({ id }: { id: string }) {
  return (
    <a
      href={`#${id}`}
      aria-label="ลิงก์ไปยังหัวข้อนี้"
      className="ml-2 text-ink-soft/30 opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent"
    >
      #
    </a>
  );
}

function H2({ children }: { children?: ReactNode }) {
  const id = thaiSlug(extractText(children));
  return (
    <h2
      id={id}
      className="group mb-4 mt-12 scroll-mt-24 font-display text-2xl font-bold text-accent md:text-3xl"
    >
      {children}
      <HeadingAnchor id={id} />
    </h2>
  );
}

function H3({ children }: { children?: ReactNode }) {
  const id = thaiSlug(extractText(children));
  return (
    <h3
      id={id}
      className="group mb-3 mt-8 scroll-mt-24 font-display text-xl font-semibold text-ink"
    >
      {children}
      <HeadingAnchor id={id} />
    </h3>
  );
}

function P({ children }: { children?: ReactNode }) {
  return (
    <p className="mb-5 leading-[1.9] text-ink-soft">
      {children}
    </p>
  );
}

function UL({ children }: { children?: ReactNode }) {
  return (
    <ul className="mb-6 ml-5 list-disc space-y-2 leading-[1.9] text-ink-soft marker:text-gold">
      {children}
    </ul>
  );
}

function OL({ children }: { children?: ReactNode }) {
  return (
    <ol className="mb-6 ml-5 list-decimal space-y-2 leading-[1.9] text-ink-soft marker:text-accent marker:font-semibold">
      {children}
    </ol>
  );
}

function LI({ children }: { children?: ReactNode }) {
  return <li className="pl-1">{children}</li>;
}

function Strong({ children }: { children?: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

function Em({ children }: { children?: ReactNode }) {
  return <em className="text-accent">{children}</em>;
}

function A({
  href,
  children,
}: {
  href?: string;
  children?: ReactNode;
}) {
  const isInternal = href?.startsWith("/") || href?.startsWith("#");
  const className =
    "font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-bright hover:decoration-accent";
  if (isInternal && href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function Blockquote({ children }: { children?: ReactNode }) {
  return (
    <blockquote className="my-8 rounded-r-xl border-l-4 border-gold bg-gold-soft/20 px-6 py-5 text-ink/90">
      <div className="space-y-2 italic leading-[1.9] [&>p]:m-0 [&>p]:text-ink/90">
        {children}
      </div>
    </blockquote>
  );
}

function InlineCode({ children }: { children?: ReactNode }) {
  return (
    <code className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-sm text-accent">
      {children}
    </code>
  );
}

function Pre({ children }: { children?: ReactNode }) {
  return (
    <pre className="my-6 overflow-x-auto rounded-xl bg-ink p-5 font-mono text-sm leading-relaxed text-bg/90 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-bg/90">
      {children}
    </pre>
  );
}

function Hr() {
  return <hr className="my-10 border-line" />;
}

function Table({ children }: { children?: ReactNode }) {
  return (
    <div className="mdx-table my-6 overflow-x-auto rounded-lg border border-line">
      <table className="w-full font-mono text-sm">{children}</table>
    </div>
  );
}

function THead({ children }: { children?: ReactNode }) {
  return (
    <thead className="bg-bg [&_th]:border-b-2 [&_th]:border-line">
      {children}
    </thead>
  );
}

function TBody({ children }: { children?: ReactNode }) {
  return (
    <tbody
      className="
        [&_tr]:transition-colors hover:[&_tr]:bg-bg
        [&_tr:not(:last-child)_td]:border-b [&_tr:not(:last-child)_td]:border-line
        [&_tr:last-child]:bg-gold-soft/60 [&_tr:last-child_td]:font-bold
        [&_tr_td:first-child]:text-left [&_tr_td:first-child]:font-semibold [&_tr_td:first-child]:text-accent
        [&_tr_td:not(:first-child)]:text-right [&_tr_td:not(:first-child)]:tabular-nums
      "
    >
      {children}
    </tbody>
  );
}

function TR({ children }: { children?: ReactNode }) {
  return <tr>{children}</tr>;
}

function TH({ children }: { children?: ReactNode }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-soft first:text-left [&:not(:first-child)]:text-right">
      {children}
    </th>
  );
}

function TD({ children }: { children?: ReactNode }) {
  return <td className="px-4 py-3 text-sm text-ink-soft">{children}</td>;
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: UL,
  ol: OL,
  li: LI,
  strong: Strong,
  em: Em,
  a: A,
  blockquote: Blockquote,
  code: InlineCode,
  pre: Pre,
  hr: Hr,
  table: Table,
  thead: THead,
  tbody: TBody,
  tr: TR,
  th: TH,
  td: TD,
};
