"use client";

import { FormEvent, useState } from "react";
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";

const contacts = [
  [Phone, "Dejan Simijonovic", "+43 676 550 1395", "tel:+436765501395"],
  [Phone, "Sladjana Mitrovic", "+43 660 363 9235", "tel:+436603639235"],
  [Mail, "E-Mail", "office@reinlux.at", "mailto:office@reinlux.at"],
  [MapPin, "Adresse", "Hlawkagasse 10/4/43, 1100 Wien", "https://www.google.com/maps/search/?api=1&query=Hlawkagasse+10%2F4%2F43+1100+Wien"],
] as const;

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setMessage("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Nachricht konnte nicht gesendet werden.");
      setState("success");
      setMessage("Vielen Dank. Ihre Anfrage wurde gesendet.");
      e.currentTarget.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Etwas ist schiefgelaufen.");
    }
  }

  return (
    <section id="kontakt" className="section-pad grid-bg">
      <div className="section-shell grid gap-5 sm:gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-[1.5rem] border border-white/8 bg-black/35 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-9">
          <div className="eyebrow">Kontakt</div>
          <h2 className="font-display mt-3 text-[2.6rem] font-semibold leading-[.95] sm:mt-4 sm:text-5xl">Ihr Objekt.<br /><span className="gold-text">Unser Angebot.</span></h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/50 sm:mt-6 sm:text-base sm:leading-7">Schreiben Sie uns kurz, welche Reinigung Sie benötigen. Wir melden uns für eine kostenlose Besichtigung und ein unverbindliches Angebot.</p>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-9 sm:block sm:space-y-5">
            {contacts.map(([Icon, label, value, href]) => {
              const I = Icon as typeof Phone;
              return (
                <a key={String(label)} href={String(href)} target={String(href).startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-white/7 bg-white/[.025] p-3 transition hover:border-[#D4AF37]/35 sm:gap-4 sm:rounded-2xl sm:p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] sm:h-11 sm:w-11"><I size={19} /></div>
                  <div className="min-w-0"><div className="hidden text-xs uppercase tracking-[.15em] text-white/30 sm:block">{String(label)}</div><div className="truncate text-xs text-white/80 sm:mt-1 sm:text-base">{String(value)}</div></div>
                </a>
              );
            })}
            <div className="col-span-2 flex items-center gap-3 px-1 pt-1 text-xs text-white/45 sm:gap-4 sm:px-4 sm:text-sm"><Clock3 size={18} className="text-[#D4AF37]" /> Mo–Fr: 07:00–16:00 Uhr</div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-[#101010]/92 p-5 shadow-[0_30px_100px_rgba(0,0,0,.35)] sm:rounded-[2rem] sm:p-9">
          <div className="flex items-center justify-between gap-6"><div><div className="eyebrow">Kostenlose Anfrage</div><h3 className="font-display mt-2 text-3xl font-semibold sm:mt-3 sm:text-4xl">Angebot anfordern</h3></div><div className="hidden h-14 w-14 place-items-center rounded-full bg-[#D4AF37] text-black sm:grid"><Send size={22} /></div></div>
          <form onSubmit={submit} className="mt-6 grid gap-3.5 sm:mt-8 sm:grid-cols-2 sm:gap-4">
            <label className="text-sm text-white/55">Name<input name="name" required minLength={2} placeholder="Vor- und Nachname" className="mt-2" /></label>
            <label className="text-sm text-white/55">Telefon<input name="phone" type="tel" placeholder="+43 ..." className="mt-2" /></label>
            <label className="text-sm text-white/55 sm:col-span-2">E-Mail<input name="email" required type="email" placeholder="name@email.at" className="mt-2" /></label>
            <label className="text-sm text-white/55 sm:col-span-2">Nachricht<textarea name="message" required minLength={10} placeholder="Welche Reinigung benötigen Sie?" className="mt-2" /></label>
            <label className="sm:col-span-2 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/8 bg-white/[.02] px-4 py-4 text-sm leading-6 text-white/50 transition hover:border-[#D4AF37]/25 hover:bg-[#D4AF37]/[.025]">
              <input
                name="privacy"
                required
                type="checkbox"
                className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#D4AF37]"
              />
              <span>
                Ich stimme zu, dass meine Angaben ausschließlich zur Bearbeitung meiner Anfrage verwendet werden.
              </span>
            </label>
            <div className="sm:col-span-2 pt-2">
              <button disabled={state === "sending"} className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-black transition hover:bg-[#e6c95f] disabled:opacity-60">{state === "sending" ? "Wird gesendet…" : "Kostenloses Angebot anfordern"}<Send size={18} /></button>
              {message && <p className={`mt-4 text-sm ${state === "success" ? "text-emerald-400" : "text-red-400"}`}>{message}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
