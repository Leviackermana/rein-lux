import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Impressum", alternates: { canonical: "/impressum" } };

export default function Impressum() {
  return <main className="min-h-screen bg-[#0B0B0B] text-white">
    <div className="section-shell max-w-4xl py-20 text-white/75">
      <Link href="/" className="text-[#D4AF37] hover:underline">← Zur Startseite</Link>
      <h1 className="font-display mt-10 text-5xl text-white">Impressum</h1>
      <p className="mt-4 text-sm text-amber-300">Die Angaben beruhen auf den vom Unternehmen bestätigten Daten.</p>
      <section className="mt-10 space-y-3 leading-7">
        <h2 className="text-2xl text-white">Angaben zum Unternehmen</h2>
        <p><strong>Firma:</strong> REIN LUX Reinigung OG<br/><strong>Rechtsform:</strong> Offene Gesellschaft (OG)<br/><strong>Firmenbuchnummer:</strong> FN 656300y<br/><strong>Firmenbuchgericht:</strong> Handelsgericht Wien<br/><strong>Kammerzugehörigkeit:</strong> Wirtschaftskammer Wien (WKO)<br/><strong>Gewerbebehörde:</strong> Magistratisches Bezirksamt für den 10. Bezirk, Wien<br/><strong>Gewerbeberechtigung:</strong> Hausbetreuung<br/><strong>Geschäftsanschrift:</strong> Hlawkagasse 10/4/43, 1100 Wien, Österreich<br/><strong>E-Mail:</strong> <a className="underline" href="mailto:office@reinlux.at">office@reinlux.at</a><br/><strong>Telefon:</strong> <a className="underline" href="tel:+436765501395">+43 676 550 1395</a></p>
        <h2 className="pt-6 text-2xl text-white">Rechtliche Grundlagen</h2><p>Gewerbeordnung 1994 (GewO), abrufbar über <a className="underline" href="https://www.ris.bka.gv.at/" target="_blank" rel="noopener noreferrer">RIS</a>.</p><h2 className="pt-6 text-2xl text-white">Inhaltliche Ausrichtung</h2>
        <p>Informationen über Hausbetreuung und Reinigungsdienstleistungen der REIN LUX Reinigung OG.</p>
      </section>
      <p className="mt-12"><Link href="/datenschutz" className="text-[#D4AF37] underline">Datenschutzerklärung</Link></p>
    </div>
  </main>;
}
