"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GAPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastPath = useRef<string>("");

  useEffect(() => {
    if (!GA_ID) return;

    const query = searchParams.toString();
    const url = pathname + (query ? `?${query}` : "");
    if (url === lastPath.current) return;
    lastPath.current = url;

    const timer = setTimeout(() => {
      if (typeof window.gtag !== "function") return;
      window.gtag("event", "page_view", {
        page_location: window.location.href,
        page_path: url,
        page_title: document.title,
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
