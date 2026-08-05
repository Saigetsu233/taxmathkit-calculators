/** Cloudflare Worker entry point for TaxMathKit. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  ANALYTICS_REPORT_KEY: string;
  ANALYTICS_SALT: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const encoder = new TextEncoder();
const crawlerSignatures = [
  { name: "OpenAI Search", patterns: ["oai-searchbot", "chatgpt-user"] },
  { name: "Perplexity", patterns: ["perplexitybot", "perplexity-user"] },
  { name: "Google", patterns: ["googlebot"] },
  { name: "Bing", patterns: ["bingbot"] },
  { name: "Anthropic", patterns: ["claudebot", "claude-web"] },
  { name: "Apple", patterns: ["applebot"] },
  { name: "Common Crawl", patterns: ["ccbot"] },
] as const;

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return result === 0;
}

function normalizedPath(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("/")) return null;
  const path = value.split(/[?#]/, 1)[0].slice(0, 240);
  if (path.startsWith("/api/") || path.startsWith("/_")) return null;
  return path;
}

function normalizedHost(value: unknown) {
  if (typeof value !== "string" || !value) return "";
  try { return new URL(value).hostname.toLowerCase().slice(0, 160); } catch { return ""; }
}

function normalizedCampaign(value: unknown) {
  return typeof value === "string" ? value.toLowerCase().trim().slice(0, 100) : "";
}

function detectCrawler(userAgent: string) {
  const value = userAgent.toLowerCase();
  return crawlerSignatures.find((entry) => entry.patterns.some((pattern) => value.includes(pattern)))?.name ?? "";
}

function classifySource(referrerHost: string, utmSource: string) {
  const source = `${utmSource} ${referrerHost}`.toLowerCase();
  if (source.includes("chatgpt") || source.includes("openai")) return "ChatGPT";
  if (source.includes("perplexity")) return "Perplexity";
  if (source.includes("copilot")) return "Copilot";
  if (source.includes("shipmathlab")) return "ShipMathLab";
  if (source.includes("google")) return "Google";
  if (source.includes("bing")) return "Bing";
  if (source.includes("github")) return "GitHub";
  if (source.includes("reddit")) return "Reddit";
  if (source.includes("linkedin")) return "LinkedIn";
  return referrerHost ? "Other referral" : "Direct / unknown";
}

async function visitorHash(date: string, request: Request, salt: string) {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const userAgent = request.headers.get("user-agent") ?? "unknown";
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(`${date}|${ip}|${userAgent}|${salt}`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function recordCrawler(request: Request, env: Env, crawler: string) {
  try {
    const path = normalizedPath(new URL(request.url).pathname);
    if (!env.DB || !path) return;
    await env.DB.prepare("INSERT INTO crawler_hits (event_date, crawler, path) VALUES (?, ?, ?)")
      .bind(new Date().toISOString().slice(0, 10), crawler, path).run();
  } catch { /* Analytics must not affect page delivery. */ }
}

async function recordAnalytics(request: Request, env: Env) {
  try {
    if (!env.DB || !env.ANALYTICS_SALT || Number(request.headers.get("content-length") ?? 0) > 2048) return new Response(null, { status: 204 });
    if (detectCrawler(request.headers.get("user-agent") ?? "")) return new Response(null, { status: 204 });
    const payload = await request.json() as { path?: unknown; eventType?: unknown; referrer?: unknown; isInternal?: unknown; utmSource?: unknown };
    const path = normalizedPath(payload.path);
    if (!path) return new Response(null, { status: 204 });
    const date = new Date().toISOString().slice(0, 10);
    const hash = await visitorHash(date, request, env.ANALYTICS_SALT);
    const internal = payload.isInternal === true ? 1 : 0;
    if (payload.eventType === "calculator_interaction" && path.startsWith("/tools/")) {
      await env.DB.prepare("INSERT INTO interaction_events (event_date, path, visitor_hash, is_internal) VALUES (?, ?, ?, ?)")
        .bind(date, path, hash, internal).run();
      return new Response(null, { status: 204 });
    }
    const referrerHost = normalizedHost(payload.referrer);
    await env.DB.prepare("INSERT INTO page_views (event_date, path, referrer_host, source_channel, visitor_hash, is_internal) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(date, path, referrerHost, classifySource(referrerHost, normalizedCampaign(payload.utmSource)), hash, internal).run();
  } catch { /* Analytics must not affect calculator use. */ }
  return new Response(null, { status: 204 });
}

async function analyticsReport(request: Request, env: Env) {
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!env.ANALYTICS_REPORT_KEY || !safeEqual(env.ANALYTICS_REPORT_KEY, supplied)) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const startDate = new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
  const rows = await env.DB.batch([
    env.DB.prepare("SELECT COUNT(*) views, COUNT(DISTINCT visitor_hash) daily_unique_visitors FROM page_views WHERE event_date >= ? AND is_internal = 0").bind(startDate),
    env.DB.prepare("SELECT COUNT(*) views, COUNT(DISTINCT visitor_hash) daily_unique_visitors FROM page_views WHERE event_date >= ? AND is_internal = 1").bind(startDate),
    env.DB.prepare("SELECT event_date date, COUNT(*) views, COUNT(DISTINCT visitor_hash) visitors FROM page_views WHERE event_date >= ? AND is_internal = 0 GROUP BY event_date ORDER BY event_date").bind(startDate),
    env.DB.prepare("SELECT event_date date, COUNT(*) views, COUNT(DISTINCT visitor_hash) visitors FROM page_views WHERE event_date >= ? AND is_internal = 1 GROUP BY event_date ORDER BY event_date").bind(startDate),
    env.DB.prepare("SELECT path, COUNT(*) views FROM page_views WHERE event_date >= ? AND is_internal = 0 GROUP BY path ORDER BY views DESC LIMIT 20").bind(startDate),
    env.DB.prepare("SELECT referrer_host host, COUNT(*) views FROM page_views WHERE event_date >= ? AND is_internal = 0 AND referrer_host <> '' GROUP BY referrer_host ORDER BY views DESC LIMIT 20").bind(startDate),
    env.DB.prepare("SELECT source_channel source, COUNT(*) views, COUNT(DISTINCT visitor_hash) daily_unique_visitors FROM page_views WHERE event_date >= ? AND is_internal = 0 GROUP BY source_channel ORDER BY views DESC LIMIT 20").bind(startDate),
    env.DB.prepare("SELECT COUNT(*) interactions, COUNT(DISTINCT visitor_hash) daily_unique_users FROM interaction_events WHERE event_date >= ? AND is_internal = 0").bind(startDate),
    env.DB.prepare("SELECT path, COUNT(*) interactions, COUNT(DISTINCT visitor_hash) daily_unique_users FROM interaction_events WHERE event_date >= ? AND is_internal = 0 GROUP BY path ORDER BY interactions DESC LIMIT 20").bind(startDate),
    env.DB.prepare("SELECT COUNT(*) requests FROM crawler_hits WHERE event_date >= ?").bind(startDate),
    env.DB.prepare("SELECT event_date date, COUNT(*) requests FROM crawler_hits WHERE event_date >= ? GROUP BY event_date ORDER BY event_date").bind(startDate),
    env.DB.prepare("SELECT crawler, COUNT(*) requests FROM crawler_hits WHERE event_date >= ? GROUP BY crawler ORDER BY requests DESC LIMIT 20").bind(startDate),
    env.DB.prepare("SELECT crawler, path, COUNT(*) requests FROM crawler_hits WHERE event_date >= ? GROUP BY crawler, path ORDER BY requests DESC LIMIT 30").bind(startDate),
  ]);
  return Response.json({
    period: { days: 30, startDate, endDate: new Date().toISOString().slice(0, 10) },
    totals: rows[0].results[0] ?? { views: 0, daily_unique_visitors: 0 },
    internalTotals: rows[1].results[0] ?? { views: 0, daily_unique_visitors: 0 },
    daily: rows[2].results,
    internalDaily: rows[3].results,
    topPages: rows[4].results,
    topReferrers: rows[5].results,
    sourceChannels: rows[6].results,
    calculatorInteractions: rows[7].results[0] ?? { interactions: 0, daily_unique_users: 0 },
    calculatorTopPages: rows[8].results,
    crawlerTotals: rows[9].results[0] ?? { requests: 0 },
    crawlerDaily: rows[10].results,
    topCrawlers: rows[11].results,
    crawlerTopPages: rows[12].results,
  }, { headers: { "cache-control": "no-store" } });
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if ((request.method === "GET" || request.method === "HEAD") && env.DB) {
      const crawler = detectCrawler(request.headers.get("user-agent") ?? "");
      if (crawler) ctx.waitUntil(recordCrawler(request, env, crawler));
    }
    if (url.pathname === "/api/analytics") {
      if (request.method === "POST") return recordAnalytics(request, env);
      if (request.method === "GET") return analyticsReport(request, env);
      return new Response(null, { status: 405, headers: { allow: "GET, POST" } });
    }
    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }
    return handler.fetch(request, env, ctx);
  },
};

export default worker;
