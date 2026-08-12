"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["Leistungen", "#leistungen"],
  ["Warum wir", "#warum"],
  ["Über uns", "#ueber-uns"],
  ["Ablauf", "#ablauf"],
  ["Kontakt", "#kontakt"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/75 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="flex items-center" aria-label="REIN LUX Startseite">
          <Image
            src="/rein-lux-logo.png"
            alt="REIN LUX Reinigung"
            width={95}
            height={84}
            priority
            className="h-12 w-auto object-contain md:h-16"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex" aria-label="Hauptnavigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="min-h-11 inline-flex items-center transition hover:text-[#D4AF37]">{label}</a>
          ))}
          <a href="#kontakt" className="inline-flex min-h-11 items-center rounded-full bg-[#D4AF37] px-5 py-3 font-semibold text-black transition hover:bg-[#e6c95f]">
            Angebot anfordern
          </a>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="grid min-h-11 min-w-11 place-items-center rounded-full md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-navigation" className="border-t border-white/5 bg-black/95 md:hidden" aria-label="Mobile Navigation">
          <div className="section-shell flex flex-col gap-2 py-4 text-white/80">
            {links.map(([label, href], index) => (
              <a
                key={href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-12 items-center rounded-xl px-2 hover:bg-white/5 hover:text-[#D4AF37]"
              >
                {label}
              </a>
            ))}
            <a href="#kontakt" onClick={() => setOpen(false)} className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D4AF37] px-5 py-3 text-center font-semibold text-black">
              Kostenloses Angebot
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
