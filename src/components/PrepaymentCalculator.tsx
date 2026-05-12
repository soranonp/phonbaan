"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  calculatePrepaymentScenario,
  type PrepayFrequency,
} from "@/lib/calculations";
import { formatNumber, formatNumberShort, formatTHB } from "@/lib/format";
import ChartTooltip from "@/components/charts/ChartTooltip";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import ExportButton from "@/components/ExportButton";
import { Analytics } from "@/lib/analytics";

const COLOR_BEFORE = "#ffb81c"; // gold — used on line + tooltip
const COLOR_AFTER = "#00529c"; // primary — used on line
const TOOLTIP_AFTER = "#60a5fa"; // blue-400 — readable on dark tooltip bg

type Mode = "reducePayment" | "reduceTerm";

const FREQ_DEFAULTS: Record<PrepayFrequency, number> = {
  once: 200_000,
  monthly: 3_000,
  yearly: 50_000,
};

const FREQ_BOUNDS: Record<PrepayFrequency, { min: number; max: number; step: number }> = {
  once: { min: 10_000, max: 5_000_000, step: 10_000 },
  monthly: { min: 500, max: 50_000, step: 500 },
  yearly: { min: 5_000, max: 500_000, step: 5_000 },
};

const FREQ_LABEL: Record<PrepayFrequency, string> = {
  once: "จำนวนเงินที่จะโปะ (ครั้งเดียว)",
  monthly: "จำนวนเงินที่จะโปะ (ต่อเดือน เพิ่มจากค่างวด)",
  yearly: "จำนวนเงินที่จะโปะ (ต่อปี)",
};

const FREQ_TAB_LABEL: Record<PrepayFrequency, string> = {
  once: "โปะครั้งเดียว",
  monthly: "โปะรายเดือน",
  yearly: "โปะรายปี",
};

export default function PrepaymentCalculator() {
  const [balance, setBalance] = useState(2_500_000);
  const [annualRate, setAnnualRate] = useState(5);
  const [remainingYears, setRemainingYears] = useState(25);
  const [frequency, setFrequency] = useState<PrepayFrequency>("once");
  const [prepayAmount, setPrepayAmount] = useState(FREQ_DEFAULTS.once);
  const [mode, setMode] = useState<Mode>("reduceTerm");

  // Reset prepay amount to a sensible default when frequency changes
  useEffect(() => {
    setPrepayAmount(FREQ_DEFAULTS[frequency]);
  }, [frequency]);

  const firedRef = useRef(false);
  const skipInitialRef = useRef(true);
  useEffect(() => {
    if (skipInitialRef.current) {
      skipInitialRef.current = false;
      return;
    }
    if (firedRef.current) return;
    const timer = setTimeout(() => {
      Analytics.calculatorUsed("prepayment");
      firedRef.current = true;
    }, 2000);
    return () => clearTimeout(timer);
  }, [balance, annualRate, remainingYears, prepayAmount, frequency, mode]);

  const result = useMemo(
    () =>
      calculatePrepaymentScenario({
        balance,
        annualRate,
        remainingYears,
        prepayAmount,
        prepayFrequency: frequency,
        mode,
      }),
    [balance, annualRate, remainingYears, prepayAmount, frequency, mode],
  );

  // Sample comparison data — yearly buckets keep the chart responsive
  const chartData = useMemo(() => {
    const step = Math.max(1, Math.floor(result.comparison.length / 60));
    return result.comparison
      .filter((row, i) => i % step === 0 || i === result.comparison.length - 1)
      .map((row) => ({
        year: +(row.month / 12).toFixed(1),
        before: Math.round(row.before),
        after: Math.round(row.after),
      }));
  }, [result.comparison]);

  const oldRemainingMonths = Math.round(remainingYears * 12);
  const bounds = FREQ_BOUNDS[frequency];
  // Cap one-time prepay at the current balance so the input never exceeds the loan
  const onceMax = Math.max(FREQ_BOUNDS.once.min, Math.min(FREQ_BOUNDS.once.max, balance));
  const effectiveMax = frequency === "once" ? onceMax : bounds.max;
  // Mode toggle only meaningful for "once" — monthly/yearly always behave as reduce-term
  const showModeToggle = frequency === "once";

  const yearsSaved = Math.floor(result.monthsSaved / 12);
  const monthsSavedRemainder = result.monthsSaved % 12;
  const timeSavedLabel =
    result.monthsSaved === 0
      ? "—"
      : yearsSaved > 0
        ? `${yearsSaved} ปี ${monthsSavedRemainder} เดือน`
        : `${result.monthsSaved} เดือน`;

  const freqSuffix =
    frequency === "monthly"
      ? "/เดือน"
      : frequency === "yearly"
        ? "/ปี"
        : " (ครั้งเดียว)";

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
          id="export-prepayment-result"
          title="ผลการโปะบ้าน"
          subtitle={`ยอดหนี้คงเหลือ ${formatTHB(balance)} · ${remainingYears} ปี`}
          inputs={[
            { label: "ยอดหนี้คงเหลือ", value: `${formatNumber(balance)} บาท` },
            { label: "ดอกเบี้ย", value: `${annualRate.toFixed(2)}% ต่อปี` },
            { label: "ระยะเวลาคงเหลือ", value: `${remainingYears} ปี` },
            { label: "ความถี่ในการโปะ", value: FREQ_TAB_LABEL[frequency] },
            {
              label: "จำนวนเงินที่โปะ",
              value: `${formatNumber(prepayAmount)} บาท${freqSuffix}`,
            },
          ]}
          results={[
            {
              label: "ประหยัดดอกเบี้ย",
              value: `${formatNumber(result.interestSaved)} บาท`,
              highlight: true,
            },
            { label: "ผ่อนหมดเร็วขึ้น", value: timeSavedLabel, highlight: true },
            {
              label: "ค่างวดเดิม → ใหม่",
              value: `${formatNumber(result.baselinePayment)} → ${formatNumber(result.effectiveMonthlyPayment)} บาท`,
            },
            {
              label: "โปะรวมตลอดสัญญา",
              value: `${formatNumber(result.totalPrepaid)} บาท`,
            },
          ]}
          toolUrl="phonbaan.com/pho-baan"
        />
      </div>

    <section
      aria-label="เครื่องคำนวณโปะบ้าน"
      className="rounded-3xl border border-line bg-white/70 p-5 shadow-sm md:p-8"
    >
      {/* Frequency tabs */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
          ความถี่ในการโปะ
        </p>
        <div className="inline-flex flex-wrap gap-2 rounded-xl border border-line bg-bg/40 p-1">
          {(Object.keys(FREQ_TAB_LABEL) as PrepayFrequency[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFrequency(f)}
              className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                frequency === f
                  ? "bg-accent text-white shadow-sm"
                  : "text-ink-soft hover:text-accent"
              }`}
              aria-pressed={frequency === f}
            >
              {FREQ_TAB_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Mode tabs — only for one-time prepayment */}
      {showModeToggle && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("reduceTerm")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              mode === "reduceTerm"
                ? "bg-accent text-white shadow-sm"
                : "border border-line bg-white text-ink-soft hover:border-accent/40 hover:text-accent"
            }`}
            aria-pressed={mode === "reduceTerm"}
          >
            ลดระยะเวลาผ่อน
          </button>
          <button
            type="button"
            onClick={() => setMode("reducePayment")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              mode === "reducePayment"
                ? "bg-accent text-white shadow-sm"
                : "border border-line bg-white text-ink-soft hover:border-accent/40 hover:text-accent"
            }`}
            aria-pressed={mode === "reducePayment"}
          >
            ลดค่างวด
          </button>
        </div>
      )}
      <p className="mb-6 text-xs text-ink-soft md:text-sm">
        {frequency === "once"
          ? mode === "reduceTerm"
            ? "คงค่างวดเดิม → ผ่อนหมดเร็วขึ้น (ประหยัดดอกเบี้ยรวมได้มากกว่า)"
            : "คงระยะเวลาเดิม → ค่างวดถูกลง (มีเงินเหลือเพิ่มทุกเดือน)"
          : frequency === "monthly"
            ? "เพิ่มเงินทุกเดือนเข้าค่างวด → ผ่อนหมดเร็วและประหยัดดอกเบี้ยมาก"
            : "เก็บเงินทั้งปีโปะทีเดียวทุก 12 เดือน → เหมาะกับคนได้โบนัสปลายปี"}
      </p>

      {/* Inputs */}
      <div className="grid gap-6 md:grid-cols-2">
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
          label="อัตราดอกเบี้ยปัจจุบัน"
          unit="% ต่อปี"
          value={annualRate}
          onChange={setAnnualRate}
          min={0.5}
          max={10}
          step={0.05}
          format={(n) => n.toFixed(2)}
        />
        <SliderInput
          label="ระยะเวลาคงเหลือ"
          unit="ปี"
          value={remainingYears}
          onChange={setRemainingYears}
          min={1}
          max={40}
          step={1}
          format={(n) => String(Math.round(n))}
          hint={`ค่างวดปัจจุบันโดยประมาณ: ${formatTHB(result.baselinePayment)}/เดือน`}
        />
        <SliderInput
          label={FREQ_LABEL[frequency]}
          unit="บาท"
          value={prepayAmount}
          onChange={setPrepayAmount}
          min={bounds.min}
          max={effectiveMax}
          step={bounds.step}
        />
      </div>

      {/* Hero saving */}
      <div className="mt-8 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-6 py-7 md:px-10 md:py-9">
        <p className="text-sm font-medium text-emerald-700">
          ประหยัดดอกเบี้ยได้
        </p>
        <p
          className="mt-2 font-mono text-4xl font-bold tracking-tight text-emerald-700 md:text-6xl"
          aria-live="polite"
        >
          {formatNumber(result.interestSaved)}
          <span className="ml-2 text-xl font-medium text-emerald-700/80 md:text-2xl">
            บาท
          </span>
        </p>
        <p className="mt-3 text-xs text-emerald-800/85 md:text-sm">
          {frequency === "once" && mode === "reducePayment"
            ? `ค่างวดใหม่ลดลง ${formatTHB(Math.max(0, result.baselinePayment - result.effectiveMonthlyPayment))}/เดือน`
            : result.monthsSaved > 0
              ? `ผ่อนหมดเร็วขึ้น ${result.monthsSaved} เดือน (~${(result.monthsSaved / 12).toFixed(1)} ปี)`
              : "ยังไม่ประหยัดเวลา ลองเพิ่มจำนวนเงินที่จะโปะ"}
        </p>
        <p className="mt-2 text-xs text-emerald-800/70 md:text-sm">
          โปะรวมตลอดสัญญา: {formatTHB(result.totalPrepaid)}
        </p>
      </div>

      {/* Side-by-side cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-bg/60 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
            ก่อนโปะ
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li className="flex justify-between">
              <span>ยอดหนี้</span>
              <span className="font-mono font-semibold text-ink">
                {formatNumber(balance)} บาท
              </span>
            </li>
            <li className="flex justify-between">
              <span>ค่างวดต่อเดือน</span>
              <span className="font-mono font-semibold text-ink">
                {formatNumber(result.baselinePayment)} บาท
              </span>
            </li>
            <li className="flex justify-between">
              <span>ระยะเวลาคงเหลือ</span>
              <span className="font-mono font-semibold text-ink">
                {oldRemainingMonths} เดือน
              </span>
            </li>
            <li className="flex justify-between border-t border-line pt-2">
              <span>ดอกเบี้ยที่จะจ่าย</span>
              <span className="font-mono font-semibold text-gold">
                {formatNumber(result.totalInterestBefore)} บาท
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-accent/40 bg-accent/5 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            หลังโปะ
            {frequency === "once"
              ? ` ${formatTHB(prepayAmount)}`
              : frequency === "monthly"
                ? ` ${formatTHB(prepayAmount)}/เดือน`
                : ` ${formatTHB(prepayAmount)}/ปี`}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li className="flex justify-between">
              <span>{frequency === "monthly" ? "ค่างวดรวม (รวมโปะ)" : "ค่างวดต่อเดือน"}</span>
              <span className="font-mono font-semibold text-ink">
                {formatNumber(result.effectiveMonthlyPayment)} บาท
              </span>
            </li>
            <li className="flex justify-between">
              <span>ระยะเวลาคงเหลือ</span>
              <span className="font-mono font-semibold text-ink">
                {result.newRemainingMonths} เดือน
                {result.monthsSaved > 0 && (
                  <span className="ml-1 text-xs text-emerald-700">
                    (−{result.monthsSaved})
                  </span>
                )}
              </span>
            </li>
            <li className="flex justify-between">
              <span>โปะรวมตลอดสัญญา</span>
              <span className="font-mono font-semibold text-ink">
                {formatNumber(result.totalPrepaid)} บาท
              </span>
            </li>
            <li className="flex justify-between border-t border-accent/20 pt-2">
              <span>ดอกเบี้ยที่จะจ่าย</span>
              <span className="font-mono font-semibold text-accent">
                {formatNumber(result.totalInterestAfter)} บาท
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <ExportButton
          targetId="export-prepayment-result"
          filenamePrefix="phonbaan-prepayment"
          analyticsType="prepayment"
        />
      </div>

      {/* Comparison chart */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-ink md:text-lg">
          ยอดหนี้คงเหลือ — เปรียบเทียบก่อนและหลังโปะ
        </h3>
        <p className="mt-1 text-xs text-ink-soft">
          เส้นน้ำเงินคือยอดหนี้หลังโปะ จะลดลงเร็วกว่าเส้นเหลือง (กรณีไม่โปะ)
        </p>
        <div className="mt-4 h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d6dfeb" />
              <XAxis
                dataKey="year"
                tickFormatter={(v) => `${v}`}
                stroke="#36475c"
                fontSize={11}
                label={{
                  value: "ปีที่",
                  position: "insideBottom",
                  fontSize: 11,
                  offset: -2,
                }}
              />
              <YAxis
                tickFormatter={(v) => formatNumberShort(v as number)}
                stroke="#36475c"
                fontSize={11}
              />
              <Tooltip
                content={
                  <ChartTooltip
                    labelPrefix="ปีที่ "
                    colorMap={{
                      "ก่อนโปะ": COLOR_BEFORE,
                      "หลังโปะ": TOOLTIP_AFTER,
                    }}
                  />
                }
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Line
                type="monotone"
                dataKey="before"
                name="ก่อนโปะ"
                stroke={COLOR_BEFORE}
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="after"
                name="หลังโปะ"
                stroke={COLOR_AFTER}
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
    </>
  );
}
