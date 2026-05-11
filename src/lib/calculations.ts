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

/**
 * คำนวณวงเงินกู้สูงสุดแบบยืดหยุ่น — รองรับ DSR ตามอาชีพ, ภาระหนี้เดิม, ดอกเบี้ย, ระยะเวลา
 * Returns the max loan principal that produces a monthly payment ≤ available capacity.
 */
export const calculateMaxLoanDetailed = (params: {
  monthlyIncome: number;
  existingDebt?: number;
  debtRatio?: number;
  annualRate: number;
  years: number;
}): { maxLoan: number; maxPayment: number } => {
  const {
    monthlyIncome,
    existingDebt = 0,
    debtRatio = 0.4,
    annualRate,
    years,
  } = params;

  if (!Number.isFinite(monthlyIncome) || monthlyIncome <= 0)
    return { maxLoan: 0, maxPayment: 0 };
  if (!Number.isFinite(years) || years <= 0)
    return { maxLoan: 0, maxPayment: 0 };

  const maxPayment = Math.max(0, monthlyIncome * debtRatio - (existingDebt || 0));
  if (maxPayment <= 0) return { maxLoan: 0, maxPayment: 0 };

  const n = Math.round(years * 12);
  if (annualRate === 0) return { maxLoan: maxPayment * n, maxPayment };

  const r = annualRate / 100 / 12;
  const factor = Math.pow(1 + r, n);
  const maxLoan = (maxPayment * (factor - 1)) / (r * factor);
  return {
    maxLoan: Number.isFinite(maxLoan) && maxLoan > 0 ? maxLoan : 0,
    maxPayment,
  };
};

export interface PrepaymentResult {
  /** ค่างวดใหม่หลังโปะ (mode=reducePayment เปลี่ยน, mode=reduceTerm คงเดิม) */
  newPayment: number;
  /** จำนวนงวดที่เหลือหลังโปะ */
  newRemainingMonths: number;
  /** จำนวนงวดที่ผ่อนหมดเร็วขึ้น (>0 ใน mode reduceTerm) */
  monthsSaved: number;
  /** ดอกเบี้ยรวมที่ต้องจ่ายต่อไปก่อนโปะ */
  totalInterestBefore: number;
  /** ดอกเบี้ยรวมที่ต้องจ่ายต่อไปหลังโปะ */
  totalInterestAfter: number;
  /** ดอกเบี้ยที่ประหยัดได้ */
  interestSaved: number;
  /** ตารางเทียบยอดหนี้คงเหลือต่อเดือน */
  comparison: { month: number; before: number; after: number }[];
}

const balanceSchedule = (
  balance: number,
  monthlyRate: number,
  payment: number,
  maxMonths: number,
): { month: number; balance: number }[] => {
  const rows: { month: number; balance: number }[] = [];
  let b = balance;
  for (let m = 1; m <= maxMonths; m++) {
    const interest = b * monthlyRate;
    const principal = Math.max(0, payment - interest);
    b = Math.max(0, b - principal);
    rows.push({ month: m, balance: b });
    if (b <= 0) break;
  }
  return rows;
};

/**
 * คำนวณผลของการโปะเงินก้อน (lump-sum prepayment)
 * mode='reducePayment' = คงระยะเวลาเดิม ลดค่างวด
 * mode='reduceTerm'    = คงค่างวดเดิม ลดระยะเวลา
 */
export const calculatePrepayment = (params: {
  balance: number;
  annualRate: number;
  remainingYears: number;
  currentPayment: number;
  lumpSum: number;
  mode: "reducePayment" | "reduceTerm";
}): PrepaymentResult => {
  const empty: PrepaymentResult = {
    newPayment: 0,
    newRemainingMonths: 0,
    monthsSaved: 0,
    totalInterestBefore: 0,
    totalInterestAfter: 0,
    interestSaved: 0,
    comparison: [],
  };

  const { balance, annualRate, remainingYears, currentPayment, lumpSum, mode } =
    params;

  if (!isValid(balance, remainingYears, currentPayment)) return empty;
  if (!Number.isFinite(annualRate) || annualRate < 0) return empty;
  if (!Number.isFinite(lumpSum) || lumpSum < 0) return empty;

  const r = annualRate / 100 / 12;
  const nRem = Math.round(remainingYears * 12);
  if (nRem <= 0) return empty;

  // Cap lump sum at the outstanding balance
  const lump = Math.min(lumpSum, balance);
  const newBalance = balance - lump;

  let newPayment = currentPayment;
  let newN = nRem;

  if (newBalance > 0) {
    if (mode === "reducePayment") {
      newPayment = calculateMonthlyPayment(newBalance, annualRate, remainingYears);
      newN = nRem;
    } else {
      // reduceTerm: solve for n given payment, balance, r
      if (r === 0) {
        newN = Math.ceil(newBalance / currentPayment);
      } else {
        const numerator = Math.log(1 - (newBalance * r) / currentPayment);
        const denom = Math.log(1 + r);
        if (!Number.isFinite(numerator) || denom === 0) {
          // Payment too low to cover interest — fall back to current term
          newN = nRem;
        } else {
          newN = Math.ceil(-numerator / denom);
          if (!Number.isFinite(newN) || newN <= 0) newN = nRem;
        }
      }
      newPayment = currentPayment;
    }
  } else {
    // Lump sum >= balance: paid off
    newN = 0;
    newPayment = 0;
  }

  const totalInterestBefore = Math.max(0, currentPayment * nRem - balance);
  const totalInterestAfter =
    newN === 0 ? 0 : Math.max(0, newPayment * newN - newBalance);
  const interestSaved = Math.max(0, totalInterestBefore - totalInterestAfter);
  const monthsSaved = Math.max(0, nRem - newN);

  // Build comparison schedule capped at the longer scenario
  const horizon = Math.max(nRem, newN || 0);
  const before = balanceSchedule(balance, r, currentPayment, horizon);
  const after =
    newN === 0
      ? [{ month: 1, balance: 0 }]
      : balanceSchedule(newBalance, r, newPayment, horizon);

  const beforeByMonth = new Map(before.map((row) => [row.month, row.balance]));
  const afterByMonth = new Map(after.map((row) => [row.month, row.balance]));
  const comparison: { month: number; before: number; after: number }[] = [];
  for (let m = 1; m <= horizon; m++) {
    comparison.push({
      month: m,
      before: beforeByMonth.get(m) ?? 0,
      after: afterByMonth.get(m) ?? 0,
    });
  }

  return {
    newPayment,
    newRemainingMonths: newN,
    monthsSaved,
    totalInterestBefore,
    totalInterestAfter,
    interestSaved,
    comparison,
  };
};

export interface RefinanceResult {
  /** ค่างวดเดิม */
  oldPayment: number;
  /** ค่างวดใหม่หลังรีไฟแนนซ์ */
  newPayment: number;
  /** ประหยัดต่อเดือน (อาจติดลบ) */
  monthlySaving: number;
  /** ดอกเบี้ยรวมแผนเดิม (อิงงวดคงเหลือ) */
  totalInterestOld: number;
  /** ดอกเบี้ยรวมแผนใหม่ (รวมค่ารีไฟแนนซ์) */
  totalInterestNew: number;
  /** ประหยัดสุทธิตลอดอายุสินเชื่อ (หักค่ารีไฟแนนซ์แล้ว) */
  totalSaving: number;
  /** จุดคุ้มทุน (เดือน) — null ถ้าไม่ประหยัดต่อเดือน */
  breakEvenMonths: number | null;
  /** คุ้มหรือไม่ (totalSaving > 0) */
  worthwhile: boolean;
}

/**
 * เปรียบเทียบสินเชื่อเดิมกับเงื่อนไขรีไฟแนนซ์ — รวมค่าใช้จ่ายในการรีไฟแนนซ์เข้าด้วย
 */
export const calculateRefinance = (params: {
  balance: number;
  oldRate: number;
  oldRemainingYears: number;
  newRate: number;
  newYears: number;
  refinanceCost?: number;
}): RefinanceResult => {
  const empty: RefinanceResult = {
    oldPayment: 0,
    newPayment: 0,
    monthlySaving: 0,
    totalInterestOld: 0,
    totalInterestNew: 0,
    totalSaving: 0,
    breakEvenMonths: null,
    worthwhile: false,
  };

  const {
    balance,
    oldRate,
    oldRemainingYears,
    newRate,
    newYears,
    refinanceCost = 0,
  } = params;

  if (!isValid(balance, oldRemainingYears, newYears)) return empty;

  const oldPayment = calculateMonthlyPayment(balance, oldRate, oldRemainingYears);
  const newPayment = calculateMonthlyPayment(balance, newRate, newYears);
  if (oldPayment <= 0 || newPayment <= 0) return empty;

  const nOld = Math.round(oldRemainingYears * 12);
  const nNew = Math.round(newYears * 12);

  const totalInterestOld = Math.max(0, oldPayment * nOld - balance);
  const totalInterestNew =
    Math.max(0, newPayment * nNew - balance) + Math.max(0, refinanceCost);
  const totalSaving = totalInterestOld - totalInterestNew;
  const monthlySaving = oldPayment - newPayment;
  const breakEvenMonths =
    monthlySaving > 0 && refinanceCost > 0
      ? Math.ceil(refinanceCost / monthlySaving)
      : monthlySaving > 0 && refinanceCost === 0
        ? 0
        : null;

  return {
    oldPayment,
    newPayment,
    monthlySaving,
    totalInterestOld,
    totalInterestNew,
    totalSaving,
    breakEvenMonths,
    worthwhile: totalSaving > 0,
  };
};
