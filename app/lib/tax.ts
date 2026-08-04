export type FilingStatus = "single" | "joint" | "head" | "separate";
export type TaxYear = 2025 | 2026;

type Bracket = { upTo: number; rate: number };

const federalBrackets: Record<TaxYear, Record<FilingStatus, Bracket[]>> = {
  2025: {
    single: [
      { upTo: 11_925, rate: 0.10 }, { upTo: 48_475, rate: 0.12 },
      { upTo: 103_350, rate: 0.22 }, { upTo: 197_300, rate: 0.24 },
      { upTo: 250_525, rate: 0.32 }, { upTo: 626_350, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
    joint: [
      { upTo: 23_850, rate: 0.10 }, { upTo: 96_950, rate: 0.12 },
      { upTo: 206_700, rate: 0.22 }, { upTo: 394_600, rate: 0.24 },
      { upTo: 501_050, rate: 0.32 }, { upTo: 751_600, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
    head: [
      { upTo: 17_000, rate: 0.10 }, { upTo: 64_850, rate: 0.12 },
      { upTo: 103_350, rate: 0.22 }, { upTo: 197_300, rate: 0.24 },
      { upTo: 250_500, rate: 0.32 }, { upTo: 626_350, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
    separate: [
      { upTo: 11_925, rate: 0.10 }, { upTo: 48_475, rate: 0.12 },
      { upTo: 103_350, rate: 0.22 }, { upTo: 197_300, rate: 0.24 },
      { upTo: 250_525, rate: 0.32 }, { upTo: 375_800, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
  },
  2026: {
    single: [
      { upTo: 12_400, rate: 0.10 }, { upTo: 50_400, rate: 0.12 },
      { upTo: 105_700, rate: 0.22 }, { upTo: 201_775, rate: 0.24 },
      { upTo: 256_225, rate: 0.32 }, { upTo: 640_600, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
    joint: [
      { upTo: 24_800, rate: 0.10 }, { upTo: 100_800, rate: 0.12 },
      { upTo: 211_400, rate: 0.22 }, { upTo: 403_550, rate: 0.24 },
      { upTo: 512_450, rate: 0.32 }, { upTo: 768_700, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
    head: [
      { upTo: 17_700, rate: 0.10 }, { upTo: 67_450, rate: 0.12 },
      { upTo: 105_700, rate: 0.22 }, { upTo: 201_750, rate: 0.24 },
      { upTo: 256_200, rate: 0.32 }, { upTo: 640_600, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
    separate: [
      { upTo: 12_400, rate: 0.10 }, { upTo: 50_400, rate: 0.12 },
      { upTo: 105_700, rate: 0.22 }, { upTo: 201_775, rate: 0.24 },
      { upTo: 256_225, rate: 0.32 }, { upTo: 384_350, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
  },
};

const deductions: Record<TaxYear, Record<FilingStatus, number>> = {
  2025: { single: 15_750, joint: 31_500, head: 23_625, separate: 15_750 },
  2026: { single: 16_100, joint: 32_200, head: 24_150, separate: 16_100 },
};

const capitalGainsThresholds: Record<TaxYear, Record<FilingStatus, [number, number]>> = {
  2025: {
    single: [48_350, 533_400], joint: [96_700, 600_050],
    head: [64_750, 566_700], separate: [48_350, 300_000],
  },
  2026: {
    single: [49_450, 545_500], joint: [98_900, 613_700],
    head: [66_200, 579_600], separate: [49_450, 306_850],
  },
};

const california2025: Record<FilingStatus, Bracket[]> = {
  single: [
    { upTo: 11_079, rate: 0.01 }, { upTo: 26_264, rate: 0.02 },
    { upTo: 41_452, rate: 0.04 }, { upTo: 57_542, rate: 0.06 },
    { upTo: 72_724, rate: 0.08 }, { upTo: 371_479, rate: 0.093 },
    { upTo: 445_771, rate: 0.103 }, { upTo: 742_953, rate: 0.113 },
    { upTo: Infinity, rate: 0.123 },
  ],
  separate: [
    { upTo: 11_079, rate: 0.01 }, { upTo: 26_264, rate: 0.02 },
    { upTo: 41_452, rate: 0.04 }, { upTo: 57_542, rate: 0.06 },
    { upTo: 72_724, rate: 0.08 }, { upTo: 371_479, rate: 0.093 },
    { upTo: 445_771, rate: 0.103 }, { upTo: 742_953, rate: 0.113 },
    { upTo: Infinity, rate: 0.123 },
  ],
  joint: [
    { upTo: 22_158, rate: 0.01 }, { upTo: 52_528, rate: 0.02 },
    { upTo: 82_904, rate: 0.04 }, { upTo: 115_084, rate: 0.06 },
    { upTo: 145_448, rate: 0.08 }, { upTo: 742_958, rate: 0.093 },
    { upTo: 891_542, rate: 0.103 }, { upTo: 1_485_906, rate: 0.113 },
    { upTo: Infinity, rate: 0.123 },
  ],
  head: [
    { upTo: 22_173, rate: 0.01 }, { upTo: 52_530, rate: 0.02 },
    { upTo: 67_716, rate: 0.04 }, { upTo: 83_805, rate: 0.06 },
    { upTo: 98_990, rate: 0.08 }, { upTo: 505_208, rate: 0.093 },
    { upTo: 606_251, rate: 0.103 }, { upTo: 1_010_417, rate: 0.113 },
    { upTo: Infinity, rate: 0.123 },
  ],
};

export function progressiveTax(taxableIncome: number, brackets: Bracket[]) {
  let remaining = Math.max(0, taxableIncome);
  let lower = 0;
  let tax = 0;
  for (const bracket of brackets) {
    const width = bracket.upTo - lower;
    const inBracket = Math.min(remaining, width);
    tax += Math.max(0, inBracket) * bracket.rate;
    remaining -= inBracket;
    if (remaining <= 0) break;
    lower = bracket.upTo;
  }
  return tax;
}

export function standardDeduction(year: TaxYear, status: FilingStatus) {
  return deductions[year][status];
}

export function federalIncomeTax(taxableIncome: number, year: TaxYear, status: FilingStatus) {
  return progressiveTax(taxableIncome, federalBrackets[year][status]);
}

export function marginalFederalRate(taxableIncome: number, year: TaxYear, status: FilingStatus) {
  const bracket = federalBrackets[year][status].find((item) => taxableIncome <= item.upTo);
  return bracket?.rate ?? 0.37;
}

export function estimateFederalIncome(params: {
  grossIncome: number;
  adjustments?: number;
  itemizedDeductions?: number;
  credits?: number;
  year: TaxYear;
  status: FilingStatus;
}) {
  const adjustments = Math.max(0, params.adjustments ?? 0);
  const agi = Math.max(0, params.grossIncome - adjustments);
  const deduction = Math.max(standardDeduction(params.year, params.status), params.itemizedDeductions ?? 0);
  const taxableIncome = Math.max(0, agi - deduction);
  const taxBeforeCredits = federalIncomeTax(taxableIncome, params.year, params.status);
  const tax = Math.max(0, taxBeforeCredits - Math.max(0, params.credits ?? 0));
  return {
    agi,
    deduction,
    taxableIncome,
    tax,
    effectiveRate: params.grossIncome > 0 ? tax / params.grossIncome : 0,
    marginalRate: marginalFederalRate(taxableIncome, params.year, params.status),
    afterTaxIncome: Math.max(0, params.grossIncome - tax),
  };
}

export function employeeFica(annualWages: number) {
  const wages = Math.max(0, annualWages);
  const socialSecurity = Math.min(wages, 184_500) * 0.062;
  const medicare = wages * 0.0145;
  const additionalMedicare = Math.max(0, wages - 200_000) * 0.009;
  return { socialSecurity, medicare, additionalMedicare, total: socialSecurity + medicare + additionalMedicare };
}

export function selfEmploymentTax(netProfit: number, w2Wages: number, status: FilingStatus) {
  const seBase = Math.max(0, netProfit) * 0.9235;
  const socialSecurityRoom = Math.max(0, 184_500 - Math.max(0, w2Wages));
  const socialSecurity = Math.min(seBase, socialSecurityRoom) * 0.124;
  const medicare = seBase * 0.029;
  const threshold = status === "joint" ? 250_000 : status === "separate" ? 125_000 : 200_000;
  const combinedExcess = Math.max(0, Math.max(0, w2Wages) + seBase - threshold);
  const wagesOnlyExcess = Math.max(0, Math.max(0, w2Wages) - threshold);
  const additionalMedicare = Math.max(0, combinedExcess - wagesOnlyExcess) * 0.009;
  const total = socialSecurity + medicare + additionalMedicare;
  return { seBase, socialSecurity, medicare, additionalMedicare, total, deductibleHalf: (socialSecurity + medicare) / 2 };
}

export function longTermCapitalGainsTax(params: {
  ordinaryTaxableIncome: number;
  gain: number;
  year: TaxYear;
  status: FilingStatus;
}) {
  const ordinary = Math.max(0, params.ordinaryTaxableIncome);
  const gain = Math.max(0, params.gain);
  const [zeroCeiling, fifteenCeiling] = capitalGainsThresholds[params.year][params.status];
  const atZero = Math.min(gain, Math.max(0, zeroCeiling - ordinary));
  const afterZero = gain - atZero;
  const atFifteen = Math.min(afterZero, Math.max(0, fifteenCeiling - ordinary - atZero));
  const atTwenty = Math.max(0, afterZero - atFifteen);
  return { atZero, atFifteen, atTwenty, tax: atFifteen * 0.15 + atTwenty * 0.20 };
}

export function californiaIncomeTax2025(grossIncome: number, deductionsInput: number, status: FilingStatus) {
  const standard = status === "single" || status === "separate" ? 5_706 : 11_412;
  const deduction = Math.max(standard, Math.max(0, deductionsInput));
  const taxableIncome = Math.max(0, grossIncome - deduction);
  const tax = progressiveTax(taxableIncome, california2025[status]);
  return { deduction, taxableIncome, tax, effectiveRate: grossIncome > 0 ? tax / grossIncome : 0 };
}

export function money(value: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);
}

export function percent(value: number, digits = 1) {
  return `${(Number.isFinite(value) ? value * 100 : 0).toFixed(digits)}%`;
}
