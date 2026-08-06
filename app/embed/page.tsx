import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Tax Calculator Embeds",
  description: "Add transparent federal income, 1099, self-employment, or sales-tax calculators to a finance article or creator resource.",
  alternates: { canonical: "/embed" },
};

const calculators = [
  { slug: "income-tax-calculator", title: "Federal Income Tax Calculator", description: "Estimate federal ordinary income tax with filing status, standard deduction, and visible brackets.", height: 820 },
  { slug: "1099-tax-calculator", title: "1099 Tax Calculator", description: "Separate business profit, self-employment tax, federal income tax, withholding, and quarterly reserve.", height: 900 },
  { slug: "self-employment-tax-calculator", title: "Self-Employment Tax Calculator", description: "Apply the 92.35% base, Social Security wage-base room, Medicare, and the deductible half.", height: 820 },
  { slug: "sales-tax-calculator", title: "Sales Tax Calculator", description: "Add a verified combined state and local sales-tax rate to a price and see the tax separately.", height: 780 },
];

export default function EmbedDirectoryPage() {
  return <div className="publisher-page"><section className="shell publisher-hero"><span className="eyebrow">Free embeds for finance publishers</span><h1>Put a transparent tax answer inside your article.</h1><p>Each iframe is hosted by TaxMathKit, runs calculations in the reader&apos;s browser, and links back to the full formula, assumptions, and primary sources. No API key or account is required.</p><div className="publisher-actions"><Link className="button primary" href="/resources/for-publishers">Open the publisher kit ↗</Link><Link className="text-link" href="/resources">Download reference assets</Link></div></section><section className="shell embed-directory" aria-labelledby="embed-heading"><div className="section-heading"><div><span className="eyebrow">Paste-ready iframe sources</span><h2 id="embed-heading">Choose the calculation your readers need</h2></div><p>Keep the title attribute and attribution link when you publish. Rates, assumptions, and source notes remain visible on the hosted calculator.</p></div><div className="embed-directory-grid">{calculators.map((calculator) => { const url = `https://taxmathkit.com/embed/${calculator.slug}`; const code = `<iframe src="${url}" title="${calculator.title}" width="100%" height="${calculator.height}" loading="lazy" style="border:0"></iframe>`; return <article className="embed-directory-card" key={calculator.slug}><span className="eyebrow">{calculator.slug.replaceAll("-", " ")}</span><h3>{calculator.title}</h3><p>{calculator.description}</p><pre><code>{code}</code></pre><div className="embed-directory-actions"><Link className="button primary" href={`/embed/${calculator.slug}`}>Preview embed ↗</Link><a className="text-link" href={url}>Open direct URL</a></div></article>; })}</div></section><section className="shell publisher-note"><h2>Attribution that keeps tax estimates honest</h2><p>Use wording such as: “Calculation powered by <a href="https://taxmathkit.com">TaxMathKit</a>; see the <a href="https://taxmathkit.com/methodology">formula and source method</a>.” The result is an educational planning estimate, not tax, legal, or financial advice.</p></section></div>;
}
