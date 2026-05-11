"use client";

import { useState } from "react";

const FORM_ENDPOINT = "YOUR_FORM_ENDPOINT_HERE";

const SUBJECTS = [
  { value: "suggestion", label: "คำแนะนำ" },
  { value: "bug", label: "รายงานบัค" },
  { value: "guest-post", label: "Guest post" },
  { value: "ads", label: "โฆษณา" },
  { value: "other", label: "อื่น ๆ" },
];

type Toast =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0].value);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "กรุณากรอกชื่อ";
    if (!email.trim()) next.email = "กรุณากรอกอีเมล";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "รูปแบบอีเมลไม่ถูกต้อง";
    if (!message.trim() || message.trim().length < 10)
      next.message = "ข้อความสั้นเกินไป (อย่างน้อย 10 ตัวอักษร)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    if (!validate()) return;

    setSubmitting(true);
    try {
      if (FORM_ENDPOINT === "YOUR_FORM_ENDPOINT_HERE") {
        // Placeholder: simulate success
        await new Promise((r) => setTimeout(r, 600));
        setToast({
          type: "success",
          message:
            "ส่งข้อความเรียบร้อย (placeholder) — ตั้งค่า Web3Forms endpoint เพื่อส่งจริง",
        });
        setName("");
        setEmail("");
        setMessage("");
        setSubject(SUBJECTS[0].value);
      } else {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            subject: SUBJECTS.find((s) => s.value === subject)?.label,
            message,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setToast({
          type: "success",
          message: "ส่งข้อความเรียบร้อย เราจะติดต่อกลับโดยเร็วที่สุด",
        });
        setName("");
        setEmail("");
        setMessage("");
        setSubject(SUBJECTS[0].value);
      }
    } catch {
      setToast({
        type: "error",
        message: "เกิดข้อผิดพลาดในการส่ง กรุณาลองใหม่หรือส่งอีเมลตรงถึงเรา",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-2xl border border-line bg-white/60 p-6"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          ชื่อ <span className="text-accent">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent ${
            errors.name ? "border-red-400" : "border-line"
          }`}
          autoComplete="name"
          required
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          อีเมล <span className="text-accent">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent ${
            errors.email ? "border-red-400" : "border-line"
          }`}
          autoComplete="email"
          required
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          หัวข้อ
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        >
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-ink"
        >
          ข้อความ <span className="text-accent">*</span>
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className={`w-full resize-y rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent ${
            errors.message ? "border-red-400" : "border-line"
          }`}
          required
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright disabled:opacity-60"
      >
        {submitting ? "กำลังส่ง..." : "ส่งข้อความ"}
      </button>

      {toast && (
        <div
          role="status"
          className={`rounded-lg border px-4 py-3 text-sm ${
            toast.type === "success"
              ? "border-accent/30 bg-accent/5 text-accent"
              : "border-red-400 bg-red-50 text-red-700"
          }`}
        >
          {toast.message}
        </div>
      )}
    </form>
  );
}
