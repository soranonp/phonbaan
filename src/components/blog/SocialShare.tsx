"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

interface Props {
  url: string;
  title: string;
}

// LINE icon (lucide doesn't ship one)
function LineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63h-1.752v1.125h1.752c.349 0 .63.282.63.63 0 .345-.281.63-.63.63H17.61c-.348 0-.629-.282-.629-.63v-3.512c0-.345.282-.63.629-.63h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.082-.51-.225l-1.793-2.443v2.072c0 .345-.282.629-.631.629-.346 0-.626-.284-.626-.629V9.863c0-.27.173-.51.43-.595.063-.021.135-.033.199-.033.211 0 .391.084.508.225l1.793 2.443V9.864c0-.345.281-.629.629-.629.346 0 .631.284.631.629zM9.652 13.499c.349 0 .63.282.63.63 0 .345-.281.629-.63.629H7.897c-.348 0-.629-.284-.629-.629v-3.512c0-.345.282-.629.629-.629.347 0 .629.284.629.629v2.882h1.126zm-3.299-3.516v3.516c0 .345-.282.629-.629.629s-.629-.284-.629-.629V9.983c0-.345.282-.629.629-.629.347 0 .629.284.629.629zM12 0C5.373 0 0 4.43 0 9.872c0 4.882 4.275 8.97 10.054 9.733.391.084.923.258 1.058.594.121.301.078.768.038 1.07-.041.305-.236 1.184-.273 1.402-.082.483-.392 1.91 1.668 1.041 2.062-.869 11.106-6.532 15.144-11.184C30.527 14.482 32 11.748 32 9.872 32 4.43 26.627 0 12 0z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

export default function SocialShare({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const lineHref = `https://line.me/R/msg/text/?${encodeURIComponent(`${title} ${url}`)}`;
  const xHref = `https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  const btn =
    "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/60 text-ink-soft transition-all hover:border-accent/30 hover:bg-accent/5 hover:text-accent";

  return (
    <div className="relative">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
        แชร์บทความ
      </p>
      <div className="flex flex-row gap-2 lg:flex-col">
        <a
          href={fbHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          aria-label="แชร์บน Facebook"
        >
          <FacebookIcon className="h-4 w-4" />
        </a>
        <a
          href={lineHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          aria-label="แชร์บน LINE"
        >
          <LineIcon className="h-4 w-4" />
        </a>
        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          className={btn}
          aria-label="แชร์บน X (Twitter)"
        >
          <XIcon className="h-3.5 w-3.5" />
        </a>
        <button
          onClick={handleCopy}
          className={btn}
          aria-label="คัดลอกลิงก์"
        >
          {copied ? (
            <Check className="h-4 w-4 text-accent-bright" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </button>
      </div>
      {copied && (
        <div className="absolute left-0 top-full mt-3 whitespace-nowrap rounded-lg bg-ink px-3 py-1.5 text-xs text-white shadow-lg lg:left-full lg:top-1/2 lg:ml-3 lg:mt-0 lg:-translate-y-1/2">
          คัดลอกลิงก์แล้ว
        </div>
      )}
    </div>
  );
}
