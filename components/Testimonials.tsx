"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  ["Hausverwaltung, Wien", "Sehr zuverlässige Zusammenarbeit, saubere Ausführung und schnelle Kommunikation."],
  ["Privatkunde, Wien", "Professionell, pünktlich und gründlich. Genau so wünscht man sich eine Reinigungsfirma."],
  ["Gewerbekunde, Wien", "Flexible Termine und konstant hohe Qualität. Eine klare Empfehlung."],
];

export default function Testimonials() {
  return (
    <section className="section-pad bg-[#0f0f0f]">
      <div className="section-shell">
        <div className="text-center"><div className="eyebrow">Kundenstimmen</div><h2 className="font-display mt-4 text-5xl font-semibold sm:text-6xl">Vertrauen entsteht durch <span className="gold-text">Leistung.</span></h2></div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {reviews.map(([author, text], i) => (
            <motion.article key={author} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: i * .08 }} className="rounded-[1.6rem] border border-white/8 bg-white/[.025] p-7">
              <div className="flex gap-1 text-[#D4AF37]">{Array.from({ length: 5 }).map((_, j) => <Star key={j} size={17} fill="currentColor" />)}</div>
              <p className="mt-7 font-display text-2xl leading-9 text-white/85">“{text}”</p>
              <div className="mt-7 text-sm text-white/40">{author}</div>
            </motion.article>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-white/25">Hinweis: Beispieltexte – vor Veröffentlichung bitte durch echte, freigegebene Kundenbewertungen ersetzen.</p>
      </div>
    </section>
  );
}
