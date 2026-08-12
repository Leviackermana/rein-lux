import Image from "next/image";
import { ArrowRight, Check, Phone, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="grid-bg relative overflow-hidden pt-16 md:pt-20 lg:min-h-screen">
      <div className="relative z-10 mx-auto w-[calc(100%-28px)] max-w-[1180px] pt-4 sm:w-[calc(100%-40px)] sm:pt-8 lg:absolute lg:inset-y-20 lg:right-0 lg:mx-0 lg:w-[56vw] lg:max-w-none lg:pt-0">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.35rem] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,.42)] sm:aspect-[4/3] sm:rounded-[1.6rem] lg:h-full lg:aspect-auto lg:rounded-none lg:border-0 lg:shadow-none">
          <Image
            src="/images/hero-entrance.webp"
            alt="Gepflegter Eingangsbereich eines Wohnobjekts in Wien"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1023px) calc(100vw - 28px), 56vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0b0b0b] lg:via-[#0b0b0b]/55 lg:to-black/5" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-black/30 via-transparent to-black/10 lg:block" aria-hidden="true" />
        </div>
      </div>

      <div className="pointer-events-none absolute right-[-18rem] top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 rounded-full border border-[#D4AF37]/10" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-10rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-[#D4AF37]/15" aria-hidden="true" />

      <div className="section-shell relative z-10 flex items-center py-8 sm:py-12 lg:min-h-[calc(100vh-5rem)] lg:py-20">
        <div className="max-w-[720px] lg:w-[50%]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-[10px] tracking-[0.13em] text-[#e5c65c] sm:mb-7 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.16em]">
            <Sparkles size={14} aria-hidden="true" /> OBJEKTBETREUUNG IN WIEN &amp; UMGEBUNG
          </div>

          <h1 id="hero-title" className="font-display text-[3.35rem] font-semibold leading-[.88] tracking-[-.045em] sm:text-[clamp(4rem,8vw,7rem)]">
            Sauberkeit.<br />
            <span className="gold-text">Qualität.</span><br />
            Vertrauen.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/65 sm:mt-8 sm:text-lg sm:leading-8">
            Professionelle Hausbetreuung für Wohnanlagen und Geschäftsobjekte in Wien. Mit über 15 Jahren Berufserfahrung sorgen wir für gepflegte Immobilien, klare Abläufe und einen direkten Ansprechpartner.
          </p>

          <div className="mt-5 grid gap-2 text-xs text-white/55 sm:mt-7 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:text-sm">
            {["Persönlicher Ansprechpartner", "Zuverlässige Betreuung", "Flexible Lösungen"].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check size={16} className="text-[#D4AF37]" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4">
            <a href="#kontakt" className="button-primary group inline-flex items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#e7ca60] sm:px-7 sm:py-4 sm:text-base">
              Kostenloses Angebot <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="tel:+436765501395" className="button-secondary inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-black/25 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10 sm:px-7 sm:py-4 sm:text-base">
              <Phone size={18} aria-hidden="true" /> Kontakt aufnehmen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
