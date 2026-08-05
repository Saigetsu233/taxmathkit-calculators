"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const INTERNAL_TRAFFIC_STORAGE_KEY = "taxmathkit-internal-traffic";

function isInternalBrowser() {
  try {
    return window.localStorage.getItem(INTERNAL_TRAFFIC_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function send(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }
  void fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  });
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname === "/internal-traffic" || navigator.doNotTrack === "1") return;

    const search = new URLSearchParams(window.location.search);
    const common = {
      path: pathname,
      isInternal: isInternalBrowser(),
    };
    send({
      ...common,
      eventType: "page_view",
      referrer: document.referrer,
      utmSource: search.get("utm_source") ?? "",
      utmMedium: search.get("utm_medium") ?? "",
    });

    if (!pathname.startsWith("/tools/")) return;
    let sentInteraction = false;
    const recordInteraction = (event: Event) => {
      if (sentInteraction || !(event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement)) return;
      sentInteraction = true;
      send({ ...common, eventType: "calculator_interaction" });
    };
    document.addEventListener("change", recordInteraction, { passive: true });
    return () => document.removeEventListener("change", recordInteraction);
  }, [pathname]);

  return null;
}
