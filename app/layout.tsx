import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Manrope, Source_Serif_4 } from "next/font/google";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "taxmathkit.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  return {
    metadataBase,
    title: { default: "TaxMathKit — Transparent Tax Calculators", template: "%s | TaxMathKit" },
    description: "Fast tax calculators built from published formulas, with assumptions and primary sources attached.",
    applicationName: "TaxMathKit",
    openGraph: {
      type: "website",
      siteName: "TaxMathKit",
      title: "TaxMathKit — Tax math you can inspect.",
      description: "12 transparent calculators for federal income, 1099 work, sales tax, capital gains and more.",
      images: [{ url: "/og.png", width: 1536, height: 1024, alt: "TaxMathKit — Tax math you can inspect" }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#102a43" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body><SiteHeader /><main>{children}</main><SiteFooter /></body>
    </html>
  );
}
