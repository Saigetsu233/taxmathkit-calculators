"use client";

import { useState } from "react";

export function EmbedPanel({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const code = `<iframe src="https://taxmathkit.com/embed/${slug}" title="${title}" width="100%" height="760" loading="lazy" style="border:0"></iframe>`;

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="shell embed-panel">
      <div><span className="eyebrow">Free to embed</span><h2>Use this calculator in your article.</h2><p>Paste one iframe into a finance article, freelancer guide, or business knowledge base. TaxMathKit hosts and updates the calculator; no API key is required.</p></div>
      <div className="embed-code-block"><code>{code}</code><div className="embed-actions"><button type="button" className="button primary" onClick={copyCode}>{copied ? "Embed code copied ✓" : "Copy embed code"}</button><a href="https://github.com/Saigetsu233/taxmathkit-calculators" target="_blank" rel="noopener noreferrer">Formula source on GitHub ↗</a></div></div>
    </section>
  );
}
