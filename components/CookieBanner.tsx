"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_KEY } from "./AnalyticsConsent";

export const COOKIE_SETTINGS_EVENT = "reinlux-open-cookie-settings";
const GA_COOKIE_PATTERN = /^_ga(?:_|$)/;

function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", host, "." + host];
  for (let i = 1; i < parts.length - 1; i++) {
    domains.push(parts.slice(i).join("."), "." + parts.slice(i).join("."));
  }
  const paths = ["/"];
  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (!name || !GA_COOKIE_PATTERN.test(name)) return;
    for (const domain of domains) {
      for (const path of paths) {
        document.cookie = name + "=; Max-Age=0; path=" + path + "; SameSite=Lax" + (domain ? "; domain=" + domain : "");
      }
    }
  });
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(CONSENT_KEY) === null);
    const openSettings = () => setVisible(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  function save(value: "accepted" | "rejected") {
    const previous = localStorage.getItem(CONSENT_KEY);
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
    if (value === "rejected" && previous === "accepted") {
      clearAnalyticsCookies();
      window.location.reload();
    }
  }

  if (!visible) return null;

  return (
    <section
      aria-label="Cookie-Einstellungen"
      role="region"
      className="fixed inset-x-3 bottom-3 z-[9999] mx-auto max-w-[440px] rounded-xl border border-[#8C7853] bg-[#141414] p-4 text-white shadow-[0_8px_30px_rgba(0,0,0,.45)] sm:p-5"
    >
      <h2 className="text-sm font-semibold">Datenschutz &amp; Cookies</h2>
      <p className="mt-2 text-xs leading-relaxed text-white/80">
        Wir verwenden Google Analytics nur mit Ihrer Einwilligung, um unsere Website zu verbessern.
        Ihre Entscheidung können Sie jederzeit über den Footer ändern.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => save("rejected")} className="min-h-11 rounded-md border border-white/60 px-2 text-sm text-white hover:border-white">
          Ablehnen
        </button>
        <button type="button" onClick={() => save("accepted")} className="min-h-11 rounded-md bg-[#D4AF37] px-2 text-sm font-semibold text-black hover:bg-[#e6c95f]">
          Akzeptieren
        </button>
      </div>
    </section>
  );
}
