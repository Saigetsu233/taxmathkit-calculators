import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCalculator } from "../../components/ToolCalculator";
import { getQuestion, questions } from "../../lib/questions";
import { getTool } from "../../lib/tools";

export function generateStaticParams() {
  return questions.map((question) => ({ slug: question.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) return {};
  return {
    title: question.title,
    description: question.description,
    keywords: [question.title, question.category, "tax calculator", "TaxMathKit"],
    alternates: { canonical: `/questions/${question.slug}` },
    openGraph: { title: question.title, description: question.description, url: `/questions/${question.slug}`, type: "article" },
  };
}

export default async function QuestionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = getQuestion(slug);
  if (!question) notFound();
  const tool = getTool(question.toolSlug);
  const structuredData = [
    { "@context": "https://schema.org", "@type": "Article", headline: question.title, description: question.description, datePublished: "2026-08-07", dateModified: "2026-08-07", mainEntityOfPage: `https://taxmathkit.com/questions/${question.slug}`, author: { "@type": "Person", name: "Saigetsu233", url: "https://taxmathkit.com/about" }, publisher: { "@type": "Organization", name: "TaxMathKit", url: "https://taxmathkit.com" } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: question.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://taxmathkit.com" }, { "@type": "ListItem", position: 2, name: "Tax questions", item: "https://taxmathkit.com/questions" }, { "@type": "ListItem", position: 3, name: question.title, item: `https://taxmathkit.com/questions/${question.slug}` }] },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="shell breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/questions">Tax questions</Link><span>/</span><span>{question.category}</span></div>
      <article className="shell question-page">
        <header className="question-hero"><span className="eyebrow">{question.category} · {question.intent}</span><h1>{question.title}</h1><p className="lead">{question.description}</p><div className="question-answer"><strong>Short answer</strong><p>{question.shortAnswer}</p></div></header>
        <section className="question-calculator" id="calculator"><div className="section-heading compact"><div><span className="eyebrow">Calculate the scenario</span><h2>{tool?.title ?? "Tax calculator"}</h2></div><p>Change the prefilled example to match your situation. Inputs stay in your browser.</p></div>{tool ? <ToolCalculator slug={tool.slug} /> : null}</section>
        <div className="article-grid question-content"><article className="article-main"><section><h2>Why this answer depends on your details</h2><p>{question.whyItMatters}</p></section><section><h2>How to work through it</h2><ol>{question.steps.map((step) => <li key={step}>{step}</li>)}</ol></section><section className="tool-mistakes"><span className="eyebrow">Error check</span><h2>Common mistakes</h2><ul>{question.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}</ul></section><section><h2>Frequently asked questions</h2><div className="faq-list">{question.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section></article><aside className="source-panel"><span className="eyebrow">Verify before relying on it</span><h2>Primary sources</h2><p>TaxMathKit provides a planning estimate. Confirm the current rule, year, jurisdiction, and facts before filing, collecting, or paying.</p>{question.sources.map((source) => <a href={source.url} key={source.url} target="_blank" rel="noreferrer"><span>{source.label}</span><span aria-hidden="true">↗</span></a>)}{tool ? <Link href={`/tools/${tool.slug}`}>Open the full calculator page <span aria-hidden="true">→</span></Link> : null}</aside></div>
        <section className="question-related"><div className="section-heading compact"><div><span className="eyebrow">Keep researching</span><h2>Related TaxMathKit answers</h2></div></div><div className="guide-card-grid">{question.relatedGuides.map((guideSlug) => <Link className="guide-card" href={`/guides/${guideSlug}`} key={guideSlug}><h3>{guideSlug.replaceAll("-", " ")}</h3><strong>Read the related guide →</strong></Link>)}</div></section>
      </article>
    </>
  );
}
