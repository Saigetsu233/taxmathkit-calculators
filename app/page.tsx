import type { Metadata } from "next";
import Link from "next/link";
import { categories, tools } from "./lib/tools";

export const metadata: Metadata = {
  title: "Transparent Tax Calculators",
  description: "12 free tax calculators for federal income, paychecks, 1099 work, sales tax, capital gains, lottery winnings, VAT and more.",
  alternates: { canonical: "/" },
};

const featured = ["income-tax-calculator", "1099-tax-calculator", "reverse-sales-tax-calculator"];

function ToolCard({ tool, prominent = false }: { tool: (typeof tools)[number]; prominent?: boolean }) {
  return (
    <Link className={prominent ? "tool-card featured-card" : "tool-card"} href={`/tools/${tool.slug}`}>
      <div className="card-topline"><span>{tool.category}</span><span className="badge">{tool.badge}</span></div>
      <h3>{tool.title}</h3><p>{tool.description}</p>
      <div className="card-footer"><span>{tool.taxYear}</span><strong>Calculate <span aria-hidden="true">→</span></strong></div>
    </Link>
  );
}

export default function Home() {
  const featuredTools = featured.map((slug) => tools.find((tool) => tool.slug === slug)!);
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Free calculators · Sources attached</span>
            <h1>Tax math you can <em>inspect.</em></h1>
            <p>Fast calculators for federal income, 1099 work, sales tax, capital gains and more—built from published formulas with every assumption in plain English.</p>
            <div className="hero-actions"><Link className="button primary" href="/tools/income-tax-calculator">Calculate federal tax</Link><Link className="button secondary" href="#calculators">Browse all 12 tools</Link></div>
            <div className="trust-line"><span>2025–2026 rates</span><span>No sign-up</span><span>Inputs stay in your browser</span></div>
          </div>
          <div className="formula-panel" aria-label="Example progressive tax calculation">
            <div className="formula-head"><span>Example worksheet</span><span className="live-dot">Updated 2026</span></div>
            <div className="formula-row"><span>Gross income</span><strong>$85,000</strong></div>
            <div className="formula-row muted"><span>Standard deduction</span><strong>− $16,100</strong></div>
            <div className="formula-rule" />
            <div className="formula-row"><span>Taxable income</span><strong>$68,900</strong></div>
            <div className="bracket-bars"><span style={{ width: "24%" }}>10%</span><span style={{ width: "49%" }}>12%</span><span style={{ width: "27%" }}>22%</span></div>
            <div className="formula-total"><span>Estimated federal tax</span><strong>$9,870</strong><small>Effective rate: 11.6%</small></div>
            <p>Each bracket applies only to the income inside it.</p>
          </div>
        </div>
      </section>

      <section className="proof-strip"><div className="shell proof-grid"><div><strong>12</strong><span>focused calculators</span></div><div><strong>0</strong><span>accounts required</span></div><div><strong>Primary</strong><span>government sources</span></div><div><strong>Visible</strong><span>formulas & limits</span></div></div></section>

      <section className="section shell" aria-labelledby="featured-heading">
        <div className="section-heading"><div><span className="eyebrow">Start here</span><h2 id="featured-heading">The three questions people ask most</h2></div><p>Broad tax estimates, freelance income and tax-inclusive prices—three different engines, not recycled landing pages.</p></div>
        <div className="featured-grid">{featuredTools.map((tool) => <ToolCard key={tool.slug} tool={tool} prominent />)}</div>
      </section>

      <section className="section section-tint" id="calculators">
        <div className="shell">
          <div className="section-heading"><div><span className="eyebrow">Calculator library</span><h2>Choose the exact job</h2></div><p>Every result includes the formula, assumptions, limitations and links to the underlying source.</p></div>
          {categories.map((category) => {
            const categoryTools = tools.filter((tool) => tool.category === category);
            if (!categoryTools.length) return null;
            return <div className="category-block" key={category}><h3 className="category-title">{category}</h3><div className="tool-grid">{categoryTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}</div></div>;
          })}
        </div>
      </section>

      <section className="section shell method-preview">
        <div className="method-copy"><span className="eyebrow">Built for verification</span><h2>The answer is useful only if you can see how it was made.</h2><p>TaxMathKit puts the formula beside the calculator, names what is excluded, dates the rate set and links back to official IRS, state or tax-authority material.</p><Link className="text-link" href="/methodology">Read our calculation methodology <span aria-hidden="true">→</span></Link></div>
        <ol className="method-steps"><li><span>01</span><div><strong>Start with the right tax base</strong><p>Gross income, taxable income and business profit are not interchangeable.</p></div></li><li><span>02</span><div><strong>Apply published thresholds</strong><p>Brackets, deductions and wage bases are versioned by tax year.</p></div></li><li><span>03</span><div><strong>Show the boundaries</strong><p>Credits, phaseouts and local rules are called out instead of hidden.</p></div></li></ol>
      </section>

      <section className="network-band">
        <div className="shell network-band-inner">
          <div><span className="eyebrow">More tools from the same maker</span><h2>Working through shipping costs too?</h2><p>ShipMathLab provides transparent calculators for dimensional weight, freight, landed cost, pallet loads, and ecommerce margin.</p></div>
          <a className="button network-button" href="https://shipmathlab.com/?utm_source=taxmathkit&utm_medium=referral&utm_campaign=tool-network">Explore ShipMathLab <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="cta-band"><div className="shell"><div><span className="eyebrow light">No account. No black box.</span><h2>Make the estimate, then inspect it.</h2></div><Link className="button cream" href="/tools/income-tax-calculator">Open the federal calculator</Link></div></section>
    </>
  );
}
