import type { Metadata } from "next";
import Link from "next/link";
import { guideCategories, guides } from "../lib/guides";

export const metadata: Metadata = {
  title: "Tax Guides — Worked Examples, Formulas & Common Mistakes",
  description: "Practical tax guides for federal income tax, 1099 and self-employment tax, and sales tax. Each guide uses a distinct example, formula, comparison, or error check.",
  alternates: { canonical: "/guides" },
  openGraph: { title: "TaxMathKit tax guides", description: "Worked examples, formula explanations, common mistakes, and comparison guides linked to transparent calculators.", url: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="shell content-page guide-index-page">
      <span className="eyebrow">Plain-English references</span>
      <h1>Tax guides built around the question you are actually asking</h1>
      <p className="lead">Twelve focused guides—one real problem per page. Use a worked example, inspect the formula, catch a common error, or compare two methods before opening the linked calculator.</p>
      <nav className="guide-category-nav" aria-label="Guide topics">{guideCategories.map((category) => <a key={category} href={`#${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{category}</a>)}</nav>
      {guideCategories.map((category) => {
        const categoryGuides = guides.filter((guide) => guide.category === category);
        const id = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return <section className="guide-category" id={id} key={category}><div className="section-heading compact"><div><span className="eyebrow">4 independent answers</span><h2>{category}</h2></div><p>Worked example · formula · mistakes · comparison</p></div><div className="guide-card-grid">{categoryGuides.map((guide) => <Link href={`/guides/${guide.slug}`} className="guide-card" key={guide.slug}><div><span>{guide.intent}</span><span>{guide.readTime}</span></div><h3>{guide.title}</h3><p>{guide.description}</p><strong>Read the guide →</strong></Link>)}</div></section>;
      })}
    </div>
  );
}
