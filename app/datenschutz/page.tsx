import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Datenschutzerklärung", alternates: { canonical: "/datenschutz" } };

export default function Datenschutz() {
  return <main className="min-h-screen bg-[#0B0B0B] text-white">
    <div className="section-shell max-w-4xl py-20 text-white/75">
      <Link href="/" className="text-[#D4AF37] hover:underline">← Zur Startseite</Link>
      <h1 className="font-display mt-10 text-5xl text-white">Datenschutzerklärung</h1>
      <p className="mt-4 text-sm text-amber-300">Entwurf zur Prüfung: Angaben zu Aufbewahrungsfristen, Dienstleisterverträgen, möglichen Drittlandübermittlungen und Betroffenenrechten sind vor der Veröffentlichung anhand der tatsächlichen Verarbeitung zu verifizieren.</p>
      <div className="mt-10 space-y-8 leading-7">
        <section><h2 className="text-2xl text-white">1. Verantwortlicher</h2><p>REIN LUX REINIGUNG OG, Hlawkagasse 10/4/43, 1100 Wien, Österreich. Kontakt: <a className="underline" href="mailto:office@reinlux.at">office@reinlux.at</a>.</p></section>
        <section><h2 className="text-2xl text-white">2. Kontaktanfragen</h2><p>Bei einer Anfrage über das Kontaktformular verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, Ihre Nachricht und gegebenenfalls Ihre Telefonnummer, um die Anfrage zu bearbeiten und zu beantworten. Als Rechtsgrundlage kommen je nach Anfrage vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) oder berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) in Betracht. Die konkrete Aufbewahrungsdauer ist noch festzulegen und zu dokumentieren.</p></section>
        <section><h2 className="text-2xl text-white">3. E-Mail-Versand und -Empfang</h2><p>Für die Übermittlung von Kontaktformularnachrichten wird Resend eingesetzt. Die geschäftliche E-Mail-Kommunikation erfolgt über Zoho Mail. Dabei können Kontaktdaten und Nachrichteninhalte durch diese Dienstleister verarbeitet werden. Die konkreten Empfänger, Verarbeitungsstandorte, Auftragsverarbeitungsverträge und gegebenenfalls Drittlandtransfers müssen vor Veröffentlichung geprüft und ergänzt werden.</p></section>
        <section><h2 className="text-2xl text-white">4. Hosting und technische Daten</h2><p>Die Website wird über Vercel bereitgestellt. Beim Aufruf können technisch erforderliche Verbindungsdaten, insbesondere IP-Adresse, Zeitpunkt und angeforderte Ressourcen, verarbeitet werden, um die Website auszuliefern und ihre Sicherheit zu gewährleisten. Rechtsgrundlage ist grundsätzlich Art. 6 Abs. 1 lit. f DSGVO. Speicherdauer und Übermittlungen sind anhand der tatsächlichen Hosting-Einstellungen zu prüfen.</p></section>
        <section><h2 className="text-2xl text-white">5. Google Analytics und Cookies</h2><p>Google Analytics wird auf dieser Website erst geladen, nachdem Sie der Analyse zugestimmt haben (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit über „Cookie-Einstellungen“ im Footer der Startseite widerrufen. Die Speicherung der Auswahl erfolgt im Browser. Die eingesetzten Analyse-Cookies, Speicherdauern, Datenempfänger und etwaige Drittlandübermittlungen müssen vor Veröffentlichung abschließend dokumentiert werden.</p></section>
        <section><h2 className="text-2xl text-white">6. Ihre Rechte</h2><p>Nach Maßgabe der DSGVO haben Sie insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch und Widerruf erteilter Einwilligungen. Wenden Sie sich dazu an <a className="underline" href="mailto:office@reinlux.at">office@reinlux.at</a>. Sie können außerdem Beschwerde bei der österreichischen Datenschutzbehörde einlegen: <a className="underline" href="https://www.dsb.gv.at/" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a>.</p></section>
      </div>
      <p className="mt-12"><Link href="/impressum" className="text-[#D4AF37] underline">Impressum</Link></p>
    </div>
  </main>;
}
