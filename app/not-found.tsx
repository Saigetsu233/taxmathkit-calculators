import Link from "next/link";
export default function NotFound() { return <div className="shell empty-page"><span className="eyebrow">404</span><h1>That number is not on this worksheet.</h1><p>The page may have moved, but the calculator library is ready.</p><Link className="button primary" href="/#calculators">Browse calculators</Link></div>; }
