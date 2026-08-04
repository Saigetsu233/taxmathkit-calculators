import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="TaxMathKit home">
          <span className="brand-mark" aria-hidden="true">T</span>
          <span>TaxMathKit</span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <Link href="/#calculators">Calculators</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
        <Link href="/tools/income-tax-calculator" className="header-cta">Start calculating <span aria-hidden="true">→</span></Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="brand footer-brand"><span className="brand-mark" aria-hidden="true">T</span><span>TaxMathKit</span></div>
          <p>Transparent tax calculators built from published formulas and primary sources.</p>
        </div>
        <div><strong>Tools</strong><Link href="/tools/income-tax-calculator">Federal income tax</Link><Link href="/tools/1099-tax-calculator">1099 tax</Link><Link href="/tools/reverse-sales-tax-calculator">Reverse tax</Link></div>
        <div><strong>Learn</strong><Link href="/guides">Guides</Link><Link href="/methodology">Methodology</Link><Link href="/disclaimer">Disclaimer</Link></div>
        <div><strong>Legal</strong><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><a href="mailto:hello@taxmathkit.com">Contact</a></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 TaxMathKit</span><span>Estimates for education and planning—not tax advice.</span></div>
    </footer>
  );
}

