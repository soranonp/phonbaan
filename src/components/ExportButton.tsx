"use client";

import { useState } from "react";
import { Check, Download, Loader2 } from "lucide-react";
import { exportElementToPng } from "@/lib/exportImage";
import { Analytics } from "@/lib/analytics";

interface Props {
  /** id of the hidden ResultCard to capture */
  targetId: string;
  /** Filename prefix (timestamp is appended) */
  filenamePrefix: string;
  /** Optional GA event label identifying which calculator triggered the export */
  analyticsType?: string;
}

type Status = "idle" | "loading" | "done";

export default function ExportButton({ targetId, filenamePrefix, analyticsType }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  const handleClick = async () => {
    setStatus("loading");
    try {
      await exportElementToPng({ elementId: targetId, filenamePrefix });
      if (analyticsType) Analytics.exportPng(analyticsType);
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2200);
    } catch (err) {
      console.error("Export failed:", err);
      setStatus("idle");
      alert("ไม่สามารถบันทึกรูปได้ กรุณาลองอีกครั้ง");
    }
  };

  const label =
    status === "loading"
      ? "กำลังบันทึก..."
      : status === "done"
        ? "บันทึกสำเร็จ!"
        : "บันทึกเป็นรูปภาพ";

  const Icon =
    status === "loading" ? Loader2 : status === "done" ? Check : Download;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      className={`inline-flex items-center gap-2 rounded-lg border-2 border-accent/40 bg-white px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:border-accent hover:bg-accent/5 disabled:cursor-wait disabled:opacity-70 ${
        status === "done" ? "border-emerald-500 text-emerald-700" : ""
      }`}
      aria-live="polite"
    >
      <Icon className={`h-4 w-4 ${status === "loading" ? "animate-spin" : ""}`} />
      {label}
    </button>
  );
}
