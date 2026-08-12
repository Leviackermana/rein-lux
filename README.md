# REIN LUX Reinigung – Website v3

Premium One-Page Website für REIN LUX REINIGUNG OG.

## Was in dieser Version geändert wurde

- Neues REIN-LUX-Logo aus der gelieferten Datei eingebaut.
- Galerie vollständig entfernt.
- Alle Stock- und AI-artigen Fotografien entfernt.
- Hero, About und CTA funktionieren jetzt rein über Typografie, Logo, Layout und dezente grafische Effekte.
- Aussagen auf realistische Firmendaten angepasst: 15+ Jahre Berufserfahrung und 30+ betreute Objekte.
- Leistungen reduziert auf:
  - Hausbetreuung
  - Entrümpelung
  - Winterdienst
  - Gartenpflege
- Verkaufstexte stärker auf Hausverwaltungen und Eigentümer ausgerichtet, ohne unbelegte Versprechen oder erfundene Kennzahlen.

## Start in VS Code / CMD

```cmd
cd C:\Users\Dejan\rein-lux
npm install
npm run dev
```

Danach im Browser öffnen: http://localhost:3000

## Vorhandenen Projektordner ersetzen

1. Development-Server mit `Ctrl + C` stoppen.
2. Inhalt dieses Pakets nach `C:\Users\Dejan\rein-lux` kopieren.
3. Vorhandene Dateien ersetzen.
4. `npm install` ausführen.
5. `npm run dev` ausführen.

## Kontaktformular aktivieren

Das Formular ist vorbereitet. Für echten E-Mail-Versand wird ein Resend API Key benötigt:

1. `.env.example` zu `.env.local` kopieren.
2. `RESEND_API_KEY` eintragen.
3. Für Produktion eine verifizierte Absenderdomain in `CONTACT_FROM_EMAIL` verwenden.
4. Server neu starten.

## Vor Livegang

- Impressum und Datenschutzerklärung ergänzen.
- Domain in `app/layout.tsx` prüfen.
- Kontaktformular mit echter Absenderdomain testen.
- Später können ausschließlich echte REIN-LUX-Fotos ergänzt werden, wenn ausreichend gutes Material vorhanden ist.

## v4 izmene
- Veliki logo iz Hero sekcije je uklonjen.
- Mali originalni REIN LUX logo ostaje u gornjem levom uglu navigacije.
- U Hero sekciju je vraćena fotografija ulaza zgrade iz prethodne verzije.
- Hero tekst je dodatno usmeren na Hausverwaltung i upravljanje objektima.

## V4.4 – compact mobile layout

The desktop layout remains visually aligned with V4.3. On phones the page is intentionally shorter: services use an accordion, only three key reasons and three process steps are shown, the secondary showcase and about photo are hidden, statistics use a compact 2×2 grid, and a fixed call/offer bar remains accessible at the bottom.
