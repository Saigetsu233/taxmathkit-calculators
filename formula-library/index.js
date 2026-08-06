/** Standalone, dependency-free formulas used by TaxMathKit's four priority calculators. */

const brackets2026 = {
  single: [[12400,.10],[50400,.12],[105700,.22],[201775,.24],[256225,.32],[640600,.35],[Infinity,.37]],
  joint: [[24800,.10],[100800,.12],[211400,.22],[403550,.24],[512450,.32],[768700,.35],[Infinity,.37]],
  head: [[17700,.10],[67450,.12],[105700,.22],[201750,.24],[256200,.32],[640600,.35],[Infinity,.37]],
  separate: [[12400,.10],[50400,.12],[105700,.22],[201775,.24],[256225,.32],[384350,.35],[Infinity,.37]],
};

const deductions2026 = { single: 16100, joint: 32200, head: 24150, separate: 16100 };

function nonNegative(name, value) {
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be a non-negative finite number`);
  return value;
}

export function progressiveTax(taxableIncome, brackets) {
  let remaining = nonNegative("taxableIncome", taxableIncome);
  let lower = 0;
  let tax = 0;
  for (const [ceiling, rate] of brackets) {
    const amount = Math.min(remaining, ceiling - lower);
    tax += Math.max(0, amount) * rate;
    remaining -= amount;
    if (remaining <= 0) break;
    lower = ceiling;
  }
  return tax;
}

export function calculateFederalIncomeTax({ grossIncome, adjustments = 0, itemizedDeductions = 0, credits = 0, filingStatus = "single" }) {
  for (const [name, value] of Object.entries({ grossIncome, adjustments, itemizedDeductions, credits })) nonNegative(name, value);
  if (!(filingStatus in brackets2026)) throw new RangeError("Unsupported filingStatus");
  const adjustedGrossIncome = Math.max(0, grossIncome - adjustments);
  const deduction = Math.max(deductions2026[filingStatus], itemizedDeductions);
  const taxableIncome = Math.max(0, adjustedGrossIncome - deduction);
  const taxBeforeCredits = progressiveTax(taxableIncome, brackets2026[filingStatus]);
  return { adjustedGrossIncome, deduction, taxableIncome, taxBeforeCredits, tax: Math.max(0, taxBeforeCredits - credits) };
}

export function calculateSelfEmploymentTax({ netProfit, w2SocialSecurityWages = 0, filingStatus = "single" }) {
  nonNegative("netProfit", netProfit); nonNegative("w2SocialSecurityWages", w2SocialSecurityWages);
  const seBase = netProfit * .9235;
  const socialSecurity = Math.min(seBase, Math.max(0, 184500 - w2SocialSecurityWages)) * .124;
  const medicare = seBase * .029;
  const threshold = filingStatus === "joint" ? 250000 : filingStatus === "separate" ? 125000 : 200000;
  const combinedExcess = Math.max(0, w2SocialSecurityWages + seBase - threshold);
  const wagesOnlyExcess = Math.max(0, w2SocialSecurityWages - threshold);
  const additionalMedicare = Math.max(0, combinedExcess - wagesOnlyExcess) * .009;
  return { seBase, socialSecurity, medicare, additionalMedicare, total: socialSecurity + medicare + additionalMedicare, deductibleHalf: (socialSecurity + medicare) / 2 };
}

export function calculate1099Tax({ revenue, businessExpenses = 0, w2Wages = 0, withholding = 0, filingStatus = "single" }) {
  for (const [name, value] of Object.entries({ revenue, businessExpenses, w2Wages, withholding })) nonNegative(name, value);
  const profit = Math.max(0, revenue - businessExpenses);
  const selfEmployment = calculateSelfEmploymentTax({ netProfit: profit, w2SocialSecurityWages: w2Wages, filingStatus });
  const incomeTax = calculateFederalIncomeTax({ grossIncome: w2Wages + profit, adjustments: selfEmployment.deductibleHalf, filingStatus }).tax;
  const totalFederal = incomeTax + selfEmployment.total;
  const remaining = Math.max(0, totalFederal - withholding);
  return { profit, selfEmployment, incomeTax, totalFederal, remaining, simpleQuarterlyReserve: remaining / 4 };
}

export function calculateSalesTax({ preTaxPrice, ratePercent }) {
  nonNegative("preTaxPrice", preTaxPrice); nonNegative("ratePercent", ratePercent);
  const tax = preTaxPrice * ratePercent / 100;
  return { preTaxPrice, tax, total: preTaxPrice + tax };
}
