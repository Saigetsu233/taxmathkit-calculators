export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type TaxGuide = {
  slug: string;
  title: string;
  description: string;
  category: "Federal income" | "1099 & self-employment" | "Sales tax";
  intent: "Worked example" | "Formula explained" | "Common mistakes" | "Comparison guide";
  readTime: string;
  relatedTools: string[];
  takeaway: string;
  sections: GuideSection[];
  checklist: string[];
  sources: Array<{ label: string; url: string }>;
};

const IRS_2026 = "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill";
const IRS_2026_TABLES = "https://www.irs.gov/irb/2025-45_IRB";
const IRS_AGI = "https://www.irs.gov/e-file-providers/definition-of-adjusted-gross-income";
const IRS_ITEMIZE = "https://www.irs.gov/taxtopics/tc501";
const IRS_SE = "https://www.irs.gov/taxtopics/tc554";
const IRS_505 = "https://www.irs.gov/publications/p505";
const IRS_SCHEDULE_C = "https://www.irs.gov/forms-pubs/about-schedule-c-form-1040";
const SSA_BASE = "https://www.ssa.gov/oact/cola/cbbdet.html";
const CA_RATE = "https://www.cdtfa.ca.gov/taxes-and-fees/know-your-rate.htm";
const NY_RATE = "https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rates_additional_sales_taxes_and_fees.htm";
const FL_ROUNDING = "https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx";

export const guides: TaxGuide[] = [
  {
    slug: "2026-federal-income-tax-worked-example",
    title: "2026 federal income tax worked example: from gross income to tax",
    description: "Follow one single-filer example through adjustments, the standard deduction, three marginal brackets, and the final planning estimate.",
    category: "Federal income",
    intent: "Worked example",
    readTime: "8 min",
    relatedTools: ["income-tax-calculator"],
    takeaway: "For a simple federal estimate, move from gross income to AGI, subtract the applicable deduction, and apply each bracket only to the taxable-income layer inside it.",
    sections: [
      { heading: "Build taxable income before touching the brackets", paragraphs: ["Assume a single filer expects $85,000 of gross ordinary income in 2026 and has $3,000 of eligible adjustments. The planning AGI is $82,000. If the filer qualifies for the $16,100 basic standard deduction and has no larger allowable itemized total, taxable income is $65,900.", "This example deliberately excludes credits, preferential capital-gain rates, additional deductions for age or blindness, alternative minimum tax, surtaxes, and special income rules. Those omissions make the arithmetic readable, not universally applicable."], bullets: ["Gross income: $85,000", "Less adjustments: $3,000", "AGI: $82,000", "Less standard deduction: $16,100", "Taxable income: $65,900"] },
      { heading: "Apply the 2026 single-filer schedule one layer at a time", paragraphs: ["The first $12,400 is taxed at 10%, producing $1,240. The next $38,000—from $12,400 to $50,400—is taxed at 12%, producing $4,560. The remaining $15,500 is taxed at 22%, producing $3,410.", "The total illustrated federal income tax is $9,210 before credits and other taxes. The 22% marginal rate describes the next ordinary taxable-income layer in this example; it does not turn the full $85,000 into 22% tax."] },
      { heading: "Reconcile the estimate with the number you actually need", paragraphs: ["Tax liability is not the same as a refund or balance due. To estimate the amount still payable, compare the broader return liability with withholding, estimated payments, and refundable credits. To estimate take-home pay, also consider payroll, state, local, and benefit deductions.", "Use the calculator to test one assumption at a time and retain the year, filing status, income, adjustments, deduction choice, credits, and excluded items beside the result."] },
    ],
    checklist: ["Correct tax year", "Filing status", "Gross ordinary income", "Eligible adjustments", "Standard or itemized deduction", "Credits and excluded taxes", "Withholding kept separate"],
    sources: [{ label: "IRS — 2026 inflation adjustments", url: IRS_2026 }, { label: "IRS — 2026 tax rate tables", url: IRS_2026_TABLES }],
  },
  {
    slug: "marginal-vs-effective-tax-rate",
    title: "Marginal vs effective tax rate: the difference a calculator should show",
    description: "Understand why your top bracket, total tax divided by taxable income, and total tax divided by gross income answer different questions.",
    category: "Federal income",
    intent: "Formula explained",
    readTime: "7 min",
    relatedTools: ["income-tax-calculator"],
    takeaway: "Marginal rate prices the next taxable dollar; an effective rate averages a chosen tax total over a chosen income base, so the denominator must always be named.",
    sections: [
      { heading: "Marginal rate belongs to the next layer", paragraphs: ["Federal ordinary-income brackets are progressive. When taxable income crosses a threshold, only the portion above that threshold enters the next rate band. A taxpayer in the 22% bracket still has lower layers taxed at 10% and 12% under the applicable schedule.", "This makes the marginal rate useful for a limited decision such as estimating the federal ordinary-income tax on one additional deductible dollar or one additional dollar of ordinary taxable income, before phaseouts and other rules."] },
      { heading: "Effective rate needs a named denominator", paragraphs: ["One calculator may divide estimated federal income tax by taxable income. Another may divide it by gross income. Both are averages, but they are not interchangeable. The first describes tax relative to the amount exposed to the brackets; the second describes tax relative to the entered gross-income base.", "For the $9,210 worked estimate on $65,900 taxable income and $85,000 gross income, those two illustrative percentages are about 13.98% and 10.84%. Neither replaces the 22% marginal rate."], bullets: ["Taxable-income effective rate = tax ÷ taxable income.", "Gross-income effective rate = tax ÷ gross income.", "Marginal rate = rate on the next relevant taxable-income layer."] },
      { heading: "Do not use one rate as a complete planning shortcut", paragraphs: ["Credits, deduction limits, qualified dividends, capital gains, self-employment tax, Additional Medicare Tax, NIIT, state tax, and benefit phaseouts can change the true effect of another dollar. A bracket-only marginal rate is therefore a component, not a full marginal-cost model.", "A transparent calculator should display the tax base and label every percentage. If a result simply says effective tax rate without showing the denominator and taxes included, do not compare it with another tool yet."] },
    ],
    checklist: ["Tax included in numerator", "Income used in denominator", "Marginal bracket", "Preferential income separated", "Credits and phaseouts", "Payroll and state tax scope"],
    sources: [{ label: "IRS — federal rates and brackets", url: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" }, { label: "IRS — 2026 rate tables", url: IRS_2026_TABLES }],
  },
  {
    slug: "gross-income-vs-agi-vs-taxable-income",
    title: "Gross income vs AGI vs taxable income: stop entering the wrong number",
    description: "Map the three income layers to a federal tax calculator and see why using gross pay in every field can materially overstate tax.",
    category: "Federal income",
    intent: "Common mistakes",
    readTime: "7 min",
    relatedTools: ["income-tax-calculator"],
    takeaway: "Gross income starts the return, AGI subtracts eligible adjustments, and taxable income generally subtracts the applicable deduction before ordinary brackets are applied.",
    sections: [
      { heading: "Name the layer shown on the form or input", paragraphs: ["Gross income is not limited to salary: it can include taxable wages, interest, dividends, business income, gains, retirement income, and other taxable sources. AGI is gross income minus eligible adjustments reported through the return process. The standard or itemized deduction is generally applied after AGI to help reach taxable income.", "A calculator that asks for gross income and adjustments can perform those steps. A calculator that asks for taxable income expects you to have already done them. Entering gross income into a taxable-income field can apply the brackets too early."] },
      { heading: "Watch for deductions that live in different places", paragraphs: ["The deductible employer-equivalent half of self-employment tax is an adjustment in the regular workflow, while the standard or itemized deduction is a later deduction choice. A business expense reduces business profit before that profit enters the individual return. These are different locations even if each can reduce a later tax base.", "Do not count the same amount twice. For example, an expense already subtracted from Schedule C profit is not automatically another personal itemized deduction."] },
      { heading: "Use a reconciliation instead of a guess", paragraphs: ["Write a short bridge: gross income, minus business and other income-level deductions where applicable, minus adjustments, equals AGI; minus the applicable deduction and other permitted items, equals taxable income. Then compare each calculator input with the line it intends to approximate.", "When the situation includes multiple businesses, losses, special deductions, benefits, or income with preferential rates, use the actual form instructions or professional software rather than forcing every amount into a simple ordinary-income model."] },
    ],
    checklist: ["All taxable income sources", "Business profit after expenses", "Adjustments to income", "AGI", "Standard or itemized deduction", "Taxable income", "No duplicated deduction"],
    sources: [{ label: "IRS — definition of adjusted gross income", url: IRS_AGI }, { label: "IRS — taxable income overview", url: "https://www.irs.gov/filing/taxable-income" }],
  },
  {
    slug: "standard-deduction-vs-itemized-deductions",
    title: "Standard deduction vs itemized deductions: a comparison workflow",
    description: "Compare the two deduction paths without simply adding them together or assuming the larger raw total is automatically allowable.",
    category: "Federal income",
    intent: "Comparison guide",
    readTime: "8 min",
    relatedTools: ["income-tax-calculator"],
    takeaway: "Most eligible taxpayers compare the allowable itemized total with the applicable standard deduction and use the permitted path that produces the better result—not both.",
    sections: [
      { heading: "Start with eligibility and the correct standard amount", paragraphs: ["The basic standard deduction depends on tax year and filing status, with separate rules for dependents and additional amounts for age or blindness. Some taxpayers cannot use the standard deduction, including certain married-separate filers when a spouse itemizes and certain nonresident or dual-status filers.", "A simple calculator may include only the basic amount. Check whether age, blindness, dependent status, residency, or a short tax year changes the input before comparing it with Schedule A items."] },
      { heading: "Build the allowable itemized amount, not a receipt total", paragraphs: ["Potential Schedule A categories can include limited medical expenses, certain taxes, qualifying interest, charitable contributions, casualty losses in allowed circumstances, and other specified items. Thresholds, caps, substantiation, and current-year law can make the allowable amount smaller than receipts collected.", "Compare the permitted itemized total—not a rough expense folder—with the applicable standard deduction. In most ordinary cases the larger deduction reduces taxable income more, but other return interactions can still matter."], bullets: ["Confirm each category is deductible for the year.", "Apply thresholds and limits before comparison.", "Retain records even when the standard deduction wins this estimate."] },
      { heading: "Measure the tax effect rather than the deduction difference alone", paragraphs: ["A $2,000 increase in deductions does not usually mean $2,000 less tax. Its immediate bracket-only effect is roughly the deductible difference multiplied by the marginal rate, before other interactions. This explains why the compliance time needed to itemize can matter when the two paths are close.", "Run both permitted scenarios with the same income assumptions, and document any exclusions the calculator cannot model."] },
    ],
    checklist: ["Eligibility for standard deduction", "Correct year and status", "Age/blindness additions", "Allowable Schedule A total", "Limits and substantiation", "Tax difference between scenarios"],
    sources: [{ label: "IRS Topic 501 — Should I itemize?", url: IRS_ITEMIZE }, { label: "IRS — standard and itemized deduction overview", url: "https://www.irs.gov/newsroom/deductions-for-individuals-what-they-mean-and-the-difference-between-standard-and-itemized-deductions" }],
  },
  {
    slug: "1099-tax-worked-example-with-expenses",
    title: "1099 tax worked example: revenue, expenses, SE tax, and reserve",
    description: "Trace a freelancer estimate from $90,000 of receipts through business profit, self-employment tax, income-tax inputs, and quarterly cash planning.",
    category: "1099 & self-employment",
    intent: "Worked example",
    readTime: "9 min",
    relatedTools: ["1099-tax-calculator", "self-employment-tax-calculator"],
    takeaway: "Separate gross receipts, defensible business expenses, SE tax, income tax, withholding, and payments instead of multiplying revenue by one generic reserve percentage.",
    sections: [
      { heading: "Move from receipts to net business profit", paragraphs: ["Assume $90,000 of 1099 and other business receipts and $20,000 of ordinary and necessary business expenses for a simple Schedule C planning example. The net business profit is $70,000. The documents labelled 1099 support revenue reporting; they do not by themselves calculate profit or tax.", "Classify expenses once, retain support, and separate personal spending. A calculator can subtract the amount entered, but it cannot decide deductibility from a label alone."], bullets: ["Receipts: $90,000", "Entered business expenses: $20,000", "Planning net profit: $70,000"] },
      { heading: "Calculate SE tax before the simplified income-tax estimate", paragraphs: ["Under the regular method, multiply the $70,000 profit by 92.35% to get $64,645 of net earnings for the basic SE-tax calculation. With no W-2 wages, that amount remains below the 2026 Social Security contribution base. Apply the Social Security and Medicare components, then consider Additional Medicare Tax separately if the combined threshold rules apply.", "The employer-equivalent half of SE tax is generally an adjustment when estimating AGI; it does not reduce the SE tax itself. The income-tax calculation then depends on the wider return, filing status, deduction choice, credits, and other income."] },
      { heading: "Turn the annual estimate into a payment plan carefully", paragraphs: ["Subtract expected federal withholding and qualifying payments from the broader estimated annual liability to find the remaining cash need. Equal quarterly division is a budgeting shortcut; the penalty-safe amount can depend on current-year and prior-year safe-harbor rules, payment dates, withholding timing, and uneven income.", "Keep state and local obligations outside the federal number unless the calculator explicitly models them. Reforecast when revenue, expenses, wages, or withholding changes materially."] },
    ],
    checklist: ["All business receipts", "Supported business expenses", "Net profit", "W-2 wages", "SE-tax components", "Income-tax assumptions", "Withholding and prior-year tax"],
    sources: [{ label: "IRS — Schedule C", url: IRS_SCHEDULE_C }, { label: "IRS Topic 554 — self-employment tax", url: IRS_SE }, { label: "IRS Publication 505 (2026)", url: IRS_505 }],
  },
  {
    slug: "why-self-employment-tax-uses-92-35-percent",
    title: "Why self-employment tax uses 92.35% of net profit",
    description: "Unpack the regular Schedule SE base, the Social Security and Medicare pieces, the wage-base interaction, and the employer-equivalent deduction.",
    category: "1099 & self-employment",
    intent: "Formula explained",
    readTime: "8 min",
    relatedTools: ["self-employment-tax-calculator", "1099-tax-calculator"],
    takeaway: "The regular calculation generally multiplies net self-employment profit by 92.35%, then applies the Social Security and Medicare components with wages and thresholds handled in the correct places.",
    sections: [
      { heading: "The 92.35% factor defines regular-method net earnings", paragraphs: ["IRS Publication 505's 2026 self-employment worksheet multiplies expected self-employment profit by 92.35%. If the result is below $400 under that worksheet, it does not proceed to the regular SE-tax amount. This factor is not a business-expense estimate and should not be applied to gross receipts before actual expenses are considered.", "For a $60,000 net profit, the regular base is $55,410. That is the number used for the basic Social Security and Medicare component steps in the simplified example."] },
      { heading: "Social Security and Medicare do not share every limit", paragraphs: ["The Social Security component is 12.4% up to the available contribution-and-benefit base. W-2 Social Security wages use that base first, so entering wages matters. The regular Medicare component is 2.9% without the same wage-base cap. Additional Medicare Tax can apply above filing-status thresholds after combining relevant wages and self-employment income.", "For 2026, the published Social Security contribution base is $184,500. A calculator should state the year because this amount changes."], bullets: ["SE-tax base: net profit × 92.35%.", "Social Security component: 12.4% within remaining wage-base room.", "Regular Medicare component: 2.9% of the SE-tax base."] },
      { heading: "The half-SE-tax deduction lives outside the SE-tax formula", paragraphs: ["The expected employer-equivalent-half deduction is generally one-half of the regular SE-tax amount in the Publication 505 workflow. It is used as an adjustment when estimating AGI. It does not cut the SE-tax bill in half and it does not replace business expenses.", "Special farm and nonfarm optional methods, multiple businesses, losses, church employee income, partnerships, and international social-security agreements can require a fuller Schedule SE analysis."] },
    ],
    checklist: ["Net profit, not receipts", "92.35% regular base", "$400 threshold check", "W-2 Social Security wages", "2026 wage base", "Additional Medicare threshold", "Half-SE-tax adjustment"],
    sources: [{ label: "IRS Publication 505 — 2026 SE-tax worksheet", url: IRS_505 }, { label: "IRS Topic 554", url: IRS_SE }, { label: "SSA — contribution and benefit base", url: SSA_BASE }],
  },
  {
    slug: "1099-vs-w2-tax-comparison",
    title: "1099 vs W-2 taxes: compare the same compensation honestly",
    description: "Compare business profit with employee wages without ignoring employer payroll tax, benefits, expenses, withholding, or worker-classification rules.",
    category: "1099 & self-employment",
    intent: "Comparison guide",
    readTime: "9 min",
    relatedTools: ["1099-tax-calculator", "self-employment-tax-calculator", "paycheck-tax-calculator"],
    takeaway: "A 1099 rate and a W-2 wage are not equivalent offers: compare after legitimate business costs, payroll-tax structure, benefits, paid time, insurance, risk, and compliance—not a single tax percentage.",
    sections: [
      { heading: "Start with different economic bases", paragraphs: ["W-2 wages are employee compensation with payroll withholding and an employer share of Social Security and Medicare taxes. A 1099 amount may be business revenue that must cover business expenses, unpaid administration, equipment, insurance, downtime, and the worker's self-employment-tax and estimated-payment workflow.", "Do not compare $50 per hour in both columns as if the hours, costs, and benefits are identical. Build annual scenarios using realistic billable hours and actual expenses."] },
      { heading: "Separate classification from preference", paragraphs: ["Worker status is determined by facts and applicable law, not by choosing the tax result that looks better. Control, financial arrangements, relationship, and agency-specific tests may matter. A calculator cannot turn an employee relationship into independent contracting.", "For a legitimate business scenario, calculate net profit after ordinary and necessary expenses, then estimate SE tax and income tax. For employment, calculate wages, employee payroll tax, federal withholding assumptions, and the value or cost of benefits."], bullets: ["Keep worker classification as a legal/factual question.", "Compare annual net amounts, not headline hourly rates.", "Price nonbillable time and risk explicitly."] },
      { heading: "Compare cash flow as well as annual tax", paragraphs: ["Employees commonly pay through withholding each paycheck. Self-employed taxpayers may need estimated payments and must build the reserve themselves. The same annual tax estimate can therefore create a different cash-flow burden.", "Run low, expected, and high revenue scenarios. Add state tax, health coverage, retirement contributions, insurance, paid leave, equipment, bookkeeping, and collection risk before deciding what contract rate is comparable."] },
    ],
    checklist: ["Correct worker classification", "Annual billable hours", "Business expenses", "Employer/employee payroll tax structure", "Benefits and paid time", "Withholding or estimated payments", "State and local tax"],
    sources: [{ label: "IRS — independent contractor or employee", url: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" }, { label: "IRS Topic 554", url: IRS_SE }],
  },
  {
    slug: "freelancer-quarterly-tax-reserve-mistakes",
    title: "Six quarterly-tax reserve mistakes freelancers can catch early",
    description: "Avoid confusing a cash reserve, an equal quarterly budget, a current-year estimate, and the federal required annual payment.",
    category: "1099 & self-employment",
    intent: "Common mistakes",
    readTime: "8 min",
    relatedTools: ["1099-tax-calculator", "self-employment-tax-calculator", "quarterly-tax-calculator"],
    takeaway: "Forecast the full federal liability, subtract withholding and payments, compare safe-harbor paths, and update the plan when income changes; a generic reserve percentage is only a cash habit.",
    sections: [
      { heading: "Do not treat a reserve percentage as the tax calculation", paragraphs: ["The first mistake is multiplying gross receipts by a percentage without estimating business profit. The second is treating self-employment tax as the complete liability while omitting income tax. The third is assuming a refund or prior balance due predicts the next year's required payment.", "Build the return components first: business profit, SE tax, income tax, other modeled taxes and credits, withholding, and payments. A reserve percentage can sit on top of that forecast as a conservative cash rule."] },
      { heading: "Do not confuse equal quarters with every approved method", paragraphs: ["The fourth mistake is dividing the remaining annual forecast by four without checking what has already been paid or withheld. The fifth is assuming four statutory payment periods are equal calendar quarters. The sixth is ignoring the prior-year safe-harbor path or the annualized-income method when income is uneven.", "IRS Publication 505 describes a general required annual payment based on the smaller of 90% of expected current-year tax or 100% of prior-year tax, with 110% used for certain higher-income taxpayers, subject to conditions and special rules."], bullets: ["Use current withholding in the calculation.", "Verify the actual due dates for the year.", "Reforecast after large changes instead of waiting for filing season."] },
      { heading: "Keep an audit trail for every update", paragraphs: ["Save the date, year-to-date receipts, expenses, wages, withholding, payments, prior-year tax, filing status, and forecast assumptions. The goal is not false precision; it is seeing which input changed the payment plan.", "This guide covers federal planning. State and local estimated-payment systems have their own thresholds, forms, schedules, and safe-harbor rules."] },
    ],
    checklist: ["Net-profit forecast", "SE and income tax", "Prior-year total tax", "Expected withholding", "Payments already made", "Current IRS due dates", "State/local plan"],
    sources: [{ label: "IRS Publication 505 (2026)", url: IRS_505 }, { label: "IRS — estimated-tax underpayment penalty", url: "https://www.irs.gov/payments/underpayment-of-estimated-tax-by-individuals-penalty" }],
  },
  {
    slug: "sales-tax-worked-example-combined-rate",
    title: "Sales tax worked example: price, combined rate, tax, and total",
    description: "Calculate one transparent transaction and see which legal inputs—location, taxability, sourcing, date, and rounding—the arithmetic cannot determine.",
    category: "Sales tax",
    intent: "Worked example",
    readTime: "7 min",
    relatedTools: ["sales-tax-calculator"],
    takeaway: "Once the correct taxable amount and combined rate are verified, multiply amount × rate for tax and add it to price; the hard part is verifying the inputs.",
    sections: [
      { heading: "Calculate the arithmetic with visible units", paragraphs: ["Assume the verified taxable amount is $125 and the combined state-and-local rate applicable to the transaction is 8.25%. Convert the percentage to 0.0825 and multiply: $125 × 0.0825 = $10.3125.", "Using ordinary nearest-cent rounding for this illustration gives $10.31 tax and a $135.31 total. A filing calculation must use the method required by the relevant jurisdiction and system."], bullets: ["Taxable amount: $125.00", "Combined rate: 8.25%", "Unrounded tax: $10.3125", "Illustrative rounded tax: $10.31", "Illustrative total: $135.31"] },
      { heading: "Verify the combined rate rather than a state headline", paragraphs: ["A combined rate can include state, county, city, school, transit, or special-district components. California and New York both provide official resources for current local rates, and both warn in different ways that location matters. A ZIP code can span more than one tax jurisdiction.", "Use an official address or jurisdiction lookup for the transaction date. Keep evidence of the rate used when rates change."] },
      { heading: "Confirm what belongs in the taxable amount", paragraphs: ["Product taxability, exemptions, delivery, installation, discounts, coupons, trade-ins, bundled services, marketplace rules, and sourcing can change the base or who must collect. A generic calculator assumes the full amount entered is taxable and cannot decide these questions.", "Reconcile collected tax with the invoice and return process. If a seller collects excess tax, state rules can restrict keeping it and may require refund or remittance."] },
    ],
    checklist: ["Taxable amount", "Product/service taxability", "Exact jurisdiction", "Transaction date", "Combined rate", "Required rounding", "Invoice and filing reconciliation"],
    sources: [{ label: "California CDTFA — know your rate", url: CA_RATE }, { label: "New York Tax Department — rates and calculation", url: NY_RATE }],
  },
  {
    slug: "sales-tax-formula-vs-reverse-sales-tax",
    title: "Add sales tax vs reverse sales tax: two formulas, two different bases",
    description: "See why multiplying a tax-inclusive total by the rate does not recover the included tax, with a $108.25 example.",
    category: "Sales tax",
    intent: "Formula explained",
    readTime: "7 min",
    relatedTools: ["sales-tax-calculator", "reverse-sales-tax-calculator"],
    takeaway: "Add tax by multiplying the pre-tax base; remove included tax by dividing the gross total by one plus the rate, then subtracting the recovered base.",
    sections: [
      { heading: "Adding tax starts from the pre-tax amount", paragraphs: ["If the pre-tax amount is $100 and the rate is 8.25%, tax is $100 × 0.0825 = $8.25. The tax-inclusive total is $108.25. The percentage was applied to $100, not to the later total.", "This forward formula assumes the entered amount is fully taxable and the rate has already been verified for the transaction."] },
      { heading: "Removing included tax requires division", paragraphs: ["To recover the base from $108.25, divide by 1.0825. The result is $100; subtract it from $108.25 to recover $8.25 included tax. Multiplying $108.25 by 8.25% would produce about $8.93, which overstates the included tax because it uses the wrong base.", "The general reverse formula is pre-tax amount = tax-inclusive total ÷ (1 + decimal rate). Included tax = total − pre-tax amount."], bullets: ["Forward: tax = net × rate.", "Forward: gross = net × (1 + rate).", "Reverse: net = gross ÷ (1 + rate).", "Reverse: included tax = gross − net."] },
      { heading: "Do not reverse one rate across a mixed receipt", paragraphs: ["A receipt can contain taxable, exempt, and differently taxed items, fees, discounts, and more than one jurisdictional treatment. One reverse calculation is reliable only when the entered total uses one applicable rate and tax base.", "For accounting or reimbursement, retain the original receipt and jurisdictional treatment rather than using a reverse calculator as replacement evidence."] },
    ],
    checklist: ["Net or gross starting amount", "Decimal rate", "One consistent tax base", "Mixed/exempt items separated", "Jurisdiction rule", "Rounding method"],
    sources: [{ label: "Texas Comptroller example for tax included in price", url: "https://star.comptroller.texas.gov/view/202104029W" }, { label: "New York Tax Department — compute tax due", url: NY_RATE }],
  },
  {
    slug: "zip-code-sales-tax-rate-mistakes",
    title: "Why a ZIP code can return the wrong sales tax rate",
    description: "Understand postal geography, overlapping tax districts, sourcing, and address-level verification before collecting tax from a customer.",
    category: "Sales tax",
    intent: "Common mistakes",
    readTime: "8 min",
    relatedTools: ["sales-tax-calculator"],
    takeaway: "ZIP codes route mail; they do not reliably define state and local tax boundaries, so binding rate selection needs the applicable sourcing rule and an official address or jurisdiction source.",
    sections: [
      { heading: "Postal areas and tax jurisdictions answer different questions", paragraphs: ["One ZIP code can cross city, county, school, transit, or special-district boundaries, and one street can sit near a boundary that changes the combined rate. New York's official Publication 718 explicitly warns that using ZIP codes for tax collection produces a high degree of inaccurate reporting.", "California provides an official address lookup because statewide, county, city, and district components can combine differently by location. A generic national ZIP table may be useful for rough planning, but it is not evidence for collection or filing."] },
      { heading: "The correct address still needs a sourcing rule", paragraphs: ["The tax location can depend on where a sale is made, delivered, picked up, used, or sourced under state-specific rules. Seller location, customer billing address, shipping address, and item location are not automatically interchangeable.", "Before looking up a rate, determine which jurisdiction's sourcing and marketplace rules govern the transaction. Then use the official tool for that location and date."], bullets: ["Do not substitute billing ZIP for delivery address automatically.", "Check whether a marketplace collects on the seller's behalf.", "Retain the effective date and lookup result."] },
      { heading: "Rate accuracy does not prove taxability", paragraphs: ["An exact combined rate can still be wrong for an exempt product, holiday, resale transaction, bundled service, or customer exemption. Rate, taxability, base, sourcing, and collection responsibility are separate decisions.", "A transparent calculator should therefore ask the user for the rate rather than pretending a ZIP guess is a filing answer. Link the result back to the source used."] },
    ],
    checklist: ["Full transaction address", "Sourcing rule", "Official jurisdiction lookup", "Effective date", "Product taxability", "Exemption documentation", "Marketplace responsibility"],
    sources: [{ label: "New York Publication 718 — ZIP-code warning", url: "https://www.tax.ny.gov/pdf/publications/sales/pub718.pdf" }, { label: "California CDTFA — address-level rate lookup", url: CA_RATE }],
  },
  {
    slug: "sales-tax-rounding-line-item-vs-invoice",
    title: "Sales tax rounding: line item vs invoice total",
    description: "See how cent rounding and calculation level can create reconciliation differences, and why the jurisdiction's rule must control the point-of-sale setup.",
    category: "Sales tax",
    intent: "Comparison guide",
    readTime: "8 min",
    relatedTools: ["sales-tax-calculator"],
    takeaway: "Carry enough precision, apply the jurisdiction's required rule at the permitted transaction level, and keep point-of-sale, invoice, and return methods consistent.",
    sections: [
      { heading: "Rounding is part of the tax method, not display polish", paragraphs: ["Multiplying price by rate often produces fractions of a cent. A system must know how many decimal places to carry, when to round, and whether the rule applies to each item, taxable subtotal, or transaction. Changing that sequence can change collected tax across many small lines.", "For a single $250 taxable transaction at 8.25%, the raw tax is $20.625. Under ordinary half-cent-up treatment, that becomes $20.63. Do not infer that every jurisdiction permits the same algorithm or calculation level."] },
      { heading: "Line-level and invoice-level results can diverge", paragraphs: ["Imagine three taxable items that each produce an unrounded tax of $0.334. Rounding each line to $0.33 yields $0.99, while adding first yields $1.002 and then $1.00 under nearest-cent rounding. The one-cent difference is created by sequence, not by the percentage itself.", "Florida's official guidance permits its specified rounding algorithm on the aggregate taxable amount for an invoice or on individual taxable items. Other jurisdictions can specify a different method, so point-of-sale settings should be tied to the governing rule."], bullets: ["Store the unrounded calculation precision.", "Document whether tax is computed per item or per transaction.", "Use one method through receipt, ledger, and return reconciliation."] },
      { heading: "Do not hide discrepancies with arbitrary adjustments", paragraphs: ["Small rounding differences can accumulate across channels if ecommerce, marketplace, ERP, and filing software use different rules. Reconcile a sample of orders by jurisdiction and preserve configuration changes with effective dates.", "If collected tax differs from tax due, follow the revenue authority's correction, refund, or remittance process. Do not keep an unexplained plug amount just because each transaction difference is small."] },
    ],
    checklist: ["Jurisdiction rounding authority", "Precision carried", "Item or invoice level", "Half-cent rule", "POS and ERP alignment", "Return reconciliation", "Configuration effective date"],
    sources: [{ label: "Florida Department of Revenue — sales-tax rounding", url: FL_ROUNDING }, { label: "New York Tax Department — rate and nearest-cent calculation", url: NY_RATE }],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuidesForTool(toolSlug: string) {
  return guides.filter((guide) => guide.relatedTools.includes(toolSlug));
}

export const guideCategories = ["Federal income", "1099 & self-employment", "Sales tax"] as const;
