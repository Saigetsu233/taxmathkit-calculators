export type PriorityToolContent = {
  searchLead: string;
  useWhen: string[];
  notFor: string[];
};

export const priorityToolContent: Record<string, PriorityToolContent> = {
  "income-tax-calculator": {
    searchLead: "Estimate federal income tax from gross income, filing status and deductions, then see taxable income, effective rate and marginal bracket.",
    useWhen: [
      "You are comparing a 2025 or 2026 federal income scenario.",
      "You want a bracket-by-bracket planning estimate before withholding or quarterly decisions.",
      "You need a transparent standard-deduction versus itemized-deduction comparison.",
    ],
    notFor: [
      "A filed return, exact withholding form or a final payment amount.",
      "State/local tax, complex credits, phaseouts or special income categories.",
      "A tax year not shown in the calculator's year selector.",
    ],
  },
  "1099-tax-calculator": {
    searchLead: "Estimate federal income tax, self-employment tax and a quarterly reserve from 1099 revenue, expenses, W-2 wages and withholding.",
    useWhen: [
      "You are a freelancer or contractor planning a reserve from net business profit.",
      "You want to separate SE tax from federal income tax instead of using one flat percentage.",
      "You need a first-pass quarterly amount after entered federal withholding.",
    ],
    notFor: [
      "Treating gross 1099 receipts as taxable profit without reviewing expenses.",
      "State income tax, exact credits, itemized deductions or final QBI eligibility.",
      "Replacing the IRS safe-harbor and due-date rules for your facts.",
    ],
  },
  "self-employment-tax-calculator": {
    searchLead: "Apply the regular 92.35% net-earnings base to estimate Social Security, Medicare and the deductible employer-equivalent half.",
    useWhen: [
      "You want to isolate SE tax from federal income tax.",
      "You have net business profit and may also have W-2 wages using the Social Security wage base.",
      "You are checking how the 92.35% base changes the reserve calculation.",
    ],
    notFor: [
      "Applying 15.3% directly to gross receipts.",
      "Special farm, church, statutory employee or optional-method cases.",
      "A complete income-tax, state-tax or quarterly safe-harbor calculation.",
    ],
  },
  "sales-tax-calculator": {
    searchLead: "Calculate sales tax from a pre-tax price and a verified combined state and local rate, then see the tax-inclusive total.",
    useWhen: [
      "You already have the applicable combined rate for the transaction location.",
      "You need a fast price-plus-tax estimate for an invoice or checkout scenario.",
      "You want to compare a state rate with a local district rate you enter.",
    ],
    notFor: [
      "Looking up a rate from a ZIP code or deciding taxability and sourcing.",
      "Mixed taxable, exempt or marketplace-facilitated transactions.",
      "A filing or remittance decision without checking the official state authority.",
    ],
  },
};
