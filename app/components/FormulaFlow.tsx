const flows: Record<string, { eyebrow: string; title: string; reviewed: string; steps: Array<{ label: string; detail: string }> }> = {
  "income-tax-calculator": {
    eyebrow: "Federal income-tax flow",
    title: "From gross income to estimated federal tax",
    reviewed: "IRS 2025 and 2026 rate schedules reviewed August 6, 2026",
    steps: [
      { label: "Gross income", detail: "Income included in this planning estimate" },
      { label: "Adjustments", detail: "Subtract eligible above-the-line amounts entered by you" },
      { label: "Deduction", detail: "Use the larger entered itemized amount or standard deduction" },
      { label: "Tax brackets", detail: "Apply each progressive band to taxable income" },
      { label: "Credits", detail: "Subtract simple credits, never below zero" },
      { label: "Estimated tax", detail: "Federal ordinary-income estimate before withholding" },
    ],
  },
  "1099-tax-calculator": {
    eyebrow: "1099 planning flow",
    title: "Separate business profit, payroll-style tax, and income tax",
    reviewed: "IRS Schedule SE and 2026 federal parameters reviewed August 6, 2026",
    steps: [
      { label: "1099 revenue", detail: "Start with business receipts" },
      { label: "Expenses", detail: "Subtract ordinary and necessary business costs" },
      { label: "Net profit", detail: "The planning base for Schedule C income" },
      { label: "SE-tax base", detail: "Multiply profit by 92.35%" },
      { label: "Two tax layers", detail: "Estimate self-employment tax and federal income tax" },
      { label: "Reserve", detail: "Subtract withholding and divide the remainder for planning" },
    ],
  },
  "self-employment-tax-calculator": {
    eyebrow: "Self-employment-tax flow",
    title: "Why the 15.3% headline rate is not applied to gross receipts",
    reviewed: "IRS Topic 554 and 2026 Social Security wage base reviewed August 6, 2026",
    steps: [
      { label: "Net profit", detail: "Profit after business expenses—not gross receipts" },
      { label: "92.35%", detail: "Convert profit to net earnings for the regular SE-tax calculation" },
      { label: "Wage-base room", detail: "Reduce Social Security room by entered W-2 wages" },
      { label: "12.4% + 2.9%", detail: "Estimate Social Security and Medicare components" },
      { label: "SE tax", detail: "Add applicable Additional Medicare Tax estimate" },
      { label: "Half deduction", detail: "Show the employer-equivalent income adjustment separately" },
    ],
  },
  "sales-tax-calculator": {
    eyebrow: "Sales-tax flow",
    title: "The rate is simple; choosing the correct rate is the hard part",
    reviewed: "State authority directory reviewed August 6, 2026",
    steps: [
      { label: "Pre-tax price", detail: "The taxable price you enter" },
      { label: "Official lookup", detail: "Verify state, local district, sourcing, and product treatment" },
      { label: "Combined rate", detail: "Enter the legally applicable percentage" },
      { label: "Multiply", detail: "Price × rate = estimated sales tax" },
      { label: "Add", detail: "Pre-tax price + tax" },
      { label: "Total", detail: "Tax-inclusive planning amount" },
    ],
  },
};

export function FormulaFlow({ slug }: { slug: string }) {
  const flow = flows[slug];
  if (!flow) return null;
  return <section className="shell formula-flow" aria-label={`${flow.title} diagram`}><div className="flow-heading"><div><span className="eyebrow">{flow.eyebrow}</span><h2>{flow.title}</h2></div><p>{flow.reviewed}</p></div><ol>{flow.steps.map((step, index) => <li key={step.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step.label}</strong><p>{step.detail}</p></li>)}</ol></section>;
}
