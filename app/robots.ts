import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://taxmathkit.com/sitemap.xml", host: "https://taxmathkit.com" }; }
