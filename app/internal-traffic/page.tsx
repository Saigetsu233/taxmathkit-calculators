import type { Metadata } from "next";
import { InternalTrafficControl } from "./InternalTrafficControl";

export const metadata: Metadata = { title: "Internal traffic control", robots: { index: false, follow: false } };

export default function InternalTrafficPage() {
  return <div className="shell internal-page"><InternalTrafficControl /></div>;
}
