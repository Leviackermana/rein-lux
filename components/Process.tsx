"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = ["Besichtigung", "Angebot", "Reinigung", "Qualitätskontrolle", "Zufriedener Kunde"];
const descriptions = [
  "Wir besichtigen Ihr Objekt und klären Anforderungen.",
  "Sie erhalten ein klares, unverbindliches Angebot.",
  "Unser Team arbeitet nach vereinbartem Leistungsumfang.",
  "Die Ausführung wird geprüft und dokumentiert.",
  "Sie erhalten verlässliche Sauberkeit im Alltag."
];

export default function Process() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!wrap.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".process-progress", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left", ease: "none", scrollTrigger: { trigger: wrap.current, start: "top 80%", end: "bottom 60%", scrub: true } });
    }, wrap);
    return () => ctx.revert();
  }, []);

  const mobileSteps = [
    ["01", "Besichtigung", "Objekt und Bedarf kurz klären."],
    ["02", "Angebot", "Klare, unverbindliche Leistung erhalten."],
    ["03", "Ausführung", "Zuverlässig starten und betreuen."],
  ];

  return (
    <section id="ablauf" className="section-pad">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow">So arbeiten wir</div>
          <h2 className="font-display mt-4 text-[2.65rem] font-semibold leading-[.98] sm:text-6xl">Einfach. Transparent. <span className="gold-text">Zuverlässig.</span></h2>
        </div>

        {/* Mobile: only the three decision-relevant steps */}
        <div className="mt-8 md:hidden">
          {mobileSteps.map(([number, title, text], i) => (
            <div key={title} className="relative flex gap-4 pb-5 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D4AF37]/40 bg-[#0b0b0b] font-display text-sm text-[#e0bd4d]">{number}</div>
                {i < mobileSteps.length - 1 && <div className="mt-1 h-full w-px bg-[#D4AF37]/20" />}
              </div>
              <div className="pt-1.5">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-5 text-white/40">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div ref={wrap} className="relative mt-16 hidden md:block">
          <div className="absolute left-6 right-6 top-6 h-px bg-white/10" />
          <div className="process-progress absolute left-6 right-6 top-6 h-px bg-[#D4AF37]" />
          <div className="grid gap-8 md:grid-cols-5">
            {steps.map((step, i) => (
              <div key={step} className="relative text-center">
                <div className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#D4AF37]/40 bg-[#0b0b0b] font-display text-lg text-[#e0bd4d]">0{i + 1}</div>
                <h3 className="mt-5 font-semibold">{step}</h3>
                <p className="mx-auto mt-2 max-w-[180px] text-sm leading-6 text-white/40">{descriptions[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
