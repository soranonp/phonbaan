"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CookiePreferencesModal from "./CookiePreferencesModal";

export const CONSENT_STORAGE_KEY = "cookie_consent_v1";
export const CONSENT_VERSION = "v1";

export type ConsentState = {
  analytics: boolean;
  ads: boolean;
  timestamp: number;
  version: string;
};

const OPEN_BANNER_EVENT = "phonbaan:open-cookie-banner";

export function openCookieBanner() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_BANNER_EVENT));
  }
}

function applyConsent(consent: { analytics: boolean; ads: boolean }) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag?.("consent", "update", {
    ad_storage: consent.ads ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_user_data: consent.ads ? "granted" : "denied",
    ad_personalization: consent.ads ? "granted" : "denied",
  });
}

function firePageView() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
    page_title: document.title,
  });
}

function saveConsent(consent: { analytics: boolean; ads: boolean }) {
  const payload: ConsentState = {
    ...consent,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
  applyConsent(consent);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!raw) {
        setVisible(true);
      } else {
        const parsed = JSON.parse(raw) as Partial<ConsentState>;
        if (parsed.version !== CONSENT_VERSION) {
          setVisible(true);
        } else if (
          typeof parsed.analytics === "boolean" &&
          typeof parsed.ads === "boolean"
        ) {
          applyConsent({ analytics: parsed.analytics, ads: parsed.ads });
        }
      }
    } catch {
      setVisible(true);
    }

    const onOpen = () => setVisible(true);
    window.addEventListener(OPEN_BANNER_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_BANNER_EVENT, onOpen);
  }, []);

  const handleAcceptAll = () => {
    saveConsent({ analytics: true, ads: true });
    firePageView();
    setVisible(false);
  };

  const handleRejectAll = () => {
    saveConsent({ analytics: false, ads: false });
    setVisible(false);
  };

  const handleSavePreferences = (analytics: boolean, ads: boolean) => {
    saveConsent({ analytics, ads });
    if (analytics) firePageView();
    setModalOpen(false);
    setVisible(false);
  };

  if (!visible && !modalOpen) return null;

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="การตั้งค่าคุกกี้"
          className="fixed inset-x-0 bottom-0 z-[60] flex justify-center px-4 pb-4 sm:pb-6"
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 16px)" }}
        >
          <div
            className="w-full max-w-[540px] rounded-2xl border border-line bg-white p-5 shadow-2xl animate-cookie-slide"
            style={{
              boxShadow:
                "0 10px 30px -10px rgba(12,31,26,0.25), 0 4px 12px -4px rgba(12,31,26,0.1)",
            }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden className="text-lg">
                🍪
              </span>
              <h2 className="font-display text-base font-semibold text-ink">
                เราใช้คุกกี้
              </h2>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-ink-soft">
              เว็บไซต์นี้ใช้คุกกี้เพื่อวิเคราะห์การใช้งานและปรับปรุงประสบการณ์ของคุณ{" "}
              <Link
                href="/privacy"
                className="text-accent underline underline-offset-2 hover:text-accent-bright"
              >
                อ่านนโยบายของเรา
              </Link>
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={handleRejectAll}
                className="flex-1 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-bg"
              >
                ปฏิเสธ
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="flex-1 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-bg"
              >
                ตั้งค่า
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
              >
                ยอมรับทั้งหมด
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <CookiePreferencesModal
          onClose={() => setModalOpen(false)}
          onSave={handleSavePreferences}
        />
      )}
    </>
  );
}
