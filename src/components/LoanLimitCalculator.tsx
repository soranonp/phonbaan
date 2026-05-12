"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  calculateMaxLoanDetailed,
  calculateMonthlyPayment,
} from "@/lib/calculations";
import { formatNumber, formatTHB } from "@/lib/format";
import SliderInput from "@/components/SliderInput";
import ResultCard from "@/components/ResultCard";
import ExportButton from "@/components/ExportButton";
import { Analytics } from "@/lib/analytics";

const OCCUPATIONS = [
  {
    value: "salaried",
    label: "พนักงานประจำ / ข้าราชการ",
    dsr: 0.4,
    note: "ธนาคารยอมรับสัดส่วนหนี้ต่อรายได้ 40%",
  },
  {
    value: "freelance",
    label: "ฟรีแลนซ์ / รายได้ไม่ประจำ",
    dsr: 0.35,
    note: "ธนาคารระวังมากกว่า มักให้ DSR 30-35%",
  },
  {
    value: "merchant",
    label: "ค้าขาย / เจ้าของกิจการ",
    dsr: 0.3,
    note: "ต้องใช้รายได้เฉลี่ย 6-12 เดือนล่าสุด DSR ~30%",
  },
] as const;

type Occupation = (typeof OCCUPATIONS)[number]["value"];

const MAX_AGE = 65;

export default function LoanLimitCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(30_000);
  const [existingDebt, setExistingDebt] = useState(0);
  const [age, setAge] = useState(30);
  const [occupation, setOccupation] = useState<Occupation>("salaried");
  const [annualRate, setAnnualRate] = useState(3.5);
  const [years, setYears] = useState(30);

  const maxYears = Math.max(5, MAX_AGE - age);
  const effectiveYears = Math.min(years, maxYears);
  const dsr = OCCUPATIONS.find((o) => o.value === occupation)?.dsr ?? 0.4;

  const result = useMemo(
    () =>
      calculateMaxLoanDetailed({
        monthlyIncome,
        existingDebt,
        debtRatio: dsr,
        annualRate,
        years: effectiveYears,
      }),
    [monthlyIncome, existingDebt, dsr, annualRate, effectiveYears],
  );

  const monthlyPayment = useMemo(
    () =>
      calculateMonthlyPayment(result.maxLoan, annualRate, effectiveYears),
    [result.maxLoan, annualRate, effectiveYears],
  );

  // Sensitivity table — ±20%/50% of income
  const scenarios = useMemo(() => {
    const ratios = [-0.5, -0.2, 0, 0.2, 0.5];
    return ratios.map((delta) => {
      const income = monthlyIncome * (1 + delta);
      const r = calculateMaxLoanDetailed({
        monthlyIncome: income,
        existingDebt,
        debtRatio: dsr,
        annualRate,
        years: effectiveYears,
      });
      return { delta, income, maxLoan: r.maxLoan };
    });
  }, [monthlyIncome, existingDebt, dsr, annualRate, effectiveYears]);

  const occLabel =
    OCCUPATIONS.find((o) => o.value === occupation)?.label ?? "พนักงานประจำ";

  const firedRef = useRef(false);
  const skipInitialRef = useRef(true);
  useEffect(() => {
    if (skipInitialRef.current) {
      skipInitialRef.current = false;
      return;
    }
    if (firedRef.current) return;
    const timer = setTimeout(() => {
      Analytics.calculatorUsed("loan-limit");
      firedRef.current = true;
    }, 2000);
    return () => clearTimeout(timer);
  }, [monthlyIncome, existingDebt, age, occupation, annualRate, years]);

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
          id="export-loan-limit-result"
          title="วงเงินกู้ที่อนุมัติได้"
          subtitle={`รายได้ ${formatTHB(monthlyIncome)}/เดือน · DSR ${Math.round(dsr * 100)}%`}
          inputs={[
            {
              label: "รายได้ต่อเดือน",
              value: `${formatNumber(monthlyIncome)} บาท`,
            },
            {
              label: "ภาระหนี้ปัจจุบัน",
              value: `${formatNumber(existingDebt)} บาท`,
            },
            { label: "อายุ", value: `${age} ปี` },
            { label: "อาชีพ", value: occLabel },
            { label: "ดอกเบี้ยคาดการณ์", value: `${annualRate.toFixed(2)}%` },
            {
              label: "ระยะเวลาผ่อน",
              value: `${effectiveYears} ปี`,
            },
          ]}
          results={[
            {
              label: "วงเงินกู้สูงสุด",
              value: `${formatNumber(result.maxLoan)} บาท`,
              highlight: true,
            },
            {
              label: "ค่างวดต่อเดือน",
              value: `${formatNumber(monthlyPayment)} บาท`,
            },
            {
              label: "เพดานค่างวดตามเกณฑ์",
              value: `${formatNumber(result.maxPayment)} บาท`,
            },
          ]}
          toolUrl="phonbaan.com/wong-ngern-ku"
        />
      </div>

    <section
      aria-label="เครื่องคำนวณวงเงินกู้บ้าน"
      className="rounded-3xl border border-line bg-white/70 p-5 shadow-sm md:p-8"
    >
      {/* Inputs */}
      <div className="grid gap-6 md:grid-cols-2">
        <SliderInput
          label="รายได้ต่อเดือน"
          unit="บาท"
          value={monthlyIncome}
          onChange={setMonthlyIncome}
          min={10_000}
          max={500_000}
          step={1_000}
        />
        <SliderInput
          label="ภาระหนี้ต่อเดือน (ปัจจุบัน)"
          unit="บาท"
          value={existingDebt}
          onChange={setExistingDebt}
          min={0}
          max={Math.max(50_000, monthlyIncome)}
          step={500}
          hint="รวมค่างวดบัตรเครดิต, สินเชื่อบุคคล, ผ่อนรถ ฯลฯ"
        />
        <SliderInput
          label="อายุปัจจุบัน"
          unit="ปี"
          value={age}
          onChange={setAge}
          min={20}
          max={60}
          step={1}
          format={(n) => String(Math.round(n))}
        />
        <div className="space-y-2">
          <label className="text-sm font-medium text-ink">อาชีพ</label>
          <select
            value={occupation}
            onChange={(e) => setOccupation(e.target.value as Occupation)}
            className="w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
          >
            {OCCUPATIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label} (DSR {Math.round(o.dsr * 100)}%)
              </option>
            ))}
          </select>
          <p className="text-[11px] text-ink-soft/80">
            {OCCUPATIONS.find((o) => o.value === occupation)?.note}
          </p>
        </div>
        <SliderInput
          label="ดอกเบี้ยคาดการณ์"
          unit="% ต่อปี"
          value={annualRate}
          onChange={setAnnualRate}
          min={0.5}
          max={10}
          step={0.05}
          format={(n) => n.toFixed(2)}
        />
        <SliderInput
          label="ระยะเวลาผ่อน"
          unit="ปี"
          value={years}
          onChange={setYears}
          min={1}
          max={maxYears}
          step={1}
          format={(n) => String(Math.round(n))}
          hint={`สูงสุด ${maxYears} ปี (อายุ ${age} + ${maxYears} ปี = ${age + maxYears} ปี ตามเกณฑ์ธนาคาร)`}
        />
      </div>

      {/* Result */}
      <div className="mt-8 grid gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-accent to-accent-bright px-6 py-7 text-white shadow-md md:px-10 md:py-9">
          <p className="text-sm font-medium text-white/85">
            วงเงินสูงสุดที่คุณกู้ได้
          </p>
          <p
            className="mt-2 font-mono text-4xl font-bold tracking-tight md:text-6xl"
            aria-live="polite"
          >
            {formatNumber(result.maxLoan)}
            <span className="ml-2 text-xl font-medium text-white/85 md:text-2xl">
              บาท
            </span>
          </p>
          <p className="mt-3 text-xs text-white/80 md:text-sm">
            ที่ DSR {Math.round(dsr * 100)}%, ดอกเบี้ย {annualRate.toFixed(2)}%,
            ระยะเวลา {effectiveYears} ปี
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-gold/40 bg-gold-soft/30 px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
              ค่างวดที่ต้องผ่อน
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-ink md:text-3xl">
              {formatNumber(monthlyPayment)}{" "}
              <span className="text-base font-medium text-ink-soft">บาท/เดือน</span>
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              ไม่เกิน {formatTHB(result.maxPayment)} ตามเกณฑ์ธนาคาร
            </p>
          </div>
          <div className="rounded-2xl border-2 border-line bg-bg/60 px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
              เงินคงเหลือใช้จ่ายต่อเดือน
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-ink md:text-3xl">
              {formatNumber(
                Math.max(0, monthlyIncome - existingDebt - monthlyPayment),
              )}{" "}
              <span className="text-base font-medium text-ink-soft">บาท</span>
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              หลังหักค่างวดบ้านและภาระหนี้เดิม
            </p>
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <ExportButton
            targetId="export-loan-limit-result"
            filenamePrefix="phonbaan-wong-ngern-ku"
            analyticsType="loan-limit"
          />
        </div>
      </div>

      {/* Sensitivity table */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-ink md:text-lg">
          ถ้ารายได้เปลี่ยน — จะกู้ได้เท่าไหร่?
        </h3>
        <p className="mt-1 text-xs text-ink-soft">
          ใช้วางแผนว่าหากเงินเดือนขึ้นหรือมีรายได้เสริม จะกู้เพิ่มได้แค่ไหน
        </p>
        <div className="table-wrap mt-4">
          <table className="text-sm">
            <thead className="bg-accent/5 text-ink">
              <tr>
                <th className="px-3 py-3 text-left font-semibold">
                  รายได้ต่อเดือน
                </th>
                <th className="px-3 py-3 text-right font-semibold">
                  ส่วนต่าง
                </th>
                <th className="px-3 py-3 text-right font-semibold">
                  วงเงินกู้สูงสุด
                </th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr
                  key={s.delta}
                  className={`border-t border-line ${
                    s.delta === 0 ? "bg-accent/5 font-semibold" : ""
                  }`}
                >
                  <td className="px-3 py-2 text-ink">
                    {formatNumber(s.income)} บาท
                  </td>
                  <td
                    className={`px-3 py-2 text-right font-mono ${
                      s.delta > 0
                        ? "text-emerald-700"
                        : s.delta < 0
                          ? "text-rose-600"
                          : "text-ink-soft"
                    }`}
                  >
                    {s.delta === 0
                      ? "ปัจจุบัน"
                      : `${s.delta > 0 ? "+" : ""}${Math.round(s.delta * 100)}%`}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-ink">
                    {formatNumber(s.maxLoan)} บาท
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </>
  );
}
