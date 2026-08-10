import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/6 bg-black py-7 pb-24 md:py-10">
      <div className="section-shell flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <a href="#home" className="inline-flex" aria-label="REIN LUX Startseite">
            <Image src="/rein-lux-logo.png" alt="REIN LUX Reinigung Logo" width={115} height={102} className="h-16 w-auto object-contain md:h-24" />
          </a>
          <p className="mt-4 max-w-sm text-sm leading-6 text-white/35">Hausbetreuung und ausgewählte Spezialleistungen für Wohn- und Geschäftsobjekte in Wien und Umgebung.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/45">
          <a href="#leistungen" className="hover:text-[#D4AF37]">Leistungen</a>
          <a href="#warum" className="hover:text-[#D4AF37]">Warum wir</a>
          <a href="#ueber-uns" className="hover:text-[#D4AF37]">Über uns</a>
          <a href="#kontakt" className="hover:text-[#D4AF37]">Kontakt</a>
        </div>
      </div>
      <div className="section-shell mt-9 flex flex-col justify-between gap-3 border-t border-white/6 pt-6 text-xs text-white/25 sm:flex-row">
        <span>© {new Date().getFullYear()} REIN LUX REINIGUNG OG. Alle Rechte vorbehalten.</span>
        <span>Hlawkagasse 10/4/43 · 1100 Wien</span>
      </div>
    </footer>
  );
}
