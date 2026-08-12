import { ArrowRight, CheckCircle2 } from "lucide-react";

const items = [
  ["Klare Zuständigkeit", "Ein direkter Ansprechpartner statt unnötiger Umwege."],
  ["Verlässliche Vereinbarungen", "Leistungsumfang und Termine werden klar abgestimmt."],
  ["Flexible Betreuung", "Leistungen werden passend zum Objekt und zum tatsächlichen Bedarf zusammengestellt."],
  ["Gepflegter erster Eindruck", "Eingänge und Allgemeinflächen sollen so wirken, wie Bewohner und Besucher es erwarten."],
  ["Transparente Angebote", "Keine künstlich aufgeblähten Pakete – Sie erhalten eine nachvollziehbare Leistung."],
  ["Erfahrung im Alltag", "Über 15 Jahre Berufserfahrung fließen in Organisation und Ausführung ein."],
] as const;

export default function WhyUs() {
  return (
    <section id="warum" aria-labelledby="warum-title" className="section-pad">
      <div className="section-shell grid gap-9 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="eyebrow">Warum REIN LUX?</div>
          <h2 id="warum-title" className="font-display mt-4 text-[2.65rem] font-semibold leading-[.98] sm:text-6xl">
            Weniger Aufwand. <span className="gold-text">Mehr Verlässlichkeit.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/55 sm:mt-6 sm:text-base sm:leading-7">
            Persönliche Erreichbarkeit, klare Absprachen und Betreuung, auf die Sie sich verlassen können.
          </p>
          <a href="#kontakt" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#e1bf52] sm:mt-8">
            Objekt besprechen <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>

        <div className="divide-y divide-white/8 border-y border-white/8">
          {items.map(([title, text], i) => (
            <article key={title} className={`${i >= 3 ? "hidden md:flex" : "flex"} group gap-3 py-4 sm:gap-5 sm:py-6`}>
              <CheckCircle2 className="mt-0.5 shrink-0 text-[#D4AF37] sm:mt-1" size={20} aria-hidden="true" />
              <div>
                <h3 className="text-base font-semibold text-white/85 sm:text-lg">{title}</h3>
                <p className="mt-1.5 text-sm leading-5 text-white/55 sm:mt-2 sm:max-w-xl sm:text-base sm:leading-6">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
