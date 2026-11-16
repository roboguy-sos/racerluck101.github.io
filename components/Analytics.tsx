"use client";

import Script from "next/script";
import { analytics } from "@/lib/data";

/**
 * GoatCounter is a tiny, cookie-free analytics script. It only loads when a
 * site code is configured in lib/data.ts, so the site ships with no third-party
 * requests by default.
 */
export default function Analytics() {
  if (!analytics.goatCounter) return null;

  return (
    <Script
      id="goatcounter"
      src="https://gc.zgo.at/count.js"
      strategy="afterInteractive"
      data-goatcounter={`https://${analytics.goatCounter}.goatcounter.com/count`}
    />
  );
}
