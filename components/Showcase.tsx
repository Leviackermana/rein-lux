import { ArrowRight } from "lucide-react";

export default function Showcase() {
  return (
    <section className="relative hidden overflow-hidden border-y border-white/6 bg-[#0b0b0b] md:block">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/[.045] blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="section-shell relative z-10 flex min-h-[500px] items-center py-24 sm:min-h-[560px]">
        <div className="max-w-3xl">
          <div className="eyebrow">Verantwortung für Ihr Objekt</div>
          <h2 className="font-display mt-5 text-5xl font-semibold leading-[.96] sm:text-7xl">
            Wir kümmern uns um Ihre Immobilie, <span className="gold-text">als wäre sie unsere eigene.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
            Klare Absprachen, persönliche Erreichbarkeit und eine Betreuung, auf die Sie sich im Alltag verlassen können.
          </p>
          <a href="#kontakt" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-black transition hover:bg-[#e8cd66]">
            Kostenloses Angebot anfordern
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
