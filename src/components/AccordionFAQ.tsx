"use client";

import { useState } from "react";

export interface FAQItem {
  q: string;
  a: string;
}

interface Props {
  items: FAQItem[];
}

export default function AccordionFAQ({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border border-line bg-white/40 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="pr-4 text-sm font-medium text-ink">{faq.q}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-ink-soft transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="border-t border-line px-5 py-4 text-sm leading-relaxed text-ink-soft whitespace-pre-line">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
