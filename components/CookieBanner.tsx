"use client";

import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_KEY } from "./AnalyticsConsent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(CONSENT_KEY) === null);
  }, []);

  function save(value: "accepted" | "rejected") {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
    // If consent is withdrawn after Analytics was loaded, reload to stop the tag.
    if (value === "rejected") {
      window.location.reload();
    }
  }

  return (
    <>
      {visible && (
        <section aria-label="Cookie-Einstellungen" role="dialog" aria-modal="false" style={{ position: "fixed", bottom: 16, left: 16, right: 16, maxWidth: 620, margin: "0 auto", padding: 20, zIndex: 9999, background: "#161616", color: "#fff", border: "1px solid #666", borderRadius: 12, boxShadow: "0 8px 30px #0008" }}>
          <strong>Datenschutz & Cookies</strong>
          <p style={{ margin: "12px 0", lineHeight: 1.5 }}>Wir verwenden Google Analytics nur mit Ihrer Einwilligung, um die Nutzung unserer Website zu verstehen. Sie können freiwillig zustimmen oder ablehnen. Weitere Informationen finden Sie in unserer Datenschutzerklärung.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" onClick={() => save("rejected")} style={{ padding: "10px 16px", background: "transparent", color: "white", border: "1px solid #aaa", borderRadius: 6, cursor: "pointer" }}>Ablehnen</button>
            <button type="button" onClick={() => save("accepted")} style={{ padding: "10px 16px", background: "white", color: "black", border: "1px solid white", borderRadius: 6, cursor: "pointer" }}>Alle akzeptieren</button>
          </div>
        </section>
      )}
      <button type="button" onClick={() => setVisible(true)} style={{ position: "fixed", bottom: 8, left: 8, zIndex: 9998, background: "#161616", color: "#fff", border: "1px solid #777", borderRadius: 6, padding: "6px 10px", fontSize: 12, cursor: "pointer" }}>Cookie-Einstellungen</button>
    </>
  );
}
