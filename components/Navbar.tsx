"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Leistungen", "#leistungen"],
  ["Warum wir", "#warum"],
  ["Über uns", "#ueber-uns"],
  ["Ablauf", "#ablauf"],
  ["Kontakt", "#kontakt"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/75 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="flex items-center" aria-label="REIN LUX Startseite">
          <Image
            src="/rein-lux-logo.png"
            alt="REIN LUX Reinigung Logo"
            width={95}
            height={84}
            priority
            className="h-12 w-auto object-contain md:h-16"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex" aria-label="Hauptnavigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-[#D4AF37]">{label}</a>
          ))}
          <a href="#kontakt" className="rounded-full bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e6c95f]">
            Angebot anfordern
          </a>
        </nav>

        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menü öffnen" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-black/95 md:hidden">
          <div className="section-shell flex flex-col gap-5 py-6 text-white/80">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <a href="#kontakt" onClick={() => setOpen(false)} className="mt-1 rounded-full bg-[#D4AF37] px-5 py-3 text-center font-semibold text-black">
              Kostenloses Angebot
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
