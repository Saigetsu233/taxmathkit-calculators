import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCalculator } from "../../components/ToolCalculator";
import { getGuidesForTool } from "../../lib/guides";
import { getTool, tools } from "../../lib/tools";

const freightRecommendations: Record<string, { title: string; description: string; href: string; label: string }> = {
  "sales-tax-calculator": {
    title: "Put sales tax inside the full order economics.",
    description: "Use ShipMathLab to combine selling price, product cost, shipping, packaging, marketplace fees, and advertising in one margin estimate.",
    href: "https://shipmathlab.com/tools/ecommerce-margin-calculator?utm_source=taxmathkit&utm_medium=referral&utm_campaign=tool-network",
    label: "Open the ecommerce margin calculator",
  },
  "reverse-sales-tax-calculator": {
    title: "Recovered the pre-tax price? Check the margin next.",
    description: "ShipMathLab turns that price into an ecommerce contribution-margin estimate with shipping, packaging, fees, and advertising included.",
    href: "https://shipmathlab.com/tools/ecommerce-margin-calculator?utm_source=taxmathkit&utm_medium=referral&utm_campaign=tool-network",
    label: "Continue with ShipMathLab",
  },
  "vat-calculator": {
    title: "Model VAT alongside freight and landed cost.",
    description: "ShipMathLab helps importers combine goods, freight, insurance, duty, import tax, clearance fees, and quantity in a transparent landed-cost estimate.",
    href: "https://shipmathlab.com/tools/landed-cost-calculator?utm_source=taxmathkit&utm_medium=referral&utm_campaign=tool-network",
    label: "Open the landed-cost calculator",
  },
};

export function generateStaticParams() { return tools.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) return {};
  return {
    title: tool.title,
    description: tool.metaDescription,
    keywords: [tool.primaryKeyword, ...tool.keywords],
    alternates: { canonical: `/tools/${tool.slug}` },
    openGraph: { title: tool.title, description: tool.metaDescription, url: `/tools/${tool.slug}` },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();
  const related = tool.related.map((relatedSlug) => getTool(relatedSlug)).filter(Boolean);
  const guides = getGuidesForTool(tool.slug);
  const freightRecommendation = freightRecommendations[tool.slug];
  const jsonLd = [{
    "@context": "https://schema.org", "@type": "WebApplication", name: tool.title,
    applicationCategory: "FinanceApplication", operatingSystem: "Any", isAccessibleForFree: true,
    description: tool.metaDescription, url: `https://taxmathkit.com/tools/${tool.slug}`,
  }, {
    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="shell breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/#calculators">Calculators</Link><span>/</span><span>{tool.title}</span></div>
      <section className="tool-hero shell">
        <div><span className="eyebrow">{tool.eyebrow}</span><h1>{tool.title}</h1><p>{tool.description}</p><div className="tool-meta"><span>{tool.badge}</span><span>Rates: {tool.taxYear}</span><span>Updated {tool.updated}</span></div></div>
        <aside><strong>Before you calculate</strong><p>This is an educational planning estimate. Review the assumptions below and verify the result for filing or payment decisions.</p><Link href="#sources">View primary sources ↓</Link></aside>
      </section>
      <section className="shell calculator-section"><ToolCalculator slug={tool.slug} /></section>
      {freightRecommendation ? <section className="shell network-inline"><div><span>Related shipping calculation · ShipMathLab</span><h2>{freightRecommendation.title}</h2><p>{freightRecommendation.description}</p></div><a href={freightRecommendation.href}>{freightRecommendation.label} <span aria-hidden="true">→</span></a></section> : null}
      <section className="shell article-grid">
        <article className="article-main">
          <span className="eyebrow">How it works</span><h2>{tool.formulaTitle}</h2>
          <div className="formula-box"><span>Formula</span><p>{tool.formula}</p></div>
          {tool.explanation.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <h2>Assumptions and limits</h2><ul className="check-list">{tool.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul>
          {tool.workedExample ? <section className="tool-example"><span className="eyebrow">Worked example</span><h2>{tool.workedExample.title}</h2><ol>{tool.workedExample.steps.map((step) => <li key={step}>{step}</li>)}</ol><p><strong>Result:</strong> {tool.workedExample.result}</p></section> : null}
          {tool.commonMistakes?.length ? <section className="tool-mistakes"><span className="eyebrow">Error check</span><h2>Common mistakes that change the result</h2><ul>{tool.commonMistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section> : null}
          <div className="warning-box"><strong>Planning estimate, not tax advice</strong><p>Tax law depends on facts this tool cannot collect. Do not use the result as the sole basis for filing, withholding or payment decisions.</p></div>
          <h2>Frequently asked questions</h2><div className="faq-list">{tool.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </article>
        <aside className="source-panel" id="sources"><span className="eyebrow">Source trail</span><h2>Check the inputs</h2><p>We prefer primary government and tax-authority material. Open the sources and confirm they fit your situation.</p>{tool.sources.map((source) => <a href={source.url} key={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><span aria-hidden="true">↗</span></a>)}<Link href="/methodology">How we maintain calculators <span aria-hidden="true">→</span></Link></aside>
      </section>
      {guides.length ? <section className="section section-tint guide-cluster"><div className="shell"><div className="section-heading compact"><div><span className="eyebrow">Topic cluster</span><h2>Examples and explanations for this calculator</h2></div><p>Each guide answers a different question and links back to the same transparent calculation.</p></div><div className="guide-card-grid">{guides.map((guide) => <Link className="guide-card" href={`/guides/${guide.slug}`} key={guide.slug}><div><span>{guide.intent}</span><span>{guide.readTime}</span></div><h3>{guide.title}</h3><p>{guide.description}</p><strong>Read the guide →</strong></Link>)}</div></div></section> : null}
      <section className="section section-tint"><div className="shell"><div className="section-heading compact"><div><span className="eyebrow">Related calculators</span><h2>Keep working through the numbers</h2></div></div><div className="tool-grid">{related.map((item) => item ? <Link className="tool-card" href={`/tools/${item.slug}`} key={item.slug}><div className="card-topline"><span>{item.category}</span><span className="badge">{item.taxYear}</span></div><h3>{item.title}</h3><p>{item.description}</p><div className="card-footer"><span>{item.badge}</span><strong>Calculate →</strong></div></Link> : null)}</div></div></section>
    </>
  );
}
