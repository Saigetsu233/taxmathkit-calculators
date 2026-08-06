export type SourceLink = { label: string; url: string };

export type TaxTool = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
  category: "Income" | "Freelance" | "Sales" | "Investment" | "Specialty";
  badge: string;
  taxYear: string;
  updated: string;
  primaryKeyword: string;
  keywords: string[];
  formulaTitle: string;
  formula: string;
  explanation: string[];
  assumptions: string[];
  faqs: { question: string; answer: string }[];
  sources: SourceLink[];
  related: string[];
  workedExample?: {
    title: string;
    steps: string[];
    result: string;
  };
  commonMistakes?: string[];
};

const IRS_2026 = "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill";
const IRS_BRACKETS = "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets";
const IRS_SE = "https://www.irs.gov/taxtopics/tc554";
const IRS_ESTIMATED = "https://www.irs.gov/publications/p505";
const IRS_FICA = "https://www.irs.gov/taxtopics/tc751";

export const tools: TaxTool[] = [
  {
    slug: "income-tax-calculator",
    title: "2025–2026 Federal Income Tax Calculator",
    eyebrow: "US federal estimate",
    description: "Estimate federal income tax, taxable income, effective rate and marginal bracket using current 2025 or 2026 IRS schedules.",
    metaDescription: "Free 2025–2026 US income tax calculator using current federal tax brackets and standard deductions. See taxable income, tax, effective rate and marginal rate.",
    category: "Income", badge: "Top search demand", taxYear: "2025 & 2026", updated: "August 5, 2026",
    primaryKeyword: "income tax calculator",
    keywords: ["tax calculator", "tax calculator 2026", "tax calculator 2025", "federal income tax calculator", "federal tax calculator"],
    formulaTitle: "Progressive federal tax estimate",
    formula: "Taxable income = AGI − the greater of standard or itemized deductions. Each bracket rate applies only to the income inside that bracket.",
    explanation: [
      "Choose the year and filing status, then enter gross income, adjustments and deductions. The calculator applies the official standard deduction unless your itemized amount is higher.",
      "The result is a planning estimate, not a tax return. It excludes many credits, surtaxes, phaseouts, alternative minimum tax and special income categories unless you enter a simple credit amount.",
    ],
    assumptions: ["US resident individual", "Ordinary income only", "No age/blindness addition to the standard deduction", "Credits entered as a simple dollar reduction"],
    faqs: [
      { question: "Does moving into a higher bracket tax all my income at that rate?", answer: "No. Federal brackets are marginal: only the layer of taxable income inside the higher bracket receives the higher rate." },
      { question: "Why can this differ from my refund?", answer: "A refund compares final tax with withholding and payments. This calculator estimates tax liability and does not predict all credits or payments." },
      { question: "Are 2026 brackets included?", answer: "Yes. The 2026 schedules and standard deductions use IRS Revenue Procedure 2025-32 as modified after the 2025 federal tax law changes." },
    ],
    sources: [{ label: "IRS — 2026 inflation adjustments", url: IRS_2026 }, { label: "IRS — federal rates and brackets", url: IRS_BRACKETS }],
    related: ["paycheck-tax-calculator", "capital-gains-tax-calculator", "california-tax-calculator"],
    workedExample: {
      title: "Single filer with $85,000 gross income in 2026",
      steps: [
        "$85,000 gross income − $3,000 eligible adjustments = $82,000 AGI.",
        "$82,000 AGI − $16,100 standard deduction = $65,900 taxable income.",
        "Apply 10% to the first $12,400, 12% through $50,400, and 22% to the remaining $15,500.",
      ],
      result: "$9,210 estimated federal income tax before credits and taxes outside this simplified model; the marginal rate is 22%, not 22% of every dollar earned.",
    },
    commonMistakes: [
      "Entering gross pay where the calculator requests taxable income or AGI.",
      "Applying the marginal bracket rate to all income.",
      "Subtracting both the standard deduction and itemized deductions.",
      "Confusing tax liability with refund or balance due after payments.",
    ],
  },
  {
    slug: "paycheck-tax-calculator",
    title: "2026 Paycheck Tax Calculator",
    eyebrow: "Annualized take-home estimate",
    description: "Turn annual salary into per-paycheck federal income tax, Social Security, Medicare and estimated take-home pay.",
    metaDescription: "Estimate 2026 paycheck taxes and take-home pay by pay frequency. Includes federal income tax, Social Security and Medicare using current limits.",
    category: "Income", badge: "2026 rates", taxYear: "2026", updated: "August 5, 2026",
    primaryKeyword: "paycheck tax calculator", keywords: ["payroll tax calculator", "take home pay calculator", "salary after tax"],
    formulaTitle: "Annualized paycheck estimate",
    formula: "Estimated annual federal tax + employee FICA, divided by the selected number of pay periods.",
    explanation: ["This planning tool annualizes salary and pre-tax deductions, then estimates federal income tax and employee FICA.", "It does not reproduce every Form W-4 step, benefit rule, state tax or employer payroll calculation."],
    assumptions: ["Same gross pay each period", "No state or local income tax", "Pre-tax input reduces federal taxable income", "Additional Medicare withholding starts above $200,000 of wages"],
    faqs: [
      { question: "Is this an exact W-4 withholding calculator?", answer: "No. It is an annualized planning estimate. Use the official IRS Tax Withholding Estimator for a complete W-4 analysis." },
      { question: "What is the 2026 Social Security wage base?", answer: "The 2026 wage base is $184,500. Employee Social Security tax is 6.2% up to that limit." },
    ],
    sources: [{ label: "IRS — Social Security and Medicare rates", url: IRS_FICA }, { label: "IRS — Tax Withholding Estimator", url: "https://www.irs.gov/individuals/tax-withholding-estimator" }],
    related: ["income-tax-calculator", "1099-tax-calculator", "quarterly-tax-calculator"],
  },
  {
    slug: "sales-tax-calculator",
    title: "Sales Tax Calculator",
    eyebrow: "Add tax to a price",
    description: "Calculate sales tax, pre-tax price and final total with any state or local rate you enter.",
    metaDescription: "Free sales tax calculator. Enter a price and combined state/local sales tax rate to calculate tax and total instantly.",
    category: "Sales", badge: "Simple & transparent", taxYear: "Rate supplied by you", updated: "August 5, 2026",
    primaryKeyword: "sales tax calculator", keywords: ["calculate sales tax", "sales tax formula", "price plus tax"],
    formulaTitle: "Add sales tax",
    formula: "Sales tax = pre-tax price × combined rate. Total = pre-tax price + sales tax.",
    explanation: ["Enter the combined rate that applies to your transaction. The tool does not guess a rate from ZIP code.", "US rates may combine state, county, city and special-district components; product exemptions and sourcing rules can change the applicable rate."],
    assumptions: ["Rate is entered as a percentage", "The full entered amount is taxable", "No product exemption or tax holiday", "Standard rounding to cents"],
    faqs: [
      { question: "Can I use a ZIP code alone for an exact rate?", answer: "Not reliably. Tax boundaries can differ inside a ZIP code. For filing or collection, use an official address-level source." },
      { question: "How do I remove tax from a total?", answer: "Use the Reverse Sales Tax Calculator, which divides the tax-inclusive total by 1 plus the rate." },
    ],
    sources: [{ label: "California CDTFA — verify a combined rate by address", url: "https://www.cdtfa.ca.gov/taxes-and-fees/know-your-rate.htm" }, { label: "New York Tax Department — combined jurisdiction rates", url: "https://www.tax.ny.gov/pdf/publications/sales/pub718.pdf" }],
    related: ["reverse-sales-tax-calculator", "car-sales-tax-calculator", "vat-calculator"],
    workedExample: {
      title: "$125 taxable price at an 8.25% combined rate",
      steps: [
        "Convert 8.25% to decimal form: 0.0825.",
        "Sales tax: $125 × 0.0825 = $10.3125, then apply the jurisdiction's required rounding method.",
        "With ordinary cent rounding for this illustration: $125 + $10.31 = $135.31.",
      ],
      result: "$10.31 illustrative sales tax and $135.31 total. Verify the address, product taxability, sourcing, date, and rounding rule before collection or filing.",
    },
    commonMistakes: [
      "Using a statewide headline rate when local district rates also apply.",
      "Treating a ZIP code as a precise tax boundary.",
      "Applying the rate to exempt items or excluding taxable charges without authority.",
      "Rounding inconsistently between line items, invoices, and filed returns.",
    ],
  },
  {
    slug: "reverse-sales-tax-calculator",
    title: "Reverse Tax Calculator",
    eyebrow: "Remove tax from a total",
    description: "Work backward from a tax-inclusive total to find the original price and sales tax amount.",
    metaDescription: "Free reverse tax and reverse sales tax calculator. Remove tax from a total and see the original price and tax amount with the formula shown.",
    category: "Sales", badge: "Best opportunity", taxYear: "Rate supplied by you", updated: "August 5, 2026",
    primaryKeyword: "reverse sales tax calculator", keywords: ["reverse tax calculator", "remove tax calculator", "backwards sales tax calculator"],
    formulaTitle: "Remove included tax",
    formula: "Pre-tax price = tax-inclusive total ÷ (1 + tax rate). Included tax = total − pre-tax price.",
    explanation: ["Reverse tax is useful for receipts, expense reports and reconciling a tax-inclusive total.", "Do not multiply the total by the rate to remove tax: the tax percentage was originally applied to the smaller pre-tax amount."],
    assumptions: ["Entered total already includes tax", "One combined tax rate applies", "No mixed taxable and exempt items", "Currency-neutral formula"],
    faqs: [
      { question: "How do I remove 8.25% tax from $108.25?", answer: "Divide $108.25 by 1.0825. The pre-tax amount is $100 and the included tax is $8.25." },
      { question: "Is reverse tax the same as a salary gross-up?", answer: "Not necessarily. This page reverses transaction tax. Payroll gross-up uses income-tax and payroll-withholding rules." },
    ],
    sources: [{ label: "Formula methodology", url: "/methodology" }, { label: "Avalara — why combined local rates matter", url: "https://www.avalara.com/us/en/taxrates/calculator.html" }],
    related: ["sales-tax-calculator", "vat-calculator", "car-sales-tax-calculator"],
  },
  {
    slug: "capital-gains-tax-calculator",
    title: "2026 Capital Gains Tax Calculator",
    eyebrow: "Federal long-term gain estimate",
    description: "Estimate federal tax on a short- or long-term capital gain after stacking the gain above ordinary taxable income.",
    metaDescription: "Estimate 2026 federal capital gains tax using current 0%, 15% and 20% long-term capital gains thresholds or ordinary short-term rates.",
    category: "Investment", badge: "2026 thresholds", taxYear: "2026", updated: "August 5, 2026",
    primaryKeyword: "capital gains tax calculator", keywords: ["long term capital gains calculator", "short term capital gains tax", "capital gains rate"],
    formulaTitle: "Capital gains stacking",
    formula: "Long-term gains sit above ordinary taxable income, filling available 0%, then 15%, then 20% capital-gain bands.",
    explanation: ["Enter ordinary taxable income before the gain—not gross income—and the net taxable gain.", "The optional NIIT estimate is simplified. State taxes, loss carryovers, collectibles, depreciation recapture and home-sale exclusions are outside this calculator."],
    assumptions: ["Federal individual tax", "Net long-term gain is eligible for preferential rates", "Ordinary taxable income is entered after deductions", "No special 25% or 28% gain category"],
    faqs: [
      { question: "Why does ordinary income affect my capital gains rate?", answer: "Preferential gain bands are shared with ordinary taxable income. Ordinary income fills the lower space before long-term gains are stacked on top." },
      { question: "How are short-term gains taxed?", answer: "Short-term gains are generally taxed at ordinary federal income-tax rates." },
    ],
    sources: [{ label: "IRS — 2026 capital gain thresholds", url: "https://www.irs.gov/irb/2025-45_IRB" }, { label: "IRS — Net Investment Income Tax", url: "https://www.irs.gov/individuals/net-investment-income-tax" }],
    related: ["income-tax-calculator", "california-tax-calculator", "quarterly-tax-calculator"],
  },
  {
    slug: "lottery-tax-calculator",
    title: "Lottery Tax Calculator",
    eyebrow: "Withholding versus estimated tax",
    description: "Compare the common 24% federal lottery withholding with an estimated final federal tax and a state rate you enter.",
    metaDescription: "Estimate lottery taxes, 24% federal withholding, possible additional federal tax, optional state tax and after-tax winnings.",
    category: "Specialty", badge: "Shows the tax gap", taxYear: "2026 estimate", updated: "August 5, 2026",
    primaryKeyword: "lottery tax calculator", keywords: ["lottery winnings tax", "powerball tax calculator", "jackpot after tax"],
    formulaTitle: "Lottery tax estimate",
    formula: "Estimated tax on other income + winnings, less tax on other income alone; compare that with 24% regular federal withholding.",
    explanation: ["The 24% amount is withholding, not necessarily the final federal tax rate. Large prizes can enter higher marginal brackets.", "Enter the cash value actually received and a state rate if applicable. This is not an annuity valuation or state-specific lottery rule engine."],
    assumptions: ["Cash prize is taxable ordinary income", "Federal withholding shown at 24%", "State tax is a flat user-entered estimate", "No charitable deduction or shared ownership"],
    faqs: [
      { question: "Is 24% the final lottery tax?", answer: "Often not. It is commonly the amount withheld on qualifying winnings. Your final tax depends on total annual income, filing status and deductions." },
      { question: "Does every state tax lottery winnings?", answer: "No. State treatment varies. Enter a rate only after checking the lottery and revenue authority for your state." },
    ],
    sources: [{ label: "IRS — Instructions for Forms W-2G and 5754", url: "https://www.irs.gov/instructions/iw2g" }, { label: "IRS Publication 17 — gambling winnings", url: "https://www.irs.gov/publications/p17" }],
    related: ["income-tax-calculator", "quarterly-tax-calculator", "california-tax-calculator"],
  },
  {
    slug: "california-tax-calculator",
    title: "California Income Tax Calculator",
    eyebrow: "2025 California estimate",
    description: "Estimate 2025 California taxable income and state income tax using current FTB rate schedules and standard deductions.",
    metaDescription: "Estimate 2025 California income tax with official FTB rate schedules and standard deductions for single, joint, separate and head-of-household filers.",
    category: "Income", badge: "Official 2025 schedule", taxYear: "2025", updated: "August 5, 2026",
    primaryKeyword: "california tax calculator", keywords: ["california income tax calculator", "CA tax calculator", "California state tax"],
    formulaTitle: "California progressive tax",
    formula: "California taxable income = entered California income − the greater of the 2025 state standard or entered itemized deduction; progressive Schedule X, Y or Z rates then apply.",
    explanation: ["This estimates California state income tax only. Federal tax is separate.", "The result excludes exemption credits, mental-health-services tax, alternative minimum tax, credits and California/federal income adjustments."],
    assumptions: ["Full-year California resident", "Income entered is California income before deduction", "2025 tax year", "No credits or surtaxes"],
    faqs: [
      { question: "Why is the California standard deduction lower than the federal deduction?", answer: "California publishes its own deduction amounts. For 2025 they are $5,706 for single/separate and $11,412 for joint, head-of-household or qualifying surviving spouse." },
      { question: "Does this include federal income tax?", answer: "No. Use the federal income tax calculator separately." },
    ],
    sources: [{ label: "California FTB — 2025 rate schedules", url: "https://www.ftb.ca.gov/forms/2025/2025-540-booklet.html" }, { label: "California FTB — 2025 deductions", url: "https://www.ftb.ca.gov/file/personal/deductions/index.html" }],
    related: ["income-tax-calculator", "capital-gains-tax-calculator", "1099-tax-calculator"],
  },
  {
    slug: "self-employment-tax-calculator",
    title: "2026 Self-Employment Tax Calculator",
    eyebrow: "Social Security + Medicare",
    description: "Estimate 2026 self-employment tax from net profit, including the 92.35% base, Social Security limit and Medicare tax.",
    metaDescription: "Free 2026 self-employment tax calculator. Estimate Social Security, Medicare, additional Medicare and the deductible half of SE tax.",
    category: "Freelance", badge: "2026 wage base", taxYear: "2026", updated: "August 5, 2026",
    primaryKeyword: "self employment tax calculator", keywords: ["self employed tax calculator", "SE tax calculator", "freelance tax"],
    formulaTitle: "Self-employment tax base",
    formula: "Net earnings subject to SE tax = net profit × 92.35%. Social Security and Medicare components then apply, with W-2 wages using the Social Security wage-base room first.",
    explanation: ["Enter business profit after ordinary and necessary expenses. If you also have W-2 wages, enter them so the Social Security wage-base limit is applied correctly.", "This calculator focuses on SE tax. The 1099 calculator adds a simplified federal income-tax estimate."],
    assumptions: ["Sole proprietor or similar Schedule C income", "$400 filing threshold not used to suppress the estimate", "2026 Social Security wage base of $184,500", "No optional farm/nonfarm method"],
    faqs: [
      { question: "Why is only 92.35% of profit subject to self-employment tax?", answer: "IRS Schedule SE generally multiplies net self-employment earnings by 92.35% under the regular method." },
      { question: "Can I deduct self-employment tax?", answer: "Generally, the employer-equivalent half is deductible when figuring adjusted gross income. That deduction does not reduce the SE tax itself." },
    ],
    sources: [{ label: "IRS Topic 554 — Self-employment tax", url: IRS_SE }, { label: "SSA — 2026 contribution base", url: "https://www.ssa.gov/oact/cola/cbbdet.html" }],
    related: ["1099-tax-calculator", "quarterly-tax-calculator", "income-tax-calculator"],
    workedExample: {
      title: "$60,000 net profit with no W-2 wages",
      steps: [
        "$60,000 × 92.35% = $55,410 net earnings subject to the regular SE-tax calculation.",
        "Social Security component: $55,410 × 12.4% = $6,870.84.",
        "Medicare component: $55,410 × 2.9% = $1,606.89.",
      ],
      result: "$8,477.73 estimated self-employment tax and about $4,238.87 as the employer-equivalent-half deduction, before Additional Medicare Tax or special methods.",
    },
    commonMistakes: [
      "Applying 15.3% directly to gross 1099 receipts.",
      "Ignoring W-2 wages that already use part of the Social Security wage base.",
      "Subtracting half of SE tax from SE tax itself instead of treating it as an income adjustment.",
      "Assuming self-employment tax includes federal and state income tax.",
    ],
  },
  {
    slug: "1099-tax-calculator",
    title: "2026 1099 Tax Calculator",
    eyebrow: "Freelancer total-tax estimate",
    description: "Estimate federal income tax, self-employment tax, quarterly reserve and take-home income from 1099 revenue and deductions.",
    metaDescription: "Free 2026 1099 tax calculator with business deductions, W-2 income, federal income tax, self-employment tax and quarterly reserve estimate.",
    category: "Freelance", badge: "High opportunity", taxYear: "2026", updated: "August 5, 2026",
    primaryKeyword: "1099 tax calculator", keywords: ["1099 tax calculator with deductions", "1099 tax calculator federal and state", "freelancer tax calculator"],
    formulaTitle: "1099 profit to estimated total tax",
    formula: "Net business profit = 1099 revenue − business expenses. Estimate SE tax, deduct its employer-equivalent half, then apply 2026 federal brackets after the standard deduction.",
    explanation: ["This combines a detailed SE-tax estimate with a simplified federal ordinary-income estimate. It can account for W-2 wages and withholding.", "State income tax, most credits, itemized deductions, retirement contributions and exact QBI limitations are outside the default calculation."],
    assumptions: ["1099 income is Schedule C business revenue", "Expenses are ordinary and necessary", "Standard deduction", "Optional QBI checkbox is a simplified estimate, not eligibility advice"],
    faqs: [
      { question: "Should I calculate tax on 1099 revenue or profit?", answer: "Self-employment and income tax generally start from net business profit after deductible business expenses, not gross 1099 revenue." },
      { question: "How much should I set aside?", answer: "The calculator shows an estimated remaining annual amount and quarterly reserve after entered federal withholding. Your actual safe-harbor payment can depend on prior-year tax." },
    ],
    sources: [{ label: "IRS — Self-employment tax", url: IRS_SE }, { label: "IRS — 2026 brackets", url: IRS_2026 }, { label: "IRS Publication 505", url: IRS_ESTIMATED }],
    related: ["self-employment-tax-calculator", "quarterly-tax-calculator", "income-tax-calculator"],
    workedExample: {
      title: "$90,000 revenue and $20,000 business expenses",
      steps: [
        "$90,000 − $20,000 = $70,000 Schedule C planning profit.",
        "Estimate SE tax from the regular 92.35% base, then deduct the employer-equivalent half when estimating AGI.",
        "Apply the chosen filing status, standard deduction, federal brackets, entered withholding, and any deliberately selected simplified QBI assumption.",
      ],
      result: "The calculator separates profit, SE tax, federal income tax, withholding, and the remaining quarterly reserve so a single percentage does not hide the moving parts.",
    },
    commonMistakes: [
      "Building the reserve from gross receipts instead of defensible net profit.",
      "Counting a business expense twice—once against profit and again as a personal deduction.",
      "Using the current-year estimate without checking prior-year safe-harbor rules.",
      "Treating a planning reserve as the exact amount due on each statutory deadline.",
    ],
  },
  {
    slug: "quarterly-tax-calculator",
    title: "2026 Quarterly Tax Calculator",
    eyebrow: "Federal safe-harbor planner",
    description: "Estimate the smaller federal safe-harbor target, remaining annual payment and equal quarterly installments.",
    metaDescription: "Estimate 2026 quarterly federal tax payments using the 90% current-year or 100%/110% prior-year safe-harbor methods and entered withholding.",
    category: "Freelance", badge: "Safe-harbor modes", taxYear: "2026", updated: "August 5, 2026",
    primaryKeyword: "quarterly tax calculator", keywords: ["estimated quarterly tax calculator", "1099 quarterly tax calculator", "estimated tax payments"],
    formulaTitle: "Required annual payment",
    formula: "Safe-harbor target = the smaller of 90% of expected current-year tax or 100% of prior-year tax (110% for certain higher-income taxpayers), less expected withholding.",
    explanation: ["This calculator helps plan equal federal installments. It does not calculate annualized-income installments for uneven earnings.", "The statutory quarters are not equal calendar quarters, and due dates can move for weekends, holidays or disaster relief. Always verify the current IRS schedule."],
    assumptions: ["Prior-year return covered 12 months", "Four equal installments", "No farmer/fisher special rule", "Federal payments only"],
    faqs: [
      { question: "Which safe-harbor method does the calculator use?", answer: "It uses the smaller of 90% of expected current-year tax or the applicable prior-year percentage, then subtracts expected withholding." },
      { question: "When does 110% apply?", answer: "For 2026, the prior-year percentage generally becomes 110% when 2025 AGI exceeded $150,000, or $75,000 if filing separately." },
    ],
    sources: [{ label: "IRS Publication 505 (2026)", url: IRS_ESTIMATED }, { label: "IRS — underpayment penalty", url: "https://www.irs.gov/payments/underpayment-of-estimated-tax-by-individuals-penalty" }],
    related: ["1099-tax-calculator", "self-employment-tax-calculator", "income-tax-calculator"],
  },
  {
    slug: "car-sales-tax-calculator",
    title: "Car Sales Tax Calculator",
    eyebrow: "Vehicle purchase estimate",
    description: "Estimate vehicle sales tax and drive-away total with trade-in treatment, taxable fees and a rate you verify.",
    metaDescription: "Estimate car sales tax with vehicle price, trade-in credit, taxable fees and your verified state/local rate. See taxable amount, tax and total.",
    category: "Sales", badge: "Trade-in control", taxYear: "Rate supplied by you", updated: "August 5, 2026",
    primaryKeyword: "car sales tax calculator", keywords: ["vehicle sales tax calculator", "auto tax calculator", "car price after tax"],
    formulaTitle: "Vehicle taxable amount",
    formula: "Taxable amount = vehicle price + taxable fees − eligible trade-in credit. Sales tax = taxable amount × entered rate.",
    explanation: ["Trade-in credits, documentation fees, rebates and sourcing rules vary by state. The calculator lets you control whether trade-in value reduces the taxable base.", "Use the combined rate for the place and transaction that legally applies; do not rely on a general state rate for a binding quote."],
    assumptions: ["Cash purchase estimate", "Rate verified by the user", "No financing interest", "Fees entered are taxable"],
    faqs: [
      { question: "Does every state reduce tax for a trade-in?", answer: "No. Eligibility and calculation vary. Use the toggle only after checking your motor-vehicle or revenue authority." },
      { question: "Does the total include registration and title fees?", answer: "Only fees you enter are included, and the calculator treats the entered fee amount as taxable." },
    ],
    sources: [{ label: "NCSL — vehicle tax policy context", url: "https://www.ncsl.org/transportation/vehicle-registration-fees-by-state" }, { label: "Methodology and limitations", url: "/methodology" }],
    related: ["sales-tax-calculator", "reverse-sales-tax-calculator", "income-tax-calculator"],
  },
  {
    slug: "vat-calculator",
    title: "VAT Calculator — Add or Remove VAT",
    eyebrow: "Net, VAT and gross",
    description: "Add VAT to a net amount or extract included VAT from a gross amount using a country preset or custom rate.",
    metaDescription: "Free VAT calculator to add VAT or remove VAT from a gross price. Includes common country presets, custom rates and the reverse VAT formula.",
    category: "Sales", badge: "Global formula", taxYear: "Rates verified August 2026", updated: "August 5, 2026",
    primaryKeyword: "vat calculator", keywords: ["reverse vat calculator", "add vat calculator", "remove vat calculator"],
    formulaTitle: "Add or extract VAT",
    formula: "Add: gross = net × (1 + rate). Remove: net = gross ÷ (1 + rate); VAT = gross − net.",
    explanation: ["Use country presets as a starting reference only. Reduced, zero and exempt rates depend on the product, customer, location and transaction date.", "For cross-border supplies, first determine the place of taxation and who is liable; a rate calculator alone cannot make that decision."],
    assumptions: ["One VAT rate applies to the full amount", "Currency-neutral calculation", "No partial exemption", "No reverse-charge compliance decision"],
    faqs: [
      { question: "How do I remove 20% VAT from £120?", answer: "Divide £120 by 1.20 to get £100 net. The included VAT is £20." },
      { question: "Is reverse charge the same as reverse VAT calculation?", answer: "No. Reverse calculation extracts tax from a gross price. Reverse charge is a compliance rule that can shift who accounts for VAT." },
    ],
    sources: [{ label: "European Commission — VAT rates", url: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-directive/vat-rates_en" }, { label: "European Commission — how VAT works", url: "https://taxation-customs.ec.europa.eu/taxation/vat/vat-directive/how-does-vat-work_en" }],
    related: ["reverse-sales-tax-calculator", "sales-tax-calculator", "car-sales-tax-calculator"],
  },
];

export const toolMap = new Map(tools.map((tool) => [tool.slug, tool]));

export const categories = ["Income", "Freelance", "Sales", "Investment", "Specialty"] as const;

export function getTool(slug: string) {
  return toolMap.get(slug);
}
