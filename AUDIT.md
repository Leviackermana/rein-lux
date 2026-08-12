# REIN LUX Production Frontend Audit

Datum: 2026-08-12
Basis: öffentlich erreichbare Seite `https://www.reinlux.at/` + Projektstand V4.7.

## Kurz-Audit

| Priorität | Problem | Warum ist das ein Problem? | Umsetzung |
|---|---|---|---|
| Critical | Services und „So arbeiten wir“ wurden separat für Mobile/Desktop gerendert | Doppelte semantische Inhalte im DOM, unnötiger HTML-Umfang, schlechtere Wartbarkeit und potenziell verwirrend für Crawler/Assistive Tech | Jeweils eine Datenquelle und eine DOM-Struktur; responsive Darstellung nur per CSS und minimalem Accordion-State bei Services |
| Critical | Statistik startete serverseitig bei `0` | Ohne JS sahen Nutzer/Crawler falsche Werte; Content war JS-abhängig | Finalwerte 15+, 30+ und 4 stehen im SSR/HTML; Animation verändert sie nur nach Hydration als Enhancement und entfällt bei reduced motion |
| High | Zu viel Animations-JavaScript (Framer Motion, GSAP, Lenis) für einfache UI-Effekte | Mehr Client-JS, potenziell schlechtere INP/CPU-Nutzung und mehr Fehlerfläche | Runtime-Nutzung vollständig entfernt; native CSS/Browser-Verhalten ersetzt Scroll- und Reveal-Effekte. Dependencies bleiben vorerst im package.json, um vorhandenen Lockfile-Deploy nicht zu destabilisieren |
| High | Mobile Navigation ohne Escape-/Focus-Rückgabe | Tastatur- und Screenreader-Nutzung war unvollständig | `aria-expanded`, `aria-controls`, dynamisches Label, Initialfocus, Escape-Schließen und Focus-Rückgabe ergänzt |
| High | Kontaktformular hatte nur grobe Validierung und gab teilweise technische Backend-Texte weiter | Schlechter UX, schwächere Sicherheit und unnötige technische Details für Nutzer | Feldgenaue Client-/Server-Validierung, Längenlimits, Sanitizing, Honeypot, Mindest-Ausfüllzeit, best-effort Rate Limit, Double-submit-Schutz, generische User-Fehler, `aria-live` Status |
| High | Formfehler waren nicht sauber mit Feldern verbunden | Screenreader konnten Fehler nicht zuverlässig zuordnen | Explizite `id`/`label`, `aria-invalid`, `aria-describedby`, Fokus auf erstes fehlerhaftes Feld |
| High | SEO-Metadaten unvollständig | Canonical-/Social-/Crawler-Signale nicht vollständig kontrolliert | Canonical, OG, Twitter, robots metadata, `robots.ts`, `sitemap.ts`, 1200×630 OG-Bild ergänzt |
| High | Structured data beschrieb Firma nur minimal | Weniger strukturiran kontekst za lokalni biznis i usluge | LocalBusiness JSON-LD ergänzt: URL, Logo, Bild, Adresse, Gebiet, Öffnungszeiten, Kontakte und OfferCatalog |
| High | Hero slika bila duplirana u DOM-u za mobile/desktop | Doppelte Bild-Komponente und unnötig komplexer LCP-Pfad | Eine einzige `next/image` Instanz mit responsive Positionierung und `sizes`; LCP priorisiert |
| Medium | Kontrast einzelner Hilfstexte war zu schwach | Kleine Texte mit sehr geringer Opazität sind schwer lesbar | Kritische 25–50%-Weißtexte auf lesbarere Werte angehoben; Focus-Ring global ergänzt |
| Medium | Kontaktkarten konnten auf sehr kleinen Screens breiter werden als sinnvoll | Risiko für horizontalen Overflow bei 320–375 px | Einspaltig bis 420 px, `min-width:0`, `break-words`, strengere Containerbreiten und globale Overflow-Sicherung |
| Medium | Kein Skip-Link | Tastaturnutzer mussten Navigation jedes Mal durchlaufen | „Zum Inhalt springen“ ergänzt |
| Medium | Social Preview nutzte kein optimales Seitenverhältnis | Unkontrolliertes Cropping in Social Cards | Eigenes 1200×630 OG-Asset aus bestehendem Markenmaterial erzeugt |
| Low | Installierte Animation-Packages sind nach Refactor ungenutzt | Installationsgröße bleibt höher als nötig, beeinflusst aber den Browser-Bundle nicht solange sie nicht importiert werden | Absichtlich noch nicht aus package.json entfernt, damit der bestehende lokale `package-lock.json` nicht beim einfachen Dateiaustausch inkonsistent wird. Kann später mit `npm uninstall framer-motion gsap lenis` sauber bereinigt werden |

## Größere Änderungen nach Datei

### `components/Services.tsx`
- Eine gemeinsame Service-Struktur für alle Breakpoints.
- Mobile nutzt einen kleinen Accordion-State; Desktop zeigt denselben Inhalt als Cards.
- Keine zweite Kopie der Services im DOM.
- Touch-Targets und ARIA für den Toggle verbessert.
- Trade-off: kleiner Client-Component bleibt nötig, um die kompakte Mobile-Accordion-Interaktion beizubehalten.

### `components/Process.tsx`
- Mobile- und Desktop-Prozess in eine einzige `<ol>`-Struktur zusammengeführt.
- GSAP/ScrollTrigger vollständig entfernt.
- 5 Schritte bleiben inhaltlich konsistent auf allen Geräten.
- Trade-off: dekorative Scroll-Linienanimation entfällt zugunsten von weniger JavaScript und robuster Semantik.

### `components/Stats.tsx`
- SSR zeigt sofort `15+`, `30+`, `4` und `Wien`.
- IntersectionObserver animiert nur visuell; ohne JS bleibt korrekter Inhalt sichtbar.
- `prefers-reduced-motion` wird respektiert.

### `components/Hero.tsx`
- Framer Motion und parallax runtime entfernt.
- Mobile/Desktop verwenden dieselbe Bildinstanz.
- Hero-Bild bleibt `priority`/`fetchPriority=high`; responsive `sizes` und festes Aspect Ratio reduzieren CLS/LCP-Risiko.

### `components/Navbar.tsx`
- Zugänglicheres Mobile-Menü mit Escape, Fokusmanagement, `aria-controls`, `aria-expanded` und ausreichend großen Touch-Targets.

### `components/Contact.tsx`
- Explizite Labels, Autofill-Hints und feldbezogene Fehlermeldungen.
- Clientvalidierung zusätzlich zur Servervalidierung.
- Loading, Success, Error und Double-submit-State verbessert.
- Honeypot und Formular-Startzeit an API gesendet.
- Mobile Kontaktkarten auf 320 px abgesichert.

### `app/api/contact/route.ts`
- Harte Längenlimits und Sanitizing.
- Serverseitige Prüfung aller Pflichtfelder und Privacy-Consent.
- Honeypot + Timing-Check + best-effort IP cooldown.
- API-/Resend-Fehler werden serverseitig geloggt, aber nicht technisch an Nutzer durchgereicht.
- Secrets bleiben ausschließlich in `process.env`.
- Trade-off: In-Memory Rate-Limit ist in serverless Umgebungen nur best-effort. Für starken Bot-Traffic wäre später ein externer KV/Rate-Limiter sinnvoll.

### `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/page.tsx`
- Canonical auf `https://www.reinlux.at/` vereinheitlicht.
- Open Graph/Twitter-Metadata ergänzt.
- Robots/Sitemap als Next-Metadata-Routen ergänzt.
- LocalBusiness + OfferCatalog JSON-LD erweitert.
- Ein einziger Primär-`h1`; Section-Titel folgen `h2 → h3`.
- Skip-Link ergänzt.

### `app/globals.css`
- Globale `focus-visible`-States.
- Kleine-screen Overflow-Schutz und robustere Containerbreiten.
- Lesbarkeit schwacher Texte verbessert.
- Reduced-motion Regeln beibehalten.
- Nicht mehr verwendete projektspezifische Utility-CSS-Regeln entfernt.

## Abschlussprüfung

- **Console errors/warnings:** Quellcode-Syntaxprüfung: 17 TS/TSX-Dateien, 0 Parse-Fehler. Ein vollständiger `next build` konnte in der Sandbox nicht ausgeführt werden, weil npm-Paketauflösung in dieser Umgebung zeitlich auslief.
- **Accessibility:** Keine bekannten Critical/High-Probleme nach Refactor. Offener Punkt: echte rechtliche Datenschutzerklärung/Impressum-Seiten wurden nicht erfunden oder ergänzt; deren finaler Inhalt muss juristisch korrekt bereitgestellt werden.
- **SEO:** Canonical, Robots, Sitemap, Social Metadata und LocalBusiness-Daten sind implementiert. Google-Indexierung/Search Console liegt außerhalb des Frontend-Codes.
- **Performance:** Große JS-Verursacher sind nicht mehr importiert. Hero nutzt `next/image`, Above-the-fold Priorisierung und responsive Sizes. Below-the-fold About-Bild bleibt lazy per Next-Default.
- **Duplizierter DOM/Content:** Services und Prozess nur noch einmal. Hero-Bild ebenfalls nur einmal.
- **JS-abhängiger kritischer Content:** Keine Statistiken oder Haupttexte sind von JS abhängig. Services-Titel und Inhalte sind im HTML vorhanden; JS steuert auf Mobile nur die Sichtbarkeit.
- **Form:** Client- und Servervalidierung, Sanitizing, Honeypot, Timing-Check, Double-submit-Schutz und generische Fehler vorhanden. Resend erfordert weiterhin korrekt gesetzte Server-Environment-Variablen.
- **Responsive:** Struktur ist für 320/375/768/1024/1440+ ausgelegt. Besonders 320–419 px nutzt Contact bewusst eine Spalte. Horizontales `overflow-x` ist zusätzlich abgesichert. Visuelle Device-Matrix sollte nach Deployment noch einmal im echten Browser/Lighthouse bestätigt werden.
