import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCalculator } from "../../components/ToolCalculator";
import { getTool } from "../../lib/tools";

const embeddableSlugs = ["income-tax-calculator", "1099-tax-calculator", "self-employment-tax-calculator", "sales-tax-calculator"];

export function generateStaticParams() { return embeddableSlugs.map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = getTool(slug);
  return { title: tool ? `Embed ${tool.title}` : "TaxMathKit calculator", robots: { index: false, follow: true } };
}

export default async function EmbeddedTaxCalculator({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!embeddableSlugs.includes(slug)) notFound();
  const tool = getTool(slug);
  if (!tool) notFound();
  return <div className="embed-page"><header className="embed-header"><div><span className="brand-mark" aria-hidden="true">T</span><strong>{tool.title}</strong></div><Link href={`/tools/${slug}`} target="_blank">Open full method ↗</Link></header><div className="embed-calculator"><ToolCalculator slug={slug} embedded /></div><footer className="embed-footer"><Link href="/" target="_blank">Powered by TaxMathKit · transparent tax formulas</Link></footer></div>;
}
