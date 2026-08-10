"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check, Phone, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.08]);

  return (
    <section id="home" className="grid-bg relative overflow-hidden pt-16 md:pt-20 lg:min-h-screen">
      {/* Large right-side background image */}
      <motion.div
        ref={imageRef}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-20 right-0 hidden w-[56vw] overflow-hidden lg:block"
      >
        <motion.div style={{ scale: imageScale }} className="absolute inset-0">
          <Image
            src="/images/hero-entrance.webp"
            alt="Gepflegter Eingangsbereich eines Wohnobjekts in Wien"
            fill
            priority
            sizes="56vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0b0b0b] via-[#0b0b0b]/55 to-black/5" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      </motion.div>

      {/* Mobile hero image */}
      <div className="section-shell relative z-10 pt-4 sm:pt-8 lg:hidden">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,.42)] sm:aspect-[4/3] sm:rounded-[1.6rem]">
          <Image
            src="/images/hero-entrance.webp"
            alt="Gepflegter Eingangsbereich eines Wohnobjekts in Wien"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-[-18rem] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full border border-[#D4AF37]/10" />
      <div className="pointer-events-none absolute right-[-10rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-[#D4AF37]/15" />

      <div className="section-shell relative z-10 flex items-center py-8 sm:py-12 lg:min-h-[calc(100vh-5rem)] lg:py-20">
        <div className="max-w-[720px] lg:w-[50%]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] tracking-[0.13em] text-[#e5c65c] sm:mb-7 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.16em]"
          >
            <Sparkles size={14} /> OBJEKTBETREUUNG IN WIEN & UMGEBUNG
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.05 }}
            className="font-display text-[3.35rem] font-semibold leading-[.88] tracking-[-.045em] sm:text-[clamp(4rem,8vw,7rem)]"
          >
            Sauberkeit.<br />
            <span className="gold-text">Qualität.</span><br />
            Vertrauen.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18 }}
            className="mt-5 max-w-2xl text-sm leading-6 text-white/65 sm:mt-8 sm:text-lg sm:leading-8"
          >
            Professionelle Hausbetreuung für Wohnanlagen und Geschäftsobjekte in Wien. Mit über 15 Jahren Berufserfahrung sorgen wir für gepflegte Immobilien, klare Abläufe und einen direkten Ansprechpartner.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="mt-5 grid gap-2 text-xs text-white/55 sm:mt-7 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:text-sm"
          >
            {["Persönlicher Ansprechpartner", "Zuverlässige Betreuung", "Flexible Lösungen"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check size={16} className="text-[#D4AF37]" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.32 }}
            className="mt-6 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4"
          >
            <a href="#kontakt" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#e7ca60] sm:px-7 sm:py-4 sm:text-base">
              Kostenloses Angebot <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a href="tel:+436765501395" className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-black/25 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 sm:px-7 sm:py-4 sm:text-base">
              <Phone size={18} /> Kontakt aufnehmen
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
