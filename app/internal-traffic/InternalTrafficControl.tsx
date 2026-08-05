"use client";

import { useEffect, useState } from "react";
import { INTERNAL_TRAFFIC_STORAGE_KEY } from "../components/Analytics";

export function InternalTrafficControl() {
  const [isInternal, setIsInternal] = useState<boolean | null>(null);

  useEffect(() => {
    let stored = false;
    try { stored = window.localStorage.getItem(INTERNAL_TRAFFIC_STORAGE_KEY) === "1"; } catch { stored = false; }
    queueMicrotask(() => setIsInternal(stored));
  }, []);

  function update(enabled: boolean) {
    try {
      if (enabled) window.localStorage.setItem(INTERNAL_TRAFFIC_STORAGE_KEY, "1");
      else window.localStorage.removeItem(INTERNAL_TRAFFIC_STORAGE_KEY);
      setIsInternal(enabled);
    } catch { setIsInternal(false); }
  }

  return <section className="internal-card" aria-live="polite">
    <p className={`internal-status ${isInternal ? "is-on" : ""}`}>{isInternal === null ? "Checking this browser…" : isInternal ? "Internal traffic mode is ON" : "Internal traffic mode is OFF"}</p>
    <h1>Keep our visits out of public traffic.</h1>
    <p>Turn this on once in every browser used to test TaxMathKit. Future visits and calculator interactions from this browser are reported separately.</p>
    <div className="internal-actions">
      <button className="button button-primary" type="button" onClick={() => update(true)} disabled={isInternal === true}>Mark this browser as internal</button>
      <button className="button internal-secondary" type="button" onClick={() => update(false)} disabled={isInternal !== true}>Count this browser as public again</button>
    </div>
    <p className="internal-note">This setting remains until site data is cleared. No calculator amounts are collected.</p>
  </section>;
}
