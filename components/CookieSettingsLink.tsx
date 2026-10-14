"use client";

import { COOKIE_SETTINGS_EVENT } from "./CookieBanner";

export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))}
      className="cursor-pointer text-left text-xs text-white/65 underline underline-offset-4 transition hover:text-[#D4AF37] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4AF37]"
    >
      Cookie-Einstellungen
    </button>
  );
}
