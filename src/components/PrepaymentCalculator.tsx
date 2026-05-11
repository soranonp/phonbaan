"use client";

import { useMemo, useState } from "react";
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
  calculateMonthlyPayment,
  calculatePrepayment,
} from "@/lib/calculations";
import { formatNumber, formatNumberShort, formatTHB } from "@/lib/format";
import ChartTooltip from "@/components/charts/ChartTooltip";
import SliderInput from "@/components/SliderInput";

const COLOR_BEFORE = "#ffb81c";
const COLOR_AFTER = "#00529c";

type Mode = "reducePayment" | "reduceTerm";

export default function PrepaymentCalculator() {
  const [balance, setBalance] = useState(2_500_000);
  const [annualRate, setAnnualRate] = useState(5);
  const [remainingYears, setRemainingYears] = useState(25);
  const [lumpSum, setLumpSum] = useState(300_000);
  const [mode, setMode] = useState<Mode>("reduceTerm");

  // Auto-derive baseline payment from balance/rate/years.
  // User cannot override directly — keeps the math consistent and the form simpler.
  const currentPayment = useMemo(
    () => calculateMonthlyPayment(balance, annualRate, remainingYears),
    [balance, annualRate, remainingYears],
  );

  const result = useMemo(
    () =>
      calculatePrepayment({
        balance,
        annualRate,
        remainingYears,
        currentPayment,
        lumpSum,
        mode,
      }),
    [balance, annualRate, remainingYears, currentPayment, lumpSum, mode],
  );

  // Sample comparison data — too many monthly points slow the chart, so step to yearly
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

  const newRemainingYears = result.newRemainingMonths / 12;
  const oldRemainingMonths = Math.round(remainingYears * 12);

  return (
    <section
      aria-label="เครื่องคำนวณโปะบ้าน"
      className="rounded-3xl border border-line bg-white/70 p-5 shadow-sm md:p-8"
    >
      {/* Mode tabs */}
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
      <p className="-mt-4 mb-6 text-xs text-ink-soft md:text-sm">
        {mode === "reduceTerm"
          ? "คงค่างวดเดิม → ผ่อนหมดเร็วขึ้น (ประหยัดดอกเบี้ยรวมได้มากกว่า)"
          : "คงระยะเวลาเดิม → ค่างวดถูกลง (มีเงินเหลือเพิ่มทุกเดือน)"}
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
          hint={`ค่างวดปัจจุบันโดยประมาณ: ${formatTHB(currentPayment)}/เดือน`}
        />
        <SliderInput
          label="จำนวนเงินที่จะโปะ"
          unit="บาท"
          value={lumpSum}
          onChange={setLumpSum}
          min={10_000}
          max={Math.max(50_000, balance)}
          step={10_000}
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
          {mode === "reduceTerm"
            ? result.monthsSaved > 0
              ? `ผ่อนหมดเร็วขึ้น ${result.monthsSaved} เดือน (~${(result.monthsSaved / 12).toFixed(1)} ปี)`
              : "ยังไม่ประหยัดเวลา ลองเพิ่มจำนวนเงินที่จะโปะ"
            : `ค่างวดใหม่ลดลง ${formatTHB(Math.max(0, currentPayment - result.newPayment))}/เดือน`}
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
                {formatNumber(currentPayment)} บาท
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
            หลังโปะ {formatTHB(lumpSum)}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li className="flex justify-between">
              <span>ยอดหนี้ใหม่</span>
              <span className="font-mono font-semibold text-ink">
                {formatNumber(Math.max(0, balance - lumpSum))} บาท
              </span>
            </li>
            <li className="flex justify-between">
              <span>ค่างวดต่อเดือน</span>
              <span className="font-mono font-semibold text-ink">
                {formatNumber(result.newPayment)} บาท
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
            <li className="flex justify-between border-t border-accent/20 pt-2">
              <span>ดอกเบี้ยที่จะจ่าย</span>
              <span className="font-mono font-semibold text-accent">
                {formatNumber(result.totalInterestAfter)} บาท
              </span>
            </li>
          </ul>
        </div>
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
                      "หลังโปะ": COLOR_AFTER,
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
  );
}
