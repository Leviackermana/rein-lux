"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export const CONSENT_KEY = "reinlux-analytics-consent-v1";
export const CONSENT_EVENT = "reinlux-consent-updated";

export default function AnalyticsConsent() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = () => setEnabled(localStorage.getItem(CONSENT_KEY) === "accepted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return enabled ? <GoogleAnalytics gaId="G-J2R9PFZDGW" /> : null;
}
