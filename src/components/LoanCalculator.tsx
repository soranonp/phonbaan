"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  calculateAmortizationSchedule,
  calculateMonthlyPayment,
  calculateTotalInterest,
} from "@/lib/calculations";
import { formatNumber, formatNumberShort, formatTHB } from "@/lib/format";
import ChartTooltip from "@/components/charts/ChartTooltip";
import SliderInput from "@/components/SliderInput";

const COLOR_PRINCIPAL = "#00529c"; // primary — used on bar
const COLOR_INTEREST = "#ffb81c"; // accent gold — used on bar + tooltip
const TOOLTIP_PRINCIPAL = "#60a5fa"; // blue-400 — readable on dark tooltip bg

interface YearAggregate {
  year: number;
  principal: number;
  interest: number;
}

const aggregateByYear = (
  schedule: ReturnType<typeof calculateAmortizationSchedule>,
): YearAggregate[] => {
  const map = new Map<number, YearAggregate>();
  schedule.forEach((row) => {
    const year = Math.ceil(row.month / 12);
    const acc = map.get(year) ?? { year, principal: 0, interest: 0 };
    acc.principal += row.principal;
    acc.interest += row.interest;
    map.set(year, acc);
  });
  return Array.from(map.values()).sort((a, b) => a.year - b.year);
};

interface LoanCalculatorProps {
  initialLoan?: number;
  initialRate?: number;
  initialYears?: number;
}

export default function LoanCalculator({
  initialLoan = 3_000_000,
  initialRate = 3.5,
  initialYears = 30,
}: LoanCalculatorProps = {}) {
  const [loanAmount, setLoanAmount] = useState(initialLoan);
  const [annualRate, setAnnualRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);
  const [showAll, setShowAll] = useState(false);

  const monthlyPayment = useMemo(
    () => calculateMonthlyPayment(loanAmount, annualRate, years),
    [loanAmount, annualRate, years],
  );
  const totalInterest = useMemo(
    () => calculateTotalInterest(loanAmount, annualRate, years),
    [loanAmount, annualRate, years],
  );
  const schedule = useMemo(
    () => calculateAmortizationSchedule(loanAmount, annualRate, years),
    [loanAmount, annualRate, years],
  );
  const yearly = useMemo(() => aggregateByYear(schedule), [schedule]);
  const totalPaid = monthlyPayment * Math.round(years * 12);
  const visibleRows = showAll ? schedule : schedule.slice(0, 12);

  return (
    <section
      aria-label="เครื่องคำนวณค่างวดผ่อนบ้าน"
      className="rounded-3xl border border-line bg-white/70 p-5 shadow-sm md:p-8"
    >
      {/* Inputs */}
      <div className="grid gap-6 md:grid-cols-3">
        <SliderInput
          label="ยอดเงินกู้"
          unit="บาท"
          value={loanAmount}
          onChange={setLoanAmount}
          min={100_000}
          max={20_000_000}
          step={50_000}
        />
        <SliderInput
          label="อัตราดอกเบี้ย"
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
          max={40}
          step={1}
          format={(n) => String(Math.round(n))}
        />
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-accent to-accent-bright px-6 py-7 text-white shadow-md md:px-10 md:py-9">
          <p className="text-sm font-medium text-white/85">ค่างวดต่อเดือน</p>
          <p
            className="mt-2 font-mono text-4xl font-bold tracking-tight md:text-6xl"
            aria-live="polite"
          >
            {formatNumber(monthlyPayment)}
            <span className="ml-2 text-xl font-medium text-white/85 md:text-2xl">
              บาท
            </span>
          </p>
          <p className="mt-3 text-xs text-white/80 md:text-sm">
            คำนวณจากยอดกู้ {formatTHB(loanAmount)} ดอกเบี้ย{" "}
            {annualRate.toFixed(2)}% ต่อปี {Math.round(years)} ปี
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-gold/40 bg-gold-soft/30 px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
              ดอกเบี้ยรวม
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-ink md:text-3xl">
              {formatNumber(totalInterest)}{" "}
              <span className="text-base font-medium text-ink-soft">บาท</span>
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              ตลอดอายุสินเชื่อ {Math.round(years)} ปี
            </p>
          </div>
          <div className="rounded-2xl border-2 border-line bg-bg/60 px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-soft">
              ยอดผ่อนรวมทั้งหมด
            </p>
            <p className="mt-1 font-mono text-2xl font-bold text-ink md:text-3xl">
              {formatNumber(totalPaid)}{" "}
              <span className="text-base font-medium text-ink-soft">บาท</span>
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              เงินต้น + ดอกเบี้ย รวมทั้งหมด
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-ink md:text-lg">
          สัดส่วนเงินต้นและดอกเบี้ยที่จ่ายแต่ละปี
        </h3>
        <p className="mt-1 text-xs text-ink-soft">
          ในช่วงแรกดอกเบี้ยจะมากกว่าเงินต้น — เมื่อผ่อนไปนานๆ
          ดอกเบี้ยจะค่อยๆ ลดลงและเงินต้นเพิ่มขึ้น
        </p>
        <div className="mt-4 h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yearly}
              margin={{ top: 10, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d6dfeb" />
              <XAxis
                dataKey="year"
                tickFormatter={(v) => `ปี ${v}`}
                stroke="#36475c"
                fontSize={11}
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
                    showTotal
                    totalLabel="รวมจ่ายปีนี้"
                    colorMap={{
                      เงินต้น: TOOLTIP_PRINCIPAL,
                      ดอกเบี้ย: COLOR_INTEREST,
                    }}
                  />
                }
                cursor={{ fill: "rgba(0,82,156,0.06)" }}
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar
                dataKey="principal"
                name="เงินต้น"
                stackId="a"
                fill={COLOR_PRINCIPAL}
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="interest"
                name="ดอกเบี้ย"
                stackId="a"
                fill={COLOR_INTEREST}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Schedule table */}
      <div className="mt-8">
        <h3 className="text-base font-semibold text-ink md:text-lg">
          ตารางผ่อนรายเดือน
        </h3>
        <p className="mt-1 text-xs text-ink-soft">
          แสดง {showAll ? `ทั้งหมด ${schedule.length}` : "12"} งวดแรก
        </p>
        <div className="table-wrap mt-4">
          <table className="text-sm">
            <thead className="bg-accent/5 text-ink">
              <tr>
                <th className="px-3 py-3 text-left font-semibold">งวด</th>
                <th className="px-3 py-3 text-right font-semibold">ค่างวด</th>
                <th className="px-3 py-3 text-right font-semibold">เงินต้น</th>
                <th className="px-3 py-3 text-right font-semibold">ดอกเบี้ย</th>
                <th className="px-3 py-3 text-right font-semibold">
                  ยอดคงเหลือ
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.month} className="border-t border-line">
                  <td className="px-3 py-2 text-ink-soft">{row.month}</td>
                  <td className="px-3 py-2 text-right font-mono text-ink">
                    {formatNumber(row.payment)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-ink">
                    {formatNumber(row.principal)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-gold">
                    {formatNumber(row.interest)}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-ink-soft">
                    {formatNumber(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {schedule.length > 12 && (
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-white px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/5"
          >
            {showAll ? "ย่อตาราง" : `ดูตารางผ่อนทั้งหมด (${schedule.length} งวด)`}
          </button>
        )}
      </div>
    </section>
  );
}
