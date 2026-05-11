/**
 * Home loan calculations — PMT-based amortization.
 * All inputs in Thai-style units: amount in baht, rate as annual % (e.g. 3.5 = 3.5%/yr), term in years.
 * Edge cases (zero/negative/NaN) return 0 or empty arrays.
 */

const isValid = (...values: number[]): boolean =>
  values.every((v) => Number.isFinite(v) && v > 0);

/**
 * คำนวณค่างวดต่อเดือน (THB) ตามสูตร PMT มาตรฐาน
 * M = P × [r(1+r)^n] / [(1+r)^n − 1]
 */
export const calculateMonthlyPayment = (
  loanAmount: number,
  annualRate: number,
  years: number,
): number => {
  if (!Number.isFinite(loanAmount) || loanAmount <= 0) return 0;
  if (!Number.isFinite(years) || years <= 0) return 0;
  if (!Number.isFinite(annualRate) || annualRate < 0) return 0;

  const n = Math.round(years * 12);
  if (n <= 0) return 0;

  // Zero-interest loan → equal split
  if (annualRate === 0) return loanAmount / n;

  const r = annualRate / 100 / 12;
  const factor = Math.pow(1 + r, n);
  const payment = (loanAmount * r * factor) / (factor - 1);
  return Number.isFinite(payment) ? payment : 0;
};

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/**
 * สร้างตารางผ่อนรายเดือนตลอดอายุสินเชื่อ (interest-then-principal split)
 */
export const calculateAmortizationSchedule = (
  loanAmount: number,
  annualRate: number,
  years: number,
): AmortizationRow[] => {
  if (!isValid(loanAmount, years)) return [];
  if (!Number.isFinite(annualRate) || annualRate < 0) return [];

  const n = Math.round(years * 12);
  if (n <= 0) return [];

  const payment = calculateMonthlyPayment(loanAmount, annualRate, years);
  if (payment <= 0) return [];

  const r = annualRate / 100 / 12;
  const rows: AmortizationRow[] = [];
  let balance = loanAmount;

  for (let month = 1; month <= n; month++) {
    const interest = balance * r;
    let principal = payment - interest;
    // Final payment correction to avoid tiny residual due to rounding
    if (month === n) principal = balance;
    balance = Math.max(0, balance - principal);
    rows.push({
      month,
      payment: principal + interest,
      principal,
      interest,
      balance,
    });
  }
  return rows;
};

/**
 * ดอกเบี้ยรวมตลอดอายุสินเชื่อ (THB)
 */
export const calculateTotalInterest = (
  loanAmount: number,
  annualRate: number,
  years: number,
): number => {
  const payment = calculateMonthlyPayment(loanAmount, annualRate, years);
  if (payment <= 0) return 0;
  const n = Math.round(years * 12);
  const total = payment * n - loanAmount;
  return total > 0 ? total : 0;
};

/**
 * คำนวณวงเงินกู้สูงสุดจากรายได้ต่อเดือน
 * ตามเกณฑ์ debt service ratio ของธนาคารไทย (ค่าเริ่มต้น 40% ของรายได้)
 * อิงสมมติฐาน: ดอกเบี้ย 6%/ปี ระยะเวลา 30 ปี (เกณฑ์อนุรักษ์นิยมที่ธนาคารมักใช้ stress test)
 */
export const calculateMaxLoanFromIncome = (
  monthlyIncome: number,
  debtRatio = 0.4,
): number => {
  if (!Number.isFinite(monthlyIncome) || monthlyIncome <= 0) return 0;
  if (!Number.isFinite(debtRatio) || debtRatio <= 0) return 0;

  const maxPayment = monthlyIncome * debtRatio;
  const assumedRate = 6;
  const assumedYears = 30;
  const r = assumedRate / 100 / 12;
  const n = assumedYears * 12;
  const factor = Math.pow(1 + r, n);
  const maxLoan = (maxPayment * (factor - 1)) / (r * factor);
  return Number.isFinite(maxLoan) && maxLoan > 0 ? maxLoan : 0;
};
