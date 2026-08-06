"use client";

import { useMemo, useState, type ReactNode } from "react";
import { trackAnalyticsEvent } from "./Analytics";
import {
  californiaIncomeTax2025,
  employeeFica,
  estimateFederalIncome,
  federalIncomeTax,
  longTermCapitalGainsTax,
  money,
  percent,
  selfEmploymentTax,
  standardDeduction,
  type FilingStatus,
  type TaxYear,
} from "../lib/tax";

type NumberInputProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  help?: string;
  suffix?: string;
  step?: number;
};

function NumberInput({ id, label, value, onChange, help, suffix, step = 100 }: NumberInputProps) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <span className="input-wrap">
        <span className="input-prefix">{suffix === "%" ? "" : "$"}</span>
        <input
          id={id}
          inputMode="decimal"
          min="0"
          step={step}
          type="number"
          value={value}
          onChange={(event) => onChange(Math.max(0, Number(event.target.value) || 0))}
        />
        {suffix ? <span className="input-suffix">{suffix}</span> : null}
      </span>
      {help ? <span className="field-help">{help}</span> : null}
    </label>
  );
}

function FilingSelect({ value, onChange }: { value: FilingStatus; onChange: (value: FilingStatus) => void }) {
  return (
    <label className="field" htmlFor="filing-status">
      <span className="field-label">Filing status</span>
      <select id="filing-status" value={value} onChange={(event) => onChange(event.target.value as FilingStatus)}>
        <option value="single">Single</option>
        <option value="joint">Married filing jointly</option>
        <option value="head">Head of household</option>
        <option value="separate">Married filing separately</option>
      </select>
    </label>
  );
}

function YearSelect({ value, onChange }: { value: TaxYear; onChange: (value: TaxYear) => void }) {
  return (
    <label className="field" htmlFor="tax-year">
      <span className="field-label">Tax year</span>
      <select id="tax-year" value={value} onChange={(event) => onChange(Number(event.target.value) as TaxYear)}>
        <option value={2026}>2026</option>
        <option value={2025}>2025</option>
      </select>
    </label>
  );
}

function Toggle({ checked, onChange, label, help }: { checked: boolean; onChange: (value: boolean) => void; label: string; help?: string }) {
  return (
    <label className="toggle-row">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span><strong>{label}</strong>{help ? <small>{help}</small> : null}</span>
    </label>
  );
}

function Metric({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={emphasis ? "metric metric-emphasis" : "metric"}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function CalculatorFrame({ children, results, note }: { children: ReactNode; results: ReactNode; note?: string }) {
  return (
    <div className="calculator-frame">
      <div className="calculator-inputs">
        <div className="calculator-kicker">Enter your numbers</div>
        <div className="field-grid">{children}</div>
      </div>
      <div className="calculator-results" aria-live="polite">
        <div className="calculator-kicker">Estimated result</div>
        <div className="metrics-grid">{results}</div>
        {note ? <p className="result-note">{note}</p> : null}
      </div>
    </div>
  );
}

type SavedField = { id: string; value: string; checked?: boolean };

function applySavedValue(element: HTMLInputElement | HTMLSelectElement, field: SavedField) {
  if (element instanceof HTMLInputElement && element.type === "checkbox") {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "checked")?.set;
    setter?.call(element, field.checked === true);
    element.dispatchEvent(new Event("change", { bubbles: true }));
    return;
  }
  const prototype = element instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
  setter?.call(element, field.value);
  element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? "change" : "input", { bubbles: true }));
}

function CalculatorUtilities({ slug }: { slug: string }) {
  const [status, setStatus] = useState("");
  const storageKey = `taxmathkit-inputs:${slug}`;

  function root() {
    return document.querySelector<HTMLElement>(`[data-calculator-root="${slug}"]`);
  }

  async function copyResult() {
    const metrics = Array.from(root()?.querySelectorAll<HTMLElement>(".metric") ?? []);
    const summary = metrics.map((metric) => {
      const label = metric.querySelector("span")?.textContent?.trim() ?? "Result";
      const value = metric.querySelector("strong")?.textContent?.trim() ?? "";
      return `${label}: ${value}`;
    }).join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      trackAnalyticsEvent("copy_result", slug);
      setStatus("Result copied");
    } catch {
      setStatus("Copy was blocked by the browser");
    }
  }

  function saveInputs() {
    try {
      const fields = Array.from(root()?.querySelectorAll<HTMLInputElement | HTMLSelectElement>("input[id], select[id]") ?? []).map((element) => ({
        id: element.id,
        value: element.value,
        ...(element instanceof HTMLInputElement && element.type === "checkbox" ? { checked: element.checked } : {}),
      }));
      window.localStorage.setItem(storageKey, JSON.stringify(fields));
      setStatus("Inputs saved on this device");
    } catch {
      setStatus("Local storage is unavailable");
    }
  }

  function restoreInputs() {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as SavedField[];
      for (const field of saved) {
        const element = root()?.querySelector<HTMLInputElement | HTMLSelectElement>(`#${CSS.escape(field.id)}`);
        if (element) applySavedValue(element, field);
      }
      setStatus(saved.length ? "Saved inputs restored" : "No saved inputs found");
    } catch {
      setStatus("Saved inputs could not be restored");
    }
  }

  return (
    <div className="calculator-utilities" aria-label="Calculator result actions">
      <button type="button" onClick={copyResult}>Copy result</button>
      <button type="button" onClick={() => window.print()}>Print result</button>
      <button type="button" onClick={saveInputs}>Save inputs locally</button>
      <button type="button" onClick={restoreInputs}>Restore saved inputs</button>
      <span aria-live="polite">{status || "Inputs stay in this browser and are never uploaded."}</span>
    </div>
  );
}

function IncomeTaxCalculator() {
  const [year, setYear] = useState<TaxYear>(2026);
  const [status, setStatus] = useState<FilingStatus>("single");
  const [gross, setGross] = useState(85_000);
  const [adjustments, setAdjustments] = useState(0);
  const [itemized, setItemized] = useState(0);
  const [credits, setCredits] = useState(0);
  const result = useMemo(() => estimateFederalIncome({ grossIncome: gross, adjustments, itemizedDeductions: itemized, credits, year, status }), [gross, adjustments, itemized, credits, year, status]);
  return (
    <CalculatorFrame
      note="Federal ordinary-income estimate before withholding. Credits and special taxes can change the final result."
      results={<>
        <Metric label="Estimated federal tax" value={money(result.tax)} emphasis />
        <Metric label="Taxable income" value={money(result.taxableIncome)} />
        <Metric label="Deduction used" value={money(result.deduction)} />
        <Metric label="Effective tax rate" value={percent(result.effectiveRate)} />
        <Metric label="Marginal bracket" value={percent(result.marginalRate, 0)} />
        <Metric label="Income after federal tax" value={money(result.afterTaxIncome)} />
      </>}
    >
      <YearSelect value={year} onChange={setYear} />
      <FilingSelect value={status} onChange={setStatus} />
      <NumberInput id="gross-income" label="Gross income" value={gross} onChange={setGross} />
      <NumberInput id="adjustments" label="Above-the-line adjustments" value={adjustments} onChange={setAdjustments} help="Retirement, HSA and other eligible adjustments entered by you." />
      <NumberInput id="itemized" label="Itemized deductions" value={itemized} onChange={setItemized} help={`Leave at $0 to use the ${year} standard deduction.`} />
      <NumberInput id="credits" label="Simple tax credits" value={credits} onChange={setCredits} />
    </CalculatorFrame>
  );
}

function PaycheckCalculator() {
  const [status, setStatus] = useState<FilingStatus>("single");
  const [salary, setSalary] = useState(72_000);
  const [pretax, setPretax] = useState(4_000);
  const [periods, setPeriods] = useState(26);
  const result = useMemo(() => {
    const federal = estimateFederalIncome({ grossIncome: salary, adjustments: pretax, year: 2026, status }).tax;
    const fica = employeeFica(salary);
    const annualNet = Math.max(0, salary - pretax - federal - fica.total);
    return { federal, fica, annualNet, perPaycheck: annualNet / periods };
  }, [salary, pretax, periods, status]);
  return (
    <CalculatorFrame note="Annualized planning estimate—not an exact Form W-4 or employer payroll calculation. State and local taxes are excluded." results={<>
      <Metric label="Estimated take-home / paycheck" value={money(result.perPaycheck, 2)} emphasis />
      <Metric label="Annual federal income tax" value={money(result.federal)} />
      <Metric label="Employee Social Security" value={money(result.fica.socialSecurity)} />
      <Metric label="Employee Medicare" value={money(result.fica.medicare + result.fica.additionalMedicare)} />
      <Metric label="Annual take-home" value={money(result.annualNet)} />
      <Metric label="Pay periods" value={String(periods)} />
    </>}>
      <FilingSelect value={status} onChange={setStatus} />
      <label className="field" htmlFor="pay-frequency"><span className="field-label">Pay frequency</span><select id="pay-frequency" value={periods} onChange={(event) => setPeriods(Number(event.target.value))}><option value={52}>Weekly</option><option value={26}>Biweekly</option><option value={24}>Semimonthly</option><option value={12}>Monthly</option></select></label>
      <NumberInput id="annual-salary" label="Annual gross salary" value={salary} onChange={setSalary} />
      <NumberInput id="pretax-deductions" label="Annual pre-tax deductions" value={pretax} onChange={setPretax} />
    </CalculatorFrame>
  );
}

function SalesTaxCalculator({ reverse = false }: { reverse?: boolean }) {
  const [amount, setAmount] = useState(reverse ? 108.25 : 100);
  const [rate, setRate] = useState(8.25);
  const result = useMemo(() => {
    if (reverse) {
      const net = amount / (1 + rate / 100);
      return { net, tax: amount - net, total: amount };
    }
    const tax = amount * rate / 100;
    return { net: amount, tax, total: amount + tax };
  }, [amount, rate, reverse]);
  return (
    <CalculatorFrame note="Use a verified combined rate. A ZIP code or statewide rate alone may not capture local districts, exemptions or sourcing rules." results={<>
      <Metric label="Pre-tax price" value={money(result.net, 2)} emphasis={reverse} />
      <Metric label="Sales tax" value={money(result.tax, 2)} />
      <Metric label="Tax-inclusive total" value={money(result.total, 2)} emphasis={!reverse} />
      <Metric label="Rate used" value={`${rate.toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}%`} />
    </>}>
      <NumberInput id="transaction-amount" label={reverse ? "Total paid (tax included)" : "Pre-tax price"} value={amount} onChange={setAmount} step={0.01} />
      <NumberInput id="sales-tax-rate" label="Combined sales tax rate" value={rate} onChange={setRate} suffix="%" step={0.01} />
    </CalculatorFrame>
  );
}

function CapitalGainsCalculator() {
  const [status, setStatus] = useState<FilingStatus>("single");
  const [ordinaryTaxable, setOrdinaryTaxable] = useState(70_000);
  const [gain, setGain] = useState(40_000);
  const [holding, setHolding] = useState<"long" | "short">("long");
  const [includeNiit, setIncludeNiit] = useState(false);
  const [magi, setMagi] = useState(110_000);
  const result = useMemo(() => {
    const long = longTermCapitalGainsTax({ ordinaryTaxableIncome: ordinaryTaxable, gain, year: 2026, status });
    const shortTax = federalIncomeTax(ordinaryTaxable + gain, 2026, status) - federalIncomeTax(ordinaryTaxable, 2026, status);
    const threshold = status === "joint" ? 250_000 : status === "separate" ? 125_000 : 200_000;
    const niit = includeNiit ? Math.min(gain, Math.max(0, magi - threshold)) * 0.038 : 0;
    const baseTax = holding === "long" ? long.tax : shortTax;
    return { ...long, baseTax, niit, total: baseTax + niit, effective: gain > 0 ? (baseTax + niit) / gain : 0 };
  }, [status, ordinaryTaxable, gain, holding, includeNiit, magi]);
  return (
    <CalculatorFrame note="Enter ordinary taxable income after deductions. State tax, loss carryovers, recapture and special gain categories are excluded." results={<>
      <Metric label="Estimated federal gain tax" value={money(result.total)} emphasis />
      <Metric label="Effective rate on gain" value={percent(result.effective)} />
      {holding === "long" ? <><Metric label="Gain taxed at 0%" value={money(result.atZero)} /><Metric label="Gain taxed at 15%" value={money(result.atFifteen)} /><Metric label="Gain taxed at 20%" value={money(result.atTwenty)} /></> : <Metric label="Treatment" value="Ordinary rates" />}
      {includeNiit ? <Metric label="Simplified NIIT" value={money(result.niit)} /> : null}
    </>}>
      <FilingSelect value={status} onChange={setStatus} />
      <label className="field" htmlFor="holding-period"><span className="field-label">Holding period</span><select id="holding-period" value={holding} onChange={(event) => setHolding(event.target.value as "long" | "short")}><option value="long">Long-term (more than one year)</option><option value="short">Short-term</option></select></label>
      <NumberInput id="ordinary-taxable" label="Ordinary taxable income before gain" value={ordinaryTaxable} onChange={setOrdinaryTaxable} />
      <NumberInput id="capital-gain" label="Net taxable capital gain" value={gain} onChange={setGain} />
      <Toggle checked={includeNiit} onChange={setIncludeNiit} label="Include simplified 3.8% NIIT estimate" help="Only the lesser of gain or MAGI above the filing threshold is used." />
      {includeNiit ? <NumberInput id="magi" label="Modified adjusted gross income" value={magi} onChange={setMagi} /> : null}
    </CalculatorFrame>
  );
}

function LotteryCalculator() {
  const [status, setStatus] = useState<FilingStatus>("single");
  const [prize, setPrize] = useState(1_000_000);
  const [otherIncome, setOtherIncome] = useState(80_000);
  const [stateRate, setStateRate] = useState(0);
  const result = useMemo(() => {
    const before = estimateFederalIncome({ grossIncome: otherIncome, year: 2026, status }).tax;
    const after = estimateFederalIncome({ grossIncome: otherIncome + prize, year: 2026, status }).tax;
    const federal = Math.max(0, after - before);
    const withholding = prize * 0.24;
    const state = prize * stateRate / 100;
    return { federal, withholding, state, extra: federal - withholding, net: prize - federal - state };
  }, [status, prize, otherIncome, stateRate]);
  return (
    <CalculatorFrame note="Enter the cash value actually received. The 24% amount is withholding, while final tax depends on total income and circumstances." results={<>
      <Metric label="Estimated prize after tax" value={money(result.net)} emphasis />
      <Metric label="24% federal withholding" value={money(result.withholding)} />
      <Metric label="Estimated final federal tax" value={money(result.federal)} />
      <Metric label={result.extra >= 0 ? "Potential federal amount beyond withholding" : "Potential excess withholding"} value={money(Math.abs(result.extra))} />
      <Metric label="State estimate" value={money(result.state)} />
    </>}>
      <FilingSelect value={status} onChange={setStatus} />
      <NumberInput id="lottery-prize" label="Cash prize received" value={prize} onChange={setPrize} />
      <NumberInput id="other-income" label="Other annual income" value={otherIncome} onChange={setOtherIncome} />
      <NumberInput id="lottery-state-rate" label="State tax rate estimate" value={stateRate} onChange={setStateRate} suffix="%" step={0.1} />
    </CalculatorFrame>
  );
}

function CaliforniaCalculator() {
  const [status, setStatus] = useState<FilingStatus>("single");
  const [income, setIncome] = useState(95_000);
  const [itemized, setItemized] = useState(0);
  const result = useMemo(() => californiaIncomeTax2025(income, itemized, status), [income, itemized, status]);
  return (
    <CalculatorFrame note="2025 California state estimate only. Exemption credits, surtaxes, AMT and income adjustments are excluded." results={<>
      <Metric label="Estimated California tax" value={money(result.tax)} emphasis />
      <Metric label="California taxable income" value={money(result.taxableIncome)} />
      <Metric label="Deduction used" value={money(result.deduction)} />
      <Metric label="Effective state rate" value={percent(result.effectiveRate)} />
    </>}>
      <FilingSelect value={status} onChange={setStatus} />
      <NumberInput id="california-income" label="California income before deduction" value={income} onChange={setIncome} />
      <NumberInput id="california-itemized" label="California itemized deduction" value={itemized} onChange={setItemized} help="Leave at $0 to use the 2025 California standard deduction." />
    </CalculatorFrame>
  );
}

function SelfEmploymentCalculator({ combined = false }: { combined?: boolean }) {
  const [status, setStatus] = useState<FilingStatus>("single");
  const [revenue, setRevenue] = useState(90_000);
  const [expenses, setExpenses] = useState(18_000);
  const [w2, setW2] = useState(0);
  const [withholding, setWithholding] = useState(0);
  const [qbi, setQbi] = useState(false);
  const result = useMemo(() => {
    const profit = Math.max(0, combined ? revenue - expenses : revenue);
    const se = selfEmploymentTax(profit, w2, status);
    const qbiDeduction = combined && qbi ? Math.max(0, profit - se.deductibleHalf) * 0.20 : 0;
    const taxableIncome = Math.max(0, w2 + profit - se.deductibleHalf - qbiDeduction - standardDeduction(2026, status));
    const federal = federalIncomeTax(taxableIncome, 2026, status);
    const total = federal + se.total;
    const remaining = Math.max(0, total - withholding);
    return { profit, se, qbiDeduction, taxableIncome, federal, total, remaining, quarterly: remaining / 4 };
  }, [revenue, expenses, w2, status, withholding, combined, qbi]);
  if (!combined) {
    return (
      <CalculatorFrame note="This isolates 2026 self-employment tax. Use the 1099 calculator for a combined federal income-tax estimate." results={<>
        <Metric label="Estimated self-employment tax" value={money(result.se.total)} emphasis />
        <Metric label="Net business profit" value={money(result.profit)} />
        <Metric label="SE-tax earnings base" value={money(result.se.seBase)} />
        <Metric label="Social Security portion" value={money(result.se.socialSecurity)} />
        <Metric label="Medicare portions" value={money(result.se.medicare + result.se.additionalMedicare)} />
        <Metric label="Deductible employer-equivalent half" value={money(result.se.deductibleHalf)} />
      </>}>
        <FilingSelect value={status} onChange={setStatus} />
        <NumberInput id="se-profit" label="Net self-employment profit" value={revenue} onChange={setRevenue} help="Enter profit after business expenses." />
        <NumberInput id="se-w2" label="W-2 Social Security wages" value={w2} onChange={setW2} help="Used to determine remaining room under the 2026 wage base." />
      </CalculatorFrame>
    );
  }
  return (
    <CalculatorFrame note="Simplified 2026 federal estimate. State tax and many credits, phaseouts and deductions are not included." results={<>
      <Metric label="Estimated total federal tax" value={money(result.total)} emphasis />
      <Metric label="Net 1099 profit" value={money(result.profit)} />
      <Metric label="Self-employment tax" value={money(result.se.total)} />
      <Metric label="Federal income tax" value={money(result.federal)} />
      <Metric label="Remaining after withholding" value={money(result.remaining)} />
      <Metric label="Simple quarterly reserve" value={money(result.quarterly)} />
    </>}>
      <FilingSelect value={status} onChange={setStatus} />
      <NumberInput id="business-revenue" label="1099 / business revenue" value={revenue} onChange={setRevenue} />
      <NumberInput id="business-expenses" label="Deductible business expenses" value={expenses} onChange={setExpenses} />
      <NumberInput id="w2-income" label="W-2 wages, if any" value={w2} onChange={setW2} />
      <NumberInput id="federal-withholding" label="Expected federal withholding" value={withholding} onChange={setWithholding} />
      <Toggle checked={qbi} onChange={setQbi} label="Apply simplified 20% QBI estimate" help="Eligibility and limits are not tested; off by default." />
    </CalculatorFrame>
  );
}

function QuarterlyCalculator() {
  const [currentTax, setCurrentTax] = useState(24_000);
  const [priorTax, setPriorTax] = useState(20_000);
  const [withholding, setWithholding] = useState(4_000);
  const [highIncome, setHighIncome] = useState(false);
  const result = useMemo(() => {
    const currentTarget = currentTax * 0.90;
    const priorTarget = priorTax * (highIncome ? 1.10 : 1);
    const target = Math.min(currentTarget, priorTarget);
    const remaining = Math.max(0, target - withholding);
    return { currentTarget, priorTarget, target, remaining, installment: remaining / 4 };
  }, [currentTax, priorTax, withholding, highIncome]);
  return (
    <CalculatorFrame note="Equal-installment federal safe-harbor planner. Verify due dates and consider the annualized-income method if income is uneven." results={<>
      <Metric label="Estimated quarterly installment" value={money(result.installment)} emphasis />
      <Metric label="Required annual-payment target" value={money(result.target)} />
      <Metric label="90% current-year method" value={money(result.currentTarget)} />
      <Metric label={highIncome ? "110% prior-year method" : "100% prior-year method"} value={money(result.priorTarget)} />
      <Metric label="Remaining after withholding" value={money(result.remaining)} />
    </>}>
      <NumberInput id="expected-current-tax" label="Expected 2026 total tax" value={currentTax} onChange={setCurrentTax} />
      <NumberInput id="prior-year-tax" label="2025 total tax" value={priorTax} onChange={setPriorTax} />
      <NumberInput id="expected-withholding" label="Expected 2026 withholding" value={withholding} onChange={setWithholding} />
      <Toggle checked={highIncome} onChange={setHighIncome} label="Prior-year AGI exceeded the higher-income threshold" help="$150,000 generally; $75,000 if filing separately." />
    </CalculatorFrame>
  );
}

function CarSalesTaxCalculator() {
  const [price, setPrice] = useState(38_000);
  const [trade, setTrade] = useState(8_000);
  const [fees, setFees] = useState(500);
  const [rate, setRate] = useState(7.25);
  const [tradeCredit, setTradeCredit] = useState(true);
  const result = useMemo(() => {
    const taxable = Math.max(0, price + fees - (tradeCredit ? trade : 0));
    const tax = taxable * rate / 100;
    const total = Math.max(0, price - trade + fees + tax);
    return { taxable, tax, total };
  }, [price, trade, fees, rate, tradeCredit]);
  return (
    <CalculatorFrame note="Trade-in treatment and taxable fees vary by state. Use the credit toggle only after checking the applicable authority." results={<>
      <Metric label="Estimated drive-away amount" value={money(result.total, 2)} emphasis />
      <Metric label="Taxable vehicle amount" value={money(result.taxable, 2)} />
      <Metric label="Estimated sales tax" value={money(result.tax, 2)} />
      <Metric label="Trade-in applied to price" value={money(trade, 2)} />
    </>}>
      <NumberInput id="vehicle-price" label="Vehicle price" value={price} onChange={setPrice} />
      <NumberInput id="trade-value" label="Trade-in value" value={trade} onChange={setTrade} />
      <NumberInput id="taxable-fees" label="Taxable fees" value={fees} onChange={setFees} />
      <NumberInput id="vehicle-tax-rate" label="Verified combined rate" value={rate} onChange={setRate} suffix="%" step={0.01} />
      <Toggle checked={tradeCredit} onChange={setTradeCredit} label="Trade-in reduces taxable amount" help="Not permitted or calculated the same way in every state." />
    </CalculatorFrame>
  );
}

function VatCalculator() {
  const [amount, setAmount] = useState(120);
  const [rate, setRate] = useState(20);
  const [mode, setMode] = useState<"add" | "remove">("remove");
  const result = useMemo(() => {
    if (mode === "add") {
      const vat = amount * rate / 100;
      return { net: amount, vat, gross: amount + vat };
    }
    const net = amount / (1 + rate / 100);
    return { net, vat: amount - net, gross: amount };
  }, [amount, rate, mode]);
  const number = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (
    <CalculatorFrame note="Currency-neutral result. Presets are a starting reference; reduced, zero and exempt rates depend on the transaction." results={<>
      <Metric label="Net amount" value={number(result.net)} emphasis={mode === "remove"} />
      <Metric label="VAT amount" value={number(result.vat)} />
      <Metric label="Gross amount" value={number(result.gross)} emphasis={mode === "add"} />
      <Metric label="Rate used" value={`${rate}%`} />
    </>}>
      <label className="field" htmlFor="vat-mode"><span className="field-label">Calculation</span><select id="vat-mode" value={mode} onChange={(event) => setMode(event.target.value as "add" | "remove")}><option value="add">Add VAT to a net amount</option><option value="remove">Remove included VAT from a gross amount</option></select></label>
      <label className="field" htmlFor="vat-preset"><span className="field-label">Reference rate</span><select id="vat-preset" value={rate} onChange={(event) => setRate(Number(event.target.value))}><option value={20}>UK standard — 20%</option><option value={21}>Netherlands / Spain — 21%</option><option value={19}>Germany — 19%</option><option value={23}>Ireland — 23%</option><option value={25}>Denmark / Sweden — 25%</option><option value={5}>Custom example — 5%</option></select></label>
      <NumberInput id="vat-amount" label={mode === "add" ? "Net amount" : "Gross amount"} value={amount} onChange={setAmount} step={0.01} />
      <NumberInput id="vat-rate" label="VAT rate" value={rate} onChange={setRate} suffix="%" step={0.1} />
    </CalculatorFrame>
  );
}

export function ToolCalculator({ slug, embedded = false }: { slug: string; embedded?: boolean }) {
  let calculator: ReactNode = null;
  switch (slug) {
    case "income-tax-calculator": calculator = <IncomeTaxCalculator />; break;
    case "paycheck-tax-calculator": calculator = <PaycheckCalculator />; break;
    case "sales-tax-calculator": calculator = <SalesTaxCalculator />; break;
    case "reverse-sales-tax-calculator": calculator = <SalesTaxCalculator reverse />; break;
    case "capital-gains-tax-calculator": calculator = <CapitalGainsCalculator />; break;
    case "lottery-tax-calculator": calculator = <LotteryCalculator />; break;
    case "california-tax-calculator": calculator = <CaliforniaCalculator />; break;
    case "self-employment-tax-calculator": calculator = <SelfEmploymentCalculator />; break;
    case "1099-tax-calculator": calculator = <SelfEmploymentCalculator combined />; break;
    case "quarterly-tax-calculator": calculator = <QuarterlyCalculator />; break;
    case "car-sales-tax-calculator": calculator = <CarSalesTaxCalculator />; break;
    case "vat-calculator": calculator = <VatCalculator />; break;
  }
  if (!calculator) return null;
  return <div data-calculator-root={slug}>{calculator}{embedded ? null : <CalculatorUtilities slug={slug} />}</div>;
}
