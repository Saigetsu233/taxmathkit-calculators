import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is TaxMathKit?",
  description: "TaxMathKit is an independent tax calculator website maintained by Saigetsu233, with transparent formulas, assumptions, and primary sources.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="shell content-page about-page">
      <span className="eyebrow">What is TaxMathKit?</span>
      <h1>An independent tax calculator website you can inspect.</h1>
      <p className="lead">TaxMathKit is an independent website of browser-based tax calculators maintained by Saigetsu233. Each tool shows its formula, tax year, assumptions, exclusions, and links to primary government sources.</p>
      <section className="about-callout"><p><strong>TaxMathKit</strong> refers to this site at <a href="https://taxmathkit.com">taxmathkit.com</a> and its open formula project. It is not a tax authority, filing service, accounting firm, or product from another company with a similar name.</p></section>
      <section className="prose-section">
        <h2>What the project does</h2>
        <p>It turns published schedules and rules into transparent planning calculators for federal income tax, 1099 and self-employment income, sales tax, capital gains, quarterly payments, vehicle tax, and VAT.</p>
        <h2>How it is maintained</h2>
        <p>Saigetsu233 reviews source links, separates tax years, tests core formulas, and records material changes in the public version log. Calculator inputs stay in the browser and are not intentionally sent to TaxMathKit analytics.</p>
        <h2>Open formula source</h2>
        <p>The corresponding formula library is public on <a href="https://github.com/Saigetsu233/taxmathkit-calculators">GitHub</a>. The repository includes examples, tests, and citation guidance.</p>
        <div className="method-actions">
          <Link className="button primary" href="/#calculators">Browse calculators</Link>
          <Link className="button" href="/methodology">Read the methodology</Link>
          <Link className="button" href="/changelog">View the version log</Link>
        </div>
      </section>
    </div>
  );
}
