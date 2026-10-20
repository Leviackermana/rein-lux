import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Datenschutzerklärung", alternates: { canonical: "/datenschutz" } };

export default function Datenschutz() {
  return <main className="min-h-screen bg-[#0B0B0B] text-white">
    <div className="section-shell max-w-4xl py-20 text-white/75">
      <Link href="/" className="text-[#D4AF37] hover:underline">← Zur Startseite</Link>
      <h1 className="font-display mt-10 text-5xl text-white">Datenschutzerklärung</h1>
      <p className="mt-4 text-sm text-amber-300">Informationen zur Verarbeitung personenbezogener Daten auf dieser Website.</p>
      <div className="mt-10 space-y-8 leading-7">
        <section><h2 className="text-2xl text-white">1. Verantwortlicher</h2><p>REIN LUX Reinigung OG, Hlawkagasse 10/4/43, 1100 Wien, Österreich. Kontakt: <a className="underline" href="mailto:office@reinlux.at">office@reinlux.at</a>.</p></section>
        <section><h2 className="text-2xl text-white">2. Kontaktanfragen</h2><p>Bei einer Anfrage über das Kontaktformular verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, Ihre Nachricht und gegebenenfalls Ihre Telefonnummer, um die Anfrage zu bearbeiten und zu beantworten. Als Rechtsgrundlage kommen je nach Anfrage vorvertragliche Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO) oder berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO) in Betracht. Wir speichern Anfragen nur so lange, wie dies für die Bearbeitung und anschließende geschäftliche Dokumentation erforderlich ist; gesetzliche Aufbewahrungspflichten bleiben unberührt.</p></section>
        <section><h2 className="text-2xl text-white">3. E-Mail-Versand und -Empfang</h2><p>Für die Übermittlung von Kontaktformularnachrichten wird Resend eingesetzt. Die geschäftliche E-Mail-Kommunikation erfolgt über Zoho Mail. Dabei können Kontaktdaten und Nachrichteninhalte durch diese Dienstleister verarbeitet werden. Eine Verarbeitung außerhalb des Europäischen Wirtschaftsraums kann je nach Dienstleister und Konfiguration nicht ausgeschlossen werden. Soweit erforderlich, sind geeignete Garantien nach der DSGVO vorzusehen.</p></section>
        <section><h2 className="text-2xl text-white">4. Hosting und technische Daten</h2><p>Die Website wird über Vercel bereitgestellt. Beim Aufruf können technisch erforderliche Verbindungsdaten, insbesondere IP-Adresse, Zeitpunkt und angeforderte Ressourcen, verarbeitet werden, um die Website auszuliefern und ihre Sicherheit zu gewährleisten. Rechtsgrundlage ist grundsätzlich Art. 6 Abs. 1 lit. f DSGVO. Technische Daten werden nur so lange verarbeitet, wie dies für Betrieb und Sicherheit der Website beziehungsweise aufgrund gesetzlicher Pflichten erforderlich ist.</p></section>
        <section><h2 className="text-2xl text-white">5. Google Analytics und Cookies</h2><p>Google Analytics wird auf dieser Website erst geladen, nachdem Sie der Analyse zugestimmt haben (Art. 6 Abs. 1 lit. a DSGVO). Sie können Ihre Einwilligung jederzeit über „Cookie-Einstellungen“ im Footer der Startseite widerrufen. Die Speicherung der Auswahl erfolgt im Browser. Dabei können Nutzungsdaten an Google übermittelt und Analyse-Cookies gesetzt werden. Je nach Konfiguration sind auch Übermittlungen in Drittländer möglich. Die Einwilligung kann jederzeit mit Wirkung für die Zukunft widerrufen werden.</p></section>
        <section><h2 className="text-2xl text-white">6. Ihre Rechte</h2><p>Nach Maßgabe der DSGVO haben Sie insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch und Widerruf erteilter Einwilligungen. Wenden Sie sich dazu an <a className="underline" href="mailto:office@reinlux.at">office@reinlux.at</a>. Sie können außerdem Beschwerde bei der österreichischen Datenschutzbehörde einlegen: <a className="underline" href="https://www.dsb.gv.at/" target="_blank" rel="noopener noreferrer">www.dsb.gv.at</a>.</p></section>
      </div>
      <p className="mt-12"><Link href="/impressum" className="text-[#D4AF37] underline">Impressum</Link></p>
    </div>
  </main>;
}
