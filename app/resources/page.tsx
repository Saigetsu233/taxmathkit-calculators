import type { Metadata } from "next";
import { PrintButton } from "../components/PrintButton";

export const metadata: Metadata = { title: "Tax Tables & Downloadable Checklists", description: "Download source-linked federal bracket tables, the 92.35% self-employment tax flow, a 1099 quarterly checklist, and official state tax agency links.", alternates: { canonical: "/resources" } };

const resources = [
  { title: "2025–2026 federal brackets", file: "/downloads/federal-tax-brackets-2025-2026.csv", format: "CSV · 56 bracket rows", description: "All four filing statuses, progressive band boundaries, standard deductions, review date, and IRS source URL." },
  { title: "Self-employment tax 92.35% flow", file: "/downloads/self-employment-tax-9235-flow.csv", format: "CSV · 7-step formula", description: "A citeable path from net profit through the SE-tax base, Social Security, Medicare, and the employer-equivalent-half adjustment." },
  { title: "1099 quarterly payment checklist", file: "/downloads/1099-quarterly-payment-checklist.csv", format: "CSV · printable checklist", description: "A practical year-round workflow with the four 2026 federal planning dates and direct Publication 505 references." },
  { title: "Official state sales-tax entrances", file: "/downloads/us-state-sales-tax-official-links.csv", format: "CSV · 50 states + DC", description: "Direct tax-agency entrances and warnings for states whose systems differ from a conventional statewide retail sales tax." },
];

export default function ResourcesPage() {
  return <div className="shell content-page resource-page"><span className="eyebrow">Free reference assets</span><h1>Tables and checklists worth linking to.</h1><p className="lead">Every file includes a review date, scope note, and source trail. Download, cite, adapt, or embed them—but verify official instructions before a filing or payment decision.</p><div className="resource-grid">{resources.map((resource) => <article key={resource.file}><span>{resource.format}</span><h2>{resource.title}</h2><p>{resource.description}</p><a className="button primary" href={resource.file} download>Download CSV</a></article>)}</div><section className="print-reference"><div><span className="eyebrow">Printable 1099 checklist</span><h2>Revenue → expenses → profit → two tax layers → safe harbor → payment record</h2><p>Keep invoices and expenses reconciled, forecast full-year profit, estimate income tax and self-employment tax separately, compare the current-year and prior-year safe-harbor methods, then retain each payment confirmation.</p></div><PrintButton /></section><p className="resource-citation">Suggested citation: “TaxMathKit reference asset, reviewed August 6, 2026,” followed by the canonical resources URL and the official source named inside the file.</p></div>;
}
