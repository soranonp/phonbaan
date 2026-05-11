"use client";

import { openCookieBanner } from "./CookieBanner";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function CookieSettingsButton({
  className,
  children = "ตั้งค่าคุกกี้",
}: Props) {
  return (
    <button
      type="button"
      onClick={openCookieBanner}
      className={
        className ?? "text-sm transition-colors hover:text-white text-left"
      }
    >
      {children}
    </button>
  );
}
