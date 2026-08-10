"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  House,
  Leaf,
  Snowflake,
  Sparkles,
  Sun,
  Waves,
} from "lucide-react";

const services = [
  {
    icon: House,
    title: "Hausbetreuung",
    text: "Laufende Betreuung von Wohn- und Geschäftsobjekten – inklusive gepflegter Allgemeinflächen, Eingangsbereiche und Stiegenhäuser.",
  },
  {
    icon: Waves,
    title: "Bodenpflege",
    text: "Fachgerechte Reinigung und Pflege verschiedenster Bodenbeläge für ein dauerhaft sauberes und gepflegtes Erscheinungsbild.",
  },
  {
    icon: Sparkles,
    title: "Sonderreinigung",
    text: "Individuelle Reinigungslösungen für besondere Anforderungen, starke Verschmutzungen oder einmalige Einsätze.",
  },
  {
    icon: Snowflake,
    title: "Winterdienst",
    text: "Verlässliche Betreuung bei Schnee und Eis, damit Zugänge und Außenbereiche sicher und begehbar bleiben.",
  },
  {
    icon: Leaf,
    title: "Gartenpflege",
    text: "Regelmäßige Pflege von Grünflächen und Außenanlagen für einen ordentlichen und einladenden Gesamteindruck.",
  },
  {
    icon: Sun,
    title: "Solaranlagenreinigung",
    text: "Schonende und gründliche Reinigung von Photovoltaik- und Solaranlagen zur Entfernung von Staub, Schmutz und Ablagerungen.",
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="leistungen" className="section-pad bg-[#0f0f0f]">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow">Unsere Leistungen</div>
          <h2 className="font-display mt-4 text-[2.65rem] font-semibold leading-[.98] sm:text-6xl">
            Alles Wichtige für ein <span className="gold-text">gepflegtes Objekt.</span>
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/55 sm:mt-5 sm:text-base">
            Persönlich abgestimmt auf Ihr Objekt und Ihren tatsächlichen Bedarf.
          </p>
        </div>

        {/* Mobile: compact accordion instead of six tall cards */}
        <div className="mt-9 divide-y divide-white/8 border-y border-white/8 md:hidden">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isOpen = open === i;
            return (
              <div key={service.title}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#D4AF37]/25 bg-[#D4AF37]/[.06] text-[#D4AF37]">
                    <Icon size={20} />
                  </span>
                  <span className="flex-1 font-display text-xl font-semibold">{service.title}</span>
                  <ChevronDown size={20} className={`text-white/35 transition-transform ${isOpen ? "rotate-180 text-[#D4AF37]" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden pl-[3.25rem]">
                    <p className="pr-2 text-sm leading-6 text-white/50">{service.text}</p>
                    <a href="#kontakt" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#d9ba52]">
                      Angebot anfragen <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet / desktop */}
        <div className="mt-14 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ delay: (i % 3) * 0.06 }}
                className="group rounded-[1.6rem] border border-white/8 bg-white/[.025] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/[.045] hover:shadow-[0_25px_80px_rgba(212,175,55,.08)]"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/8 text-[#D4AF37]">
                    <Icon size={26} />
                  </div>
                  <ArrowUpRight className="text-white/20 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#D4AF37]" />
                </div>
                <h3 className="mt-8 font-display text-3xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-white/50">{service.text}</p>
                <a href="#kontakt" className="mt-7 inline-flex text-sm font-semibold text-[#d9ba52]">
                  Anfrage senden
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
