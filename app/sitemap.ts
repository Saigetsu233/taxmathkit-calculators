import type { MetadataRoute } from "next";
import { guides } from "./lib/guides";
import { tools } from "./lib/tools";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://taxmathkit.com";
  const staticPaths = ["", "/guides", "/methodology", "/privacy", "/terms", "/disclaimer"];
  const lastModified = new Date("2026-08-06");
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}`, lastModified, changeFrequency: path ? "monthly" as const : "weekly" as const, priority: path ? 0.6 : 1 })),
    ...tools.map((tool) => ({ url: `${base}/tools/${tool.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...guides.map((guide) => ({ url: `${base}/guides/${guide.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
