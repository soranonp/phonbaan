"use client";

import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
  onSave: (analytics: boolean, ads: boolean) => void;
}

interface ToggleProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}

function Toggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: ToggleProps) {
  return (
    <div
      className={`flex items-start gap-4 rounded-xl border border-line bg-white/60 p-4 ${
        disabled ? "opacity-80" : ""
      }`}
    >
      <div className="flex-1">
        <p className="mb-1 text-sm font-semibold text-ink">{label}</p>
        <p className="text-xs leading-relaxed text-ink-soft">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => !disabled && onChange?.(!checked)}
        disabled={disabled}
        aria-checked={checked}
        role="switch"
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-accent" : "bg-line"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function CookiePreferencesModal({ onClose, onSave }: Props) {
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="ตั้งค่าคุกกี้"
      className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-6"
    >
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative w-full max-w-[520px] overflow-hidden rounded-2xl border border-line bg-bg shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-ink">
            ตั้งค่าคุกกี้
          </h2>
          <button
            onClick={onClose}
            aria-label="ปิด"
            className="rounded-lg p-1 text-ink-soft hover:bg-line/40"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-3 px-6 py-5">
          <Toggle
            label="คุกกี้ที่จำเป็น"
            description="จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ เช่น การจดจำการตั้งค่าคุกกี้ของคุณ ไม่สามารถปิดได้"
            checked
            disabled
          />
          <Toggle
            label="คุกกี้วิเคราะห์"
            description="ช่วยให้เราเข้าใจการใช้งานของผู้เข้าชม (Google Analytics 4) เพื่อปรับปรุงเว็บไซต์ ข้อมูลถูกรวบรวมแบบไม่ระบุตัวตน"
            checked={analytics}
            onChange={setAnalytics}
          />
          <Toggle
            label="คุกกี้โฆษณา"
            description="ใช้สำหรับแสดงโฆษณาที่เกี่ยวข้องกับความสนใจของคุณ (สำหรับ Google AdSense ในอนาคต)"
            checked={ads}
            onChange={setAds}
          />
        </div>

        <div className="flex flex-col gap-2 border-t border-line px-6 py-4 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-bg"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => onSave(analytics, ads)}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
          >
            บันทึกการตั้งค่า
          </button>
        </div>
      </div>
    </div>
  );
}
