import Image from "next/image";
import { BadgeCheck, Clock3, Handshake, MapPinned } from "lucide-react";

const values = [
  [Clock3, "15+ Jahre", "Berufserfahrung"],
  [BadgeCheck, "30+", "betreute Objekte"],
  [Handshake, "Direkte", "Betreuung"],
  [MapPinned, "Wien", "& Umgebung"],
] as const;

export default function About() {
  return (
    <section id="ueber-uns" className="section-pad bg-[#0f0f0f]">
      <div className="section-shell grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
        <div>
          <div className="eyebrow">Über REIN LUX</div>
          <h2 className="font-display mt-4 text-[2.65rem] font-semibold leading-[.98] sm:text-6xl">
            Junges Unternehmen. <span className="gold-text">Echte Erfahrung.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/55 sm:mt-7 sm:text-base sm:leading-8">
            REIN LUX ist ein junges Unternehmen mit über 15 Jahren Berufserfahrung. Wir stehen für persönliche Verantwortung, direkte Kommunikation und verlässliche Betreuung.
          </p>
          <p className="mt-5 hidden max-w-2xl leading-8 text-white/55 sm:block">
            Heute betreuen wir bereits mehr als 30 Objekte in Wien und Umgebung. Unser Wachstum soll nicht über Masse kommen, sondern über langfristige Zusammenarbeit, Empfehlungen und zufriedene Auftraggeber.
          </p>

          <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:gap-4">
            {values.map(([Icon, top, bottom]) => (
              <div key={String(top) + String(bottom)} className="rounded-xl border border-white/8 bg-white/[.025] p-3.5 sm:rounded-2xl sm:p-5">
                <Icon className="text-[#D4AF37]" size={20} />
                <div className="mt-3 text-sm font-semibold sm:mt-5 sm:text-base">{String(top)}</div>
                <div className="mt-0.5 text-xs text-white/40 sm:mt-1 sm:text-sm">{String(bottom)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Real photo stays on larger screens; hidden on phones to keep the page compact. */}
        <div className="relative mx-auto hidden w-full max-w-[470px] sm:block lg:justify-self-end">
          <div className="absolute -inset-5 rounded-[2.4rem] bg-[#D4AF37]/[.055] blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30 shadow-[0_24px_80px_rgba(0,0,0,.38)]">
            <Image
              src="/images/about-hallway.webp"
              alt="Gepflegter Hausflur eines von REIN LUX betreuten Wohnobjekts"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
          <div className="relative -mt-8 ml-8 max-w-[88%] rounded-2xl border border-[#D4AF37]/20 bg-[#0b0b0b]/95 p-5 shadow-xl backdrop-blur">
            <p className="font-display text-2xl leading-tight text-[#e7cb68]">„Sauberkeit ist unsere Leidenschaft.“</p>
            <p className="mt-2 text-sm leading-6 text-white/45">Persönliche Verantwortung statt anonymer Abwicklung.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
