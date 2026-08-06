export type QuestionIntent = {
  slug: string;
  title: string;
  description: string;
  shortAnswer: string;
  category: string;
  intent: string;
  toolSlug: string;
  toolLabel: string;
  whyItMatters: string;
  steps: string[];
  mistakes: string[];
  faqs: Array<{ question: string; answer: string }>;
  sources: Array<{ label: string; url: string }>;
  relatedGuides: string[];
};

const IRS_SE = "https://www.irs.gov/taxtopics/tc554";
const IRS_ESTIMATED = "https://www.irs.gov/publications/p505";
const IRS_W2_1099 = "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee";
const IRS_FICA = "https://www.irs.gov/taxtopics/tc751";
const SSA_BASE = "https://www.ssa.gov/oact/cola/cbbdet.html";
const CA_RATE = "https://www.cdtfa.ca.gov/taxes-and-fees/know-your-rate.htm";
const NY_RATE = "https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rates_additional_sales_taxes_and_fees.htm";

export const questions: QuestionIntent[] = [
  {
    slug: "how-much-to-set-aside-for-1099-taxes",
    title: "How much should I set aside for 1099 taxes?",
    description: "Estimate a 1099 tax reserve from business revenue, expenses, W-2 income, and withholding instead of relying on one generic percentage.",
    shortAnswer: "There is no universal 1099 percentage. Start with net business profit, estimate self-employment tax and federal income tax, subtract expected withholding, and reserve the remaining amount. State and local tax may require an additional estimate.",
    category: "1099 and freelance income",
    intent: "Set-aside question",
    toolSlug: "1099-tax-calculator",
    toolLabel: "Open the 1099 tax calculator",
    whyItMatters: "A 1099 payment is usually gross business revenue, not taxable profit. Expenses, W-2 withholding, filing status, and other income can move the reserve materially.",
    steps: ["Enter annual 1099 or business revenue.", "Subtract ordinary and necessary business expenses to estimate net profit.", "Estimate self-employment tax and federal income tax separately.", "Subtract federal withholding or payments already made.", "Use the remaining annual amount as a planning reserve, then review the quarterly safe-harbor rules."],
    mistakes: ["Applying 30% to gross receipts without checking expenses.", "Counting self-employment tax as the entire tax bill.", "Ignoring federal withholding from a W-2 job.", "Treating a cash reserve as the exact amount due on every IRS deadline."],
    faqs: [
      { question: "Is 30% always enough for 1099 taxes?", answer: "No. A percentage is only a cash habit. Your actual estimate depends on net profit, filing status, other income, deductions, credits, withholding, and state rules." },
      { question: "Should I reserve from gross income or profit?", answer: "Use profit after defensible business expenses as the starting federal planning base. Keep a separate cash buffer for expenses that have not yet been classified." },
    ],
    sources: [{ label: "IRS Topic 554 — self-employment tax", url: IRS_SE }, { label: "IRS Publication 505 — estimated tax", url: IRS_ESTIMATED }],
    relatedGuides: ["1099-tax-worked-example-with-expenses", "freelancer-quarterly-tax-reserve-mistakes"],
  },
  {
    slug: "quarterly-tax-payment-for-freelancers",
    title: "How much should a freelancer pay in quarterly taxes?",
    description: "Estimate a federal quarterly payment target for freelance income using current-year tax, prior-year tax, and expected withholding.",
    shortAnswer: "A first-pass federal target usually compares the current-year estimate with the applicable prior-year safe-harbor amount, subtracts withholding, and divides the remaining target into installments. Uneven income can require an annualized method instead of equal quarters.",
    category: "Quarterly estimated payments",
    intent: "Payment planning question",
    toolSlug: "quarterly-tax-calculator",
    toolLabel: "Open the quarterly tax calculator",
    whyItMatters: "Quarterly payments are about avoiding an underpayment surprise, not simply dividing one guessed percentage by four. Withholding from a W-2 job can count toward the annual target.",
    steps: ["Estimate the full federal tax for the year.", "Compare 90% of current-year tax with the applicable prior-year safe harbor.", "Subtract expected federal withholding and payments already made.", "Divide the remaining planning target into installments.", "Verify the official due dates and consider annualized income if earnings are uneven."],
    mistakes: ["Using four equal calendar quarters as if the IRS periods were identical.", "Forgetting W-2 withholding or prior estimated payments.", "Ignoring the 110% prior-year rule when it applies.", "Using the calculator as a state estimated-payment schedule."],
    faqs: [
      { question: "Do freelancers always have to pay quarterly?", answer: "You generally need an estimated-payment plan when withholding and credits will not cover the amount required under the applicable federal rules. Check your facts and the current IRS instructions." },
      { question: "What if freelance income changes every month?", answer: "Equal installments are a budgeting shortcut. The annualized-income method may better match uneven earnings and should be reviewed with the current IRS worksheet or a tax professional." },
    ],
    sources: [{ label: "IRS Publication 505 — tax withholding and estimated tax", url: IRS_ESTIMATED }, { label: "IRS — underpayment penalty", url: "https://www.irs.gov/payments/underpayment-of-estimated-tax-by-individuals-penalty" }],
    relatedGuides: ["freelancer-quarterly-tax-reserve-mistakes", "1099-vs-w2-tax-comparison"],
  },
  {
    slug: "1099-taxes-with-a-w2-job",
    title: "How do I calculate 1099 taxes if I also have a W-2 job?",
    description: "Estimate how W-2 wages and withholding change the federal tax reserve on freelance or contractor income.",
    shortAnswer: "Treat the W-2 and 1099 income as parts of one federal return. W-2 withholding can reduce the remaining amount to reserve, while W-2 Social Security wages can reduce the remaining Social Security wage-base room for self-employment tax.",
    category: "W-2 plus side income",
    intent: "Mixed-income question",
    toolSlug: "1099-tax-calculator",
    toolLabel: "Calculate W-2 plus 1099 income",
    whyItMatters: "The same freelance profit can create a different reserve for someone with a full-time job because income stacks into federal brackets and the W-2 may already withhold tax.",
    steps: ["Enter 1099 revenue and business expenses.", "Add annual W-2 wages in the optional field.", "Enter expected federal withholding from paychecks.", "Review self-employment tax separately from income tax.", "Compare the remaining amount with your current withholding and payment plan."],
    mistakes: ["Calculating the 1099 work as a separate return.", "Assuming W-2 withholding automatically covers all side-income tax.", "Ignoring W-2 wages when checking Social Security wage-base room.", "Comparing gross freelance revenue with W-2 take-home pay."],
    faqs: [
      { question: "Can my W-2 withholding cover my 1099 taxes?", answer: "It can reduce or sometimes cover the remaining federal amount, but you must compare total expected tax with total withholding and payments. The result depends on the size and timing of both income streams." },
      { question: "Does W-2 income affect self-employment tax?", answer: "W-2 Social Security wages generally use the wage-base room first. Medicare and income-tax stacking still require separate checks." },
    ],
    sources: [{ label: "IRS — independent contractor or employee", url: IRS_W2_1099 }, { label: "IRS Topic 751 — Social Security and Medicare withholding", url: IRS_FICA }, { label: "SSA — contribution and benefit base", url: SSA_BASE }],
    relatedGuides: ["1099-vs-w2-tax-comparison", "1099-tax-worked-example-with-expenses"],
  },
  {
    slug: "tax-on-50000-freelance-income",
    title: "How much tax will I owe on $50,000 of freelance income?",
    description: "See why freelance tax on $50,000 depends on expenses, filing status, other income, and withholding—and run a transparent example.",
    shortAnswer: "$50,000 of freelance receipts is not enough information for one exact answer. You need net profit after business expenses, filing status, other income, deductions, credits, withholding, and state rules. Use the example calculator to change those assumptions.",
    category: "Freelance income estimate",
    intent: "Amount-specific question",
    toolSlug: "1099-tax-calculator",
    toolLabel: "Estimate tax on freelance income",
    whyItMatters: "Amount-specific searches are common, but a good answer must show which assumptions turn a revenue figure into a tax estimate instead of pretending the number is universal.",
    steps: ["Decide whether $50,000 means receipts or profit.", "Enter expected business expenses and calculate net profit.", "Add filing status and any W-2 income.", "Review self-employment tax and federal income tax as separate layers.", "Add a state estimate only after checking the relevant authority."],
    mistakes: ["Calling $50,000 of revenue $50,000 of taxable income.", "Omitting a spouse's or employer's income from the federal estimate.", "Assuming the 15.3% headline rate is the entire bill.", "Using a state average instead of the actual state and local rules."],
    faqs: [
      { question: "Does the calculator include state tax?", answer: "The default 1099 tool focuses on a simplified federal estimate. State income-tax and local rules need a separate, jurisdiction-specific check." },
      { question: "What expenses can I subtract?", answer: "Only expenses that are ordinary, necessary, properly documented, and allowable for the activity should be entered. The calculator cannot determine deductibility from a description alone." },
    ],
    sources: [{ label: "IRS — Schedule C business expenses", url: "https://www.irs.gov/forms-pubs/about-schedule-c-form-1040" }, { label: "IRS Topic 554 — self-employment tax", url: IRS_SE }],
    relatedGuides: ["1099-tax-worked-example-with-expenses", "why-self-employment-tax-uses-92-35-percent"],
  },
  {
    slug: "take-home-pay-after-taxes",
    title: "How much will my paycheck be after taxes?",
    description: "Estimate annual and per-paycheck take-home pay from salary, filing status, pay frequency, and pre-tax deductions.",
    shortAnswer: "Start with annual gross salary, subtract pre-tax deductions, estimate federal income tax and employee Social Security and Medicare, then divide the annual net by pay frequency. State tax, local tax, benefits, and employer-specific withholding can change the real paycheck.",
    category: "Paycheck and take-home pay",
    intent: "Take-home question",
    toolSlug: "paycheck-tax-calculator",
    toolLabel: "Calculate take-home pay",
    whyItMatters: "Salary searches are usually asking for the amount that reaches a bank account, not a federal tax-liability number. The page must label what is included and what is not.",
    steps: ["Enter annual gross salary and filing status.", "Choose weekly, biweekly, semimonthly, or monthly pay frequency.", "Enter annual pre-tax deductions such as a retirement contribution.", "Review federal income tax, Social Security, Medicare, and annual net.", "Add state, local, benefit, and employer-specific deductions separately."],
    mistakes: ["Confusing annual tax liability with payroll withholding.", "Ignoring pay frequency when translating annual net to a paycheck.", "Treating pre-tax deductions as if they reduce every payroll tax.", "Assuming the result is an exact W-4 or employer payroll calculation."],
    faqs: [
      { question: "Does this include state income tax?", answer: "The default calculator shows federal income tax and employee FICA. Add state, local, benefit, and employer-specific deductions using the applicable rules." },
      { question: "Why is my real paycheck different?", answer: "Employers may use W-4 details, benefit premiums, retirement elections, local taxes, wage limits, and payroll rounding that a general planning calculator does not know." },
    ],
    sources: [{ label: "IRS Topic 751 — Social Security and Medicare", url: IRS_FICA }, { label: "IRS Publication 15-T — federal income tax withholding", url: "https://www.irs.gov/publications/p15t" }],
    relatedGuides: ["marginal-vs-effective-tax-rate", "gross-income-vs-agi-vs-taxable-income"],
  },
  {
    slug: "sales-tax-calculator-by-state",
    title: "How do I calculate sales tax by state?",
    description: "Calculate a sales-tax total from a verified state and local rate, while keeping taxability, sourcing, and ZIP-code limits visible.",
    shortAnswer: "Multiply the taxable price by the combined rate that legally applies to the transaction, then add the tax. A state headline rate is only a starting point: city, county, district, product, delivery address, and transaction date can change the answer.",
    category: "Sales tax by location",
    intent: "Location question",
    toolSlug: "sales-tax-calculator",
    toolLabel: "Calculate sales tax from a verified rate",
    whyItMatters: "Users search by state because it is easy to name, but many sales-tax decisions are local. The calculator should make rate verification part of the workflow instead of inventing a ZIP-code answer.",
    steps: ["Confirm whether the item or service is taxable.", "Determine the applicable sourcing address and transaction date.", "Look up the combined state and local rate with the authority for that jurisdiction.", "Enter the pre-tax price and verified rate.", "Check rounding, exemptions, marketplace collection, and filing requirements separately."],
    mistakes: ["Using a statewide rate for a local transaction.", "Assuming a ZIP code uniquely identifies a tax jurisdiction.", "Treating an exact rate as proof that the product is taxable.", "Ignoring delivery, marketplace, resale, or exemption rules."],
    faqs: [
      { question: "Can I use a ZIP code to find the sales-tax rate?", answer: "A ZIP code can be a rough starting point, but it does not reliably define overlapping tax districts. Use an official address or jurisdiction lookup for a collection decision." },
      { question: "Does this page cover all 50 states?", answer: "It provides the arithmetic for any verified rate. The applicable rate and taxability must be checked with the relevant state and local authority." },
    ],
    sources: [{ label: "California CDTFA — know your rate", url: CA_RATE }, { label: "New York Tax Department — rates and local taxes", url: NY_RATE }],
    relatedGuides: ["sales-tax-worked-example-combined-rate", "zip-code-sales-tax-rate-mistakes"],
  },
  {
    slug: "car-sales-tax-with-trade-in",
    title: "How much sales tax will I pay when buying a car with a trade-in?",
    description: "Estimate a vehicle purchase total with price, trade-in value, taxable fees, and a verified state or local rate.",
    shortAnswer: "A simple estimate is taxable vehicle amount × verified rate, but the taxable amount may be reduced by a trade-in only where the state permits that treatment. Fees, rebates, registration, and local rules must be checked separately.",
    category: "Vehicle purchase tax",
    intent: "Purchase question",
    toolSlug: "car-sales-tax-calculator",
    toolLabel: "Calculate car sales tax",
    whyItMatters: "Vehicle buyers care about the drive-away total, not just a generic sales-tax percentage. Trade-in rules are a high-impact state-specific assumption.",
    steps: ["Enter the vehicle price and trade-in value.", "Add fees that are taxable under your state rules.", "Enter a verified combined rate for the transaction location.", "Toggle the trade-in credit only if the authority permits it.", "Add title, registration, financing, and dealer charges separately if needed."],
    mistakes: ["Assuming every state gives the same trade-in credit.", "Using the state base rate instead of the combined local rate.", "Including registration or financing costs without checking taxability.", "Treating the estimate as a dealer invoice or final government assessment."],
    faqs: [
      { question: "Does a trade-in always reduce taxable price?", answer: "No. The credit and its limits vary by state and transaction details. Verify the motor-vehicle or revenue authority before relying on it." },
      { question: "Are title and registration fees included?", answer: "Only amounts you enter are included, and the calculator treats entered fees as taxable. Keep government fees separate until their treatment is confirmed." },
    ],
    sources: [{ label: "Methodology and limitations", url: "https://taxmathkit.com/methodology" }, { label: "NCSL — vehicle registration fees by state", url: "https://www.ncsl.org/transportation/vehicle-registration-fees-by-state" }],
    relatedGuides: ["sales-tax-worked-example-combined-rate", "zip-code-sales-tax-rate-mistakes"],
  },
  {
    slug: "self-employment-tax-on-60000-profit",
    title: "How much is self-employment tax on $60,000 of profit?",
    description: "Walk through the 92.35% regular-method base, Social Security, Medicare, and the deductible employer-equivalent half.",
    shortAnswer: "Under the regular simplified method, $60,000 of net profit becomes a $55,410 self-employment-tax earnings base after multiplying by 92.35%. The Social Security and Medicare components then apply, with W-2 wages and thresholds affecting the final estimate.",
    category: "Self-employment tax formula",
    intent: "Amount-specific formula question",
    toolSlug: "self-employment-tax-calculator",
    toolLabel: "Calculate self-employment tax",
    whyItMatters: "The common 15.3% headline is not simply applied to gross receipts. Showing the 92.35% base and wage-base interaction makes the result auditable.",
    steps: ["Enter net profit after business expenses.", "Multiply it by 92.35% for the regular-method earnings base.", "Apply remaining Social Security wage-base room after W-2 wages.", "Apply Medicare and any applicable additional Medicare estimate.", "Review the employer-equivalent half as an income adjustment, not a reduction of SE tax itself."],
    mistakes: ["Applying 15.3% directly to gross receipts.", "Ignoring W-2 wages that already use Social Security wage-base room.", "Subtracting the deductible half from the SE-tax bill.", "Confusing self-employment tax with federal income tax."],
    faqs: [
      { question: "Why does the calculation use 92.35%?", answer: "The regular Schedule SE method generally uses 92.35% of net self-employment profit as net earnings for the basic calculation." },
      { question: "Does this include federal income tax?", answer: "No. This page isolates self-employment tax. Use the 1099 calculator for a combined simplified federal income-tax and reserve estimate." },
    ],
    sources: [{ label: "IRS Topic 554 — self-employment tax", url: IRS_SE }, { label: "SSA — contribution and benefit base", url: SSA_BASE }],
    relatedGuides: ["why-self-employment-tax-uses-92-35-percent", "1099-tax-worked-example-with-expenses"],
  },
];

export function getQuestion(slug: string) {
  return questions.find((question) => question.slug === slug);
}
