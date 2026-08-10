"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Expand, X } from "lucide-react";
import { useState } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=88",
    alt: "Moderner Eingangsbereich eines Wohngebäudes",
    label: "Eingangsbereiche",
    cls: "md:row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=88",
    alt: "Gepflegtes modernes Wohngebäude",
    label: "Wohnobjekte",
    cls: "",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=88",
    alt: "Sauberer Hausflur mit hochwertigem Boden",
    label: "Hausflure",
    cls: "",
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=88",
    alt: "Gepflegter Innenbereich eines modernen Gebäudes",
    label: "Allgemeinflächen",
    cls: "md:col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=88",
    alt: "Moderner sauberer Geschäftsbereich",
    label: "Geschäftsobjekte",
    cls: "",
  },
  {
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=88",
    alt: "Gepflegte Büro- und Allgemeinfläche",
    label: "Innenbereiche",
    cls: "",
  },
];

export default function Gallery() {
  const [active, setActive] = useState<(typeof images)[number] | null>(null);

  return (
    <section id="galerie" className="section-pad bg-[#0b0b0b]">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">Objektbereiche</div>
            <h2 className="font-display mt-4 text-5xl font-semibold sm:text-6xl">
              Der erste Eindruck <span className="gold-text">zählt.</span>
            </h2>
          </div>
          <p className="max-w-md leading-7 text-white/50">
            Eingänge, Hausflure, Allgemeinflächen und Außenbereiche prägen den Eindruck eines Objekts. Genau dort setzen wir an.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[260px] gap-5 md:grid-cols-3">
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: (i % 3) * 0.05 }}
              onClick={() => setActive(img)}
              className={`gallery-card group text-left ${img.cls}`}
              aria-label={`Bild öffnen: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-5 pb-5 pt-14">
                <span className="text-sm font-medium text-white/85">{img.label}</span>
              </div>
              <span className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/45 backdrop-blur-md">
                <Expand size={18} />
              </span>
            </motion.button>
          ))}
        </div>

        <p className="mt-5 max-w-2xl text-xs leading-5 text-white/30">
          Die aktuellen Galeriebilder dienen als hochwertige, realistische Platzhalter. Für die finale Website sollten sie durch eigene Objektfotos von REIN LUX ersetzt werden.
        </p>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-black/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              className="absolute right-5 top-5 z-10 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5"
              aria-label="Lightbox schließen"
            >
              <X />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="relative h-[78vh] w-full max-w-6xl overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={active.src} alt={active.alt} fill sizes="95vw" className="object-contain" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
