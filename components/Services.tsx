"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronDown, House, Leaf, Snowflake, Truck } from "lucide-react";

const services = [
  {
    icon: House,
    title: "Hausbetreuung",
    text: "Laufende Betreuung von Wohn- und Geschäftsobjekten – inklusive gepflegter Allgemeinflächen, Eingangsbereiche und Stiegenhäuser.",
  },
  {
    icon: Truck,
    title: "Entrümpelung",
    text: "Zuverlässige Räumung und Entrümpelung von Wohnungen, Kellern, Dachböden und Nebenräumen – sauber, ordentlich und unkompliziert.",
  },
  {
    icon: Snowflake,
    title: "Winterdienst",
    text: "Verlässliche Betreuung bei Schnee und Eis, damit Zugänge und Außenbereiche sicher und begehbar bleiben.",
  },
  {
    icon: Leaf,
    title: "Gartenpflege",
    text: "Regelmäßige Pflege von Grünflächen und Gartenpflege für einen ordentlichen und einladenden Gesamteindruck.",
  },
] as const;

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="leistungen" aria-labelledby="leistungen-title" className="section-pad bg-[#0f0f0f]">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow">Unsere Leistungen</div>
          <h2 id="leistungen-title" className="font-display mt-4 text-[2.65rem] font-semibold leading-[.98] sm:text-6xl">
            Alles Wichtige für ein <span className="gold-text">gepflegtes Objekt.</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/55 sm:mt-5 sm:text-base">
            Persönlich abgestimmt auf Ihr Objekt und Ihren tatsächlichen Bedarf.
          </p>
        </div>

        <div className="services-grid mt-9 grid gap-0 border-y border-white/8 md:mt-14 md:grid-cols-2 md:gap-5 md:border-0">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOpen = open === i;
            const contentId = `service-content-${i}`;
            return (
              <article key={service.title} className="service-card group border-b border-white/8 py-1 last:border-b-0 md:rounded-[1.6rem] md:border md:border-white/8 md:bg-white/[.025] md:p-7 md:transition md:duration-300 md:hover:-translate-y-1 md:hover:border-[#D4AF37]/45 md:hover:bg-[#D4AF37]/[.045]">
                <div className="flex min-h-14 items-center gap-3 py-3 md:min-h-0 md:items-start md:justify-between md:py-0">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/[.06] text-[#D4AF37] md:h-14 md:w-14 md:rounded-2xl">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="flex-1 font-display text-xl font-semibold md:mt-6 md:text-3xl">{service.title}</h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="grid min-h-11 min-w-11 place-items-center rounded-full text-white/55 hover:bg-white/5 hover:text-[#D4AF37] md:hidden"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    aria-label={`${service.title}: Details ${isOpen ? "ausblenden" : "anzeigen"}`}
                  >
                    <ChevronDown size={20} className={`transition-transform ${isOpen ? "rotate-180 text-[#D4AF37]" : ""}`} aria-hidden="true" />
                  </button>
                </div>

                <div id={contentId} className={`service-content grid transition-[grid-template-rows] duration-200 md:block ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden pl-[3.25rem] md:overflow-visible md:pl-0">
                    <p className="pr-2 text-sm leading-6 text-white/60 md:mt-3 md:pr-0 md:text-base md:leading-7">{service.text}</p>
                    <a href="#kontakt" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-[#d9ba52] md:mt-5">
                      Angebot anfragen <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
