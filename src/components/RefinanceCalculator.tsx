"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { calculateRefinance } from "@/lib/calculations";
import { formatNumber, formatTHB } from "@/lib/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import ExportButton from "@/components/ExportButton";

export default function RefinanceCalculator() {
  const [balance, setBalance] = useState(2_500_000);
  const [oldRate, setOldRate] = useState(6);
  const [oldRemainingYears, setOldRemainingYears] = useState(25);
  const [newRate, setNewRate] = useState(3.5);
  const [newYears, setNewYears] = useState(25);
  // Default refinance cost = 1% of balance, but user can override
  const [refinanceCostOverride, setRefinanceCostOverride] = useState<
    number | null
  >(null);
  const refinanceCost = refinanceCostOverride ?? Math.round(balance * 0.01);

  const result = useMemo(
    () =>
      calculateRefinance({
        balance,
        oldRate,
        oldRemainingYears,
        newRate,
        newYears,
        refinanceCost,
      }),
    [balance, oldRate, oldRemainingYears, newRate, newYears, refinanceCost],
  );

  const monthlyPositive = result.monthlySaving > 0;

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-99999px",
          top: 0,
          pointerEvents: "none",
        }}
      >
        <ResultCard
          id="export-refinance-result"
          title="ผลคำนวณรีไฟแนนซ์"
          subtitle={`ยอดหนี้ ${formatTHB(balance)} · ${oldRate.toFixed(2)}% → ${newRate.toFixed(2)}%`}
          inputs={[
            { label: "ยอดหนี้คงเหลือ", value: `${formatNumber(balance)} บาท` },
            {
              label: "ดอกเบี้ยเดิม",
              value: `${oldRate.toFixed(2)}% · ${oldRemainingYears} ปี`,
            },
            {
              label: "ดอกเบี้ยใหม่",
              value: `${newRate.toFixed(2)}% · ${newYears} ปี`,
            },
            {
              label: "ค่าใช้จ่ายรีไฟแนนซ์",
              value: `${formatNumber(refinanceCost)} บาท`,
            },
          ]}
          results={[
            {
              label: result.worthwhile ? "ผลการประเมิน" : "ผลการประเมิน",
              value: result.worthwhile ? "✅ คุ้ม รีไฟแนนซ์ได้" : "❌ ยังไม่คุ้ม",
              highlight: true,
            },
            {
              label: "ประหยัด/เดือน",
              value: `${monthlyPositive ? "+" : ""}${formatNumber(result.monthlySaving)} บาท`,
            },
            {
              label: "จุดคุ้มทุน",
              value:
                result.breakEvenMonths === null
                  ? "—"
                  : result.breakEvenMonths === 0
                    ? "ทันที"
                    : `${result.breakEvenMonths} เดือน`,
            },
            {
              label: "ประหยัดรวมสุทธิ",
              value: `${result.totalSaving >= 0 ? "+" : ""}${formatNumber(result.totalSaving)} บาท`,
            },
          ]}
          toolUrl="phonbaan.com/refinance"
        />
      </div>

    <section
      aria-label="เครื่องคำนวณรีไฟแนนซ์บ้าน"
      className="rounded-3xl border border-line bg-white/70 p-5 shadow-sm md:p-8"
    >
      {/* Inputs — 2 columns: old plan, new plan */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-bg/40 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">
            แผนปัจจุบัน
          </h3>
          <div className="mt-4 space-y-5">
            <SliderInput
              label="ยอดหนี้คงเหลือ"
              unit="บาท"
              value={balance}
              onChange={setBalance}
              min={100_000}
              max={15_000_000}
              step={50_000}
            />
            <SliderInput
              label="ดอกเบี้ยปัจจุบัน"
              unit="% ต่อปี"
              value={oldRate}
              onChange={setOldRate}
              min={0.5}
              max={12}
              step={0.05}
              format={(n) => n.toFixed(2)}
            />
            <SliderInput
              label="ระยะเวลาคงเหลือ"
              unit="ปี"
              value={oldRemainingYears}
              onChange={setOldRemainingYears}
              min={1}
              max={40}
              step={1}
              format={(n) => String(Math.round(n))}
            />
          </div>
        </div>

        <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
            แผนรีไฟแนนซ์ใหม่
          </h3>
          <div className="mt-4 space-y-5">
            <SliderInput
              label="ดอกเบี้ยใหม่"
              unit="% ต่อปี"
              value={newRate}
              onChange={setNewRate}
              min={0.5}
              max={12}
              step={0.05}
              format={(n) => n.toFixed(2)}
            />
            <SliderInput
              label="ระยะเวลาใหม่"
              unit="ปี"
              value={newYears}
              onChange={setNewYears}
              min={1}
              max={40}
              step={1}
              format={(n) => String(Math.round(n))}
            />
            <SliderInput
              label="ค่าใช้จ่ายรีไฟแนนซ์"
              unit="บาท"
              value={refinanceCost}
              onChange={(n) => setRefinanceCostOverride(n)}
              min={0}
              max={Math.max(50_000, Math.round(balance * 0.05))}
              step={1_000}
              hint="ค่าจดจำนอง 1% + ค่าประเมิน 3-5K + อากรแสตมป์ 0.05%"
            />
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div
        className={`mt-8 flex items-start gap-4 rounded-2xl border-2 px-6 py-6 md:px-8 ${
          result.worthwhile
            ? "border-emerald-300 bg-emerald-50"
            : "border-rose-300 bg-rose-50"
        }`}
      >
        <div className="shrink-0">
          {result.worthwhile ? (
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          ) : (
            <XCircle className="h-10 w-10 text-rose-600" />
          )}
        </div>
        <div>
          <p
            className={`font-display text-2xl font-bold md:text-3xl ${
              result.worthwhile ? "text-emerald-800" : "text-rose-800"
            }`}
          >
            {result.worthwhile ? "คุ้ม — รีไฟแนนซ์ได้" : "ยังไม่คุ้ม — ควรพิจารณาอีกที"}
          </p>
          <p
            className={`mt-1 text-sm md:text-base ${
              result.worthwhile ? "text-emerald-900/85" : "text-rose-900/85"
            }`}
          >
            {result.worthwhile
              ? `หลังหักค่าใช้จ่ายในการรีไฟแนนซ์ ${formatTHB(refinanceCost)} แล้ว ยังประหยัดดอกเบี้ยรวมได้ ${formatTHB(result.totalSaving)} ตลอดอายุสินเชื่อ`
              : monthlyPositive
                ? `ค่างวดลดลงต่อเดือน แต่ระยะเวลายาวขึ้นทำให้ดอกเบี้ยรวมเพิ่ม ${formatTHB(Math.abs(result.totalSaving))} ลองลดระยะเวลาผ่อนใหม่ลง`
                : `ค่างวดใหม่สูงกว่าเดิม ${formatTHB(Math.abs(result.monthlySaving))}/เดือน — ลองเปรียบเทียบดอกเบี้ยให้ต่ำกว่าเดิมก่อน`}
          </p>
        </div>
      </div>

      {/* Side-by-side comparison */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-bg/60 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            ค่างวดเดิม
          </p>
          <p className="mt-1 font-mono text-3xl font-bold text-ink">
            {formatNumber(result.oldPayment)}
            <span className="ml-1 text-base font-medium text-ink-soft">
              บาท/เดือน
            </span>
          </p>
          <p className="mt-2 text-xs text-ink-soft">
            ดอกเบี้ยรวม{" "}
            <span className="font-mono font-semibold text-gold">
              {formatNumber(result.totalInterestOld)} บาท
            </span>
          </p>
        </div>
        <div className="rounded-2xl border-2 border-accent/40 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            ค่างวดใหม่
          </p>
          <p className="mt-1 font-mono text-3xl font-bold text-accent">
            {formatNumber(result.newPayment)}
            <span className="ml-1 text-base font-medium text-ink-soft">
              บาท/เดือน
            </span>
          </p>
          <p className="mt-2 text-xs text-ink-soft">
            ดอกเบี้ยรวม + ค่าใช้จ่ายรีไฟแนนซ์{" "}
            <span className="font-mono font-semibold text-accent">
              {formatNumber(result.totalInterestNew)} บาท
            </span>
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-white/70 p-4">
          <p className="text-xs text-ink-soft">ประหยัด/เดือน</p>
          <p
            className={`mt-1 font-mono text-xl font-bold ${
              monthlyPositive ? "text-emerald-700" : "text-rose-600"
            }`}
          >
            {monthlyPositive ? "+" : ""}
            {formatNumber(result.monthlySaving)}{" "}
            <span className="text-sm font-medium text-ink-soft">บาท</span>
          </p>
        </div>
        <div className="rounded-xl border border-line bg-white/70 p-4">
          <p className="text-xs text-ink-soft">จุดคุ้มทุน</p>
          <p className="mt-1 font-mono text-xl font-bold text-ink">
            {result.breakEvenMonths === null
              ? "—"
              : result.breakEvenMonths === 0
                ? "ทันที"
                : `${result.breakEvenMonths} เดือน`}
          </p>
        </div>
        <div className="rounded-xl border border-line bg-white/70 p-4">
          <p className="text-xs text-ink-soft">ประหยัดรวมสุทธิ</p>
          <p
            className={`mt-1 font-mono text-xl font-bold ${
              result.worthwhile ? "text-emerald-700" : "text-rose-600"
            }`}
          >
            {result.totalSaving >= 0 ? "+" : ""}
            {formatNumber(result.totalSaving)}{" "}
            <span className="text-sm font-medium text-ink-soft">บาท</span>
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <ExportButton
          targetId="export-refinance-result"
          filenamePrefix="phonbaan-refinance"
        />
      </div>
    </section>
    </>
  );
}
