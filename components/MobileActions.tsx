import { FileText, Phone } from "lucide-react";

export default function MobileActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/10 bg-[#090909]/95 p-2.5 pb-[max(.65rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-lg grid-cols-[.82fr_1.18fr] gap-2">
        <a
          href="tel:+436765501395"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[.04] px-3 text-sm font-semibold"
        >
          <Phone size={17} className="text-[#D4AF37]" /> Anrufen
        </a>
        <a
          href="#kontakt"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-3 text-sm font-semibold text-black"
        >
          <FileText size={17} /> Angebot anfordern
        </a>
      </div>
    </div>
  );
}
