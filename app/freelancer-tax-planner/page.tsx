import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { ToolCalculator } from "../components/ToolCalculator";

export const metadata: Metadata = {
  title: "Freelancer Tax Planner — Per-Payment 1099 Reserve",
  description: "Plan how much to set aside from each 1099 payment using business profit, withholding, federal tax and self-employment tax estimates.",
  alternates: { canonical: "/freelancer-tax-planner" },
  openGraph: { title: "Freelancer Tax Planner | TaxMathKit", description: "Turn a 1099 tax estimate into a quarterly and per-payment reserve plan." },
};

const questions = [
  ["/questions/how-much-to-set-aside-for-1099-taxes", "How much should I set aside for 1099 taxes?"],
  ["/questions/quarterly-tax-payment-for-freelancers", "How much should a freelancer pay quarterly?"],
  ["/questions/1099-taxes-with-a-w2-job", "How does a W-2 job change my 1099 reserve?"],
  ["/questions/tax-on-50000-freelance-income", "What tax might apply to $50,000 of freelance income?"],
];

export default function FreelancerTaxPlanner() {
  return (
    <main>
      <SiteHeader />
      <div className="shell breadcrumb"><Link href="/">Home</Link><span>/</span><span>Freelancer planner</span></div>
      <article className="shell content-page">
        <p className="eyebrow">A cash-flow workflow for independent work</p>
        <h1>Plan the reserve before the 1099 payment arrives.</h1>
        <p className="article-deck">A gross-receipts percentage is easy to repeat and easy to get wrong. TaxMathKit separates business profit, self-employment tax, federal income tax and withholding, then converts the remaining planning amount into a quarterly target and a suggested transfer from a typical payment.</p>
        <section className="calculator-section" aria-labelledby="planner-calculator">
          <div className="section-heading compact"><div><p className="eyebrow">Start with a worked example</p><h2 id="planner-calculator">Your 1099 cash-flow estimate</h2></div><p>Change only the inputs you know. State tax, credits and exact safe-harbor rules remain explicit follow-up checks.</p></div>
          <ToolCalculator slug="1099-tax-calculator" />
        </section>
        <section className="principle-grid">
          <article><span>01</span><h2>Use profit, not the invoice total</h2><p>Start with revenue and ordinary business expenses. The reserve rate is shown against 1099 receipts so each payment can be handled consistently, while the tax estimate itself is built from profit.</p></article>
          <article><span>02</span><h2>Keep withholding in the picture</h2><p>W-2 withholding reduces the amount still to plan for. Enter it instead of treating a second job as unrelated income.</p></article>
          <article><span>03</span><h2>Turn the estimate into a habit</h2><p>Use the suggested reserve from a typical payment as a transfer target, then compare it with the quarterly installment and your actual year-to-date numbers.</p></article>
        </section>
        <section className="prose-section"><p className="eyebrow">Questions this workflow answers</p><h2>Find the situation that matches your income.</h2><div className="question-preview-grid">{questions.map(([href, title]) => <Link className="question-preview-card" href={href} key={href}><h3>{title}</h3><strong>Read the answer →</strong></Link>)}</div></section>
        <section className="prose-section"><p className="eyebrow">Method and boundaries</p><h2>A planning estimate is not a payment voucher.</h2><p>The result is a transparent federal planning estimate based on the selected filing status, 2026 brackets, self-employment tax mechanics and entered withholding. Check current IRS instructions, prior-year safe-harbor rules, state obligations, local taxes, credits, retirement contributions and business-specific deductions before filing or paying.</p><Link className="button primary" href="/methodology">Read the calculation methodology →</Link></section>
      </article>
      <SiteFooter />
    </main>
  );
}
