import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guides } from "../../lib/guides";
import { getTool } from "../../lib/tools";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    keywords: [guide.category, guide.intent, ...guide.relatedTools.map((toolSlug) => getTool(toolSlug)?.primaryKeyword).filter((keyword): keyword is string => Boolean(keyword))],
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description, url: `/guides/${guide.slug}`, type: "article" },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const relatedTools = guide.relatedTools.map((toolSlug) => getTool(toolSlug)).filter((tool) => Boolean(tool));
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: "2026-08-06",
      dateModified: "2026-08-06",
      mainEntityOfPage: `https://taxmathkit.com/guides/${guide.slug}`,
      author: { "@type": "Organization", name: "TaxMathKit", url: "https://taxmathkit.com" },
      publisher: { "@type": "Organization", name: "TaxMathKit", url: "https://taxmathkit.com" },
      about: guide.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://taxmathkit.com" },
        { "@type": "ListItem", position: 2, name: "Tax guides", item: "https://taxmathkit.com/guides" },
        { "@type": "ListItem", position: 3, name: guide.title, item: `https://taxmathkit.com/guides/${guide.slug}` },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="shell breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/guides">Guides</Link><span>/</span><span>{guide.category}</span></div>
      <article className="shell guide-article">
        <header className="guide-hero">
          <span className="eyebrow">{guide.category} · {guide.intent} · {guide.readTime}</span>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
          <div className="guide-takeaway"><strong>Bottom line</strong><p>{guide.takeaway}</p></div>
          {relatedTools[0] ? <Link className="button primary guide-hero-action" href={`/tools/${guide.relatedTools[0]}`}>Open the calculator with a prefilled example ↓</Link> : null}
        </header>
        <div className="article-grid guide-layout">
          <div className="article-main guide-body">
            {guide.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}</section>)}
            <section className="guide-checklist"><h2>Working checklist</h2><ul>{guide.checklist.map((item) => <li key={item}>{item}</li>)}</ul></section>
          </div>
          <aside className="source-panel">
            <span className="eyebrow">Primary sources</span>
            <h2>Verify the rule</h2>
            <p>Open the tax-authority material and confirm the year, facts, and jurisdiction before filing, collecting, or paying.</p>
            {guide.sources.map((source) => <a href={source.url} key={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><span aria-hidden="true">↗</span></a>)}
            <Link href="/methodology">How TaxMathKit maintains calculators <span aria-hidden="true">→</span></Link>
          </aside>
        </div>
      </article>
      <section className="section section-tint guide-tools"><div className="shell"><div className="section-heading compact"><div><span className="eyebrow">Apply the guide</span><h2>Run the numbers with the assumptions visible</h2></div></div><div className="tool-grid">{relatedTools.map((tool) => tool ? <Link className="tool-card" href={`/tools/${tool.slug}`} key={tool.slug}><div className="card-topline"><span>{tool.category}</span><span className="badge">{tool.taxYear}</span></div><h3>{tool.title}</h3><p>{tool.description}</p><div className="card-footer"><span>{tool.badge}</span><strong>Calculate →</strong></div></Link> : null)}</div></div></section>
    </>
  );
}
