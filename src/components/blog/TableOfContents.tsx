"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog";

interface Props {
  items: TocItem[];
}

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      // Find the heading currently at top of viewport
      const headings = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      const offset = 120;
      let current = "";
      for (const h of headings) {
        const rect = h.getBoundingClientRect();
        if (rect.top - offset <= 0) {
          current = h.id;
        } else {
          break;
        }
      }
      if (current) setActiveId(current);
      else setActiveId(items[0].id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="สารบัญบทความ" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-soft">
        สารบัญ
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li
              key={item.id}
              className={item.level === 3 ? "ml-3" : ""}
            >
              <a
                href={`#${item.id}`}
                className={`block border-l-2 py-1 pl-3 text-sm leading-snug transition-colors ${
                  isActive
                    ? "border-accent font-medium text-accent"
                    : "border-line text-ink-soft hover:border-accent/40 hover:text-accent"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
