"use client";

import { FormEvent, useRef, useState } from "react";
import { Clock3, Mail, MapPin, Phone, Send } from "lucide-react";

type FieldErrors = Partial<Record<"name" | "email" | "phone" | "message" | "privacy", string>>;

const contacts = [
  [Phone, "Dejan Simijonovic", "+43 676 550 1395", "tel:+436765501395"],
  [Phone, "Sladjana Mitrovic", "+43 660 363 9235", "tel:+436603639235"],
  [Mail, "E-Mail", "office@reinlux.at", "mailto:office@reinlux.at"],
  [MapPin, "Adresse", "Hlawkagasse 10/4/43, 1100 Wien", "https://www.google.com/maps/search/?api=1&query=Hlawkagasse+10%2F4%2F43+1100+Wien"],
] as const;

function validate(values: Record<string, FormDataEntryValue>): FieldErrors {
  const errors: FieldErrors = {};
  const name = String(values.name ?? "").trim();
  const email = String(values.email ?? "").trim();
  const phone = String(values.phone ?? "").trim();
  const message = String(values.message ?? "").trim();

  if (name.length < 2) errors.name = "Bitte geben Sie Ihren Namen ein.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
  if (phone && !/^[+()\d\s/-]{6,30}$/.test(phone)) errors.phone = "Bitte prüfen Sie die Telefonnummer.";
  if (message.length < 10) errors.message = "Bitte beschreiben Sie Ihre Anfrage mit mindestens 10 Zeichen.";
  if (!values.privacy) errors.privacy = "Bitte bestätigen Sie die Datenschutzhinweise.";
  return errors;
}

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const startedAtRef = useRef<number | null>(null);

  function markFormStarted() {
    if (startedAtRef.current === null) startedAtRef.current = Date.now();
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    const nextErrors = validate(payload);

    setErrors(nextErrors);
    setStatusMessage("");
    if (Object.keys(nextErrors).length > 0) {
      setState("error");
      const firstKey = Object.keys(nextErrors)[0];
      const firstInvalid = firstKey ? formElement.elements.namedItem(firstKey) : null;
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }

    setState("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, startedAt: startedAtRef.current ?? Date.now() }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        throw new Error("Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.");
      }
      setState("success");
      setStatusMessage("Vielen Dank. Ihre Anfrage wurde erfolgreich gesendet.");
      setErrors({});
      formElement.reset();
    } catch (error) {
      setState("error");
      setStatusMessage(error instanceof Error ? error.message : "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.");
    }
  }

  return (
    <section id="kontakt" aria-labelledby="kontakt-title" className="section-pad grid-bg">
      <div className="section-shell grid gap-5 sm:gap-8 lg:grid-cols-[.85fr_1.15fr]">
        <div className="rounded-[1.5rem] border border-white/8 bg-black/35 p-5 backdrop-blur-sm sm:rounded-[2rem] sm:p-9">
          <div className="eyebrow">Kontakt</div>
          <h2 id="kontakt-title" className="font-display mt-3 text-[2.6rem] font-semibold leading-[.95] sm:mt-4 sm:text-5xl">Ihr Problemobjekt.<br /><span className="gold-text">Unser Gespräch.</span></h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/60 sm:mt-6 sm:text-base sm:leading-7">Beschreiben Sie uns kurz die Liegenschaft und wo heute überdurchschnittlich viel Aufwand entsteht. Wir melden uns für ein unverbindliches Erstgespräch.</p>
          <div className="mt-5 grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2 sm:mt-9 sm:block sm:space-y-5">
            {contacts.map(([Icon, label, value, href]) => {
              const I = Icon as typeof Phone;
              const external = String(href).startsWith("http");
              return (
                <a key={String(label)} href={String(href)} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-white/7 bg-white/[.025] p-3 transition hover:border-[#D4AF37]/35 sm:gap-4 sm:rounded-2xl sm:p-4">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D4AF37]/30 text-[#D4AF37] sm:h-11 sm:w-11"><I size={19} aria-hidden="true" /></div>
                  <div className="min-w-0"><div className="text-[10px] uppercase tracking-[.12em] text-white/55 sm:text-xs sm:tracking-[.15em]">{String(label)}</div><div className="mt-0.5 break-words text-xs text-white/80 sm:mt-1 sm:text-base">{String(value)}</div></div>
                </a>
              );
            })}
            <div className="min-[420px]:col-span-2 flex items-center gap-3 px-1 pt-1 text-xs text-white/55 sm:gap-4 sm:px-4 sm:text-sm"><Clock3 size={18} className="text-[#D4AF37]" aria-hidden="true" /> Mo–Fr: 07:00–16:00 Uhr</div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#D4AF37]/20 bg-[#101010]/92 p-5 shadow-[0_30px_100px_rgba(0,0,0,.35)] sm:rounded-[2rem] sm:p-9">
          <div className="flex items-center justify-between gap-6"><div><div className="eyebrow">Für Hausverwaltungen</div><h3 className="font-display mt-2 text-3xl font-semibold sm:mt-3 sm:text-4xl">Problemobjekt besprechen</h3></div><div className="hidden h-14 w-14 place-items-center rounded-full bg-[#D4AF37] text-black sm:grid" aria-hidden="true"><Send size={22} /></div></div>
          <form onSubmit={submit} onFocusCapture={markFormStarted} noValidate className="mt-6 grid gap-3.5 sm:mt-8 sm:grid-cols-2 sm:gap-4">
            <div>
              <label htmlFor="name" className="text-sm text-white/65">Name</label>
              <input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Vor- und Nachname" className="mt-2" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
              {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="text-sm text-white/65">Telefon</label>
              <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} placeholder="+43 ..." className="mt-2" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} />
              {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="text-sm text-white/65">E-Mail</label>
              <input id="email" name="email" required type="email" autoComplete="email" maxLength={254} placeholder="name@email.at" className="mt-2" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="text-sm text-white/65">Nachricht</label>
              <textarea id="message" name="message" required minLength={10} maxLength={3000} placeholder="Welche Liegenschaft verursacht aktuell überdurchschnittlich viel Aufwand?" className="mt-2" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
              {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="privacy" className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/8 bg-white/[.02] px-4 py-4 text-sm leading-6 text-white/55 transition hover:border-[#D4AF37]/25 hover:bg-[#D4AF37]/[.025]">
                <input id="privacy" name="privacy" required type="checkbox" className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#D4AF37]" aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? "privacy-error" : undefined} />
                <span>Ich stimme zu, dass meine Angaben ausschließlich zur Bearbeitung meiner Anfrage verwendet werden.</span>
              </label>
              {errors.privacy && <p id="privacy-error" className="field-error">{errors.privacy}</p>}
            </div>

            <div className="sm:col-span-2 pt-2">
              <button type="submit" disabled={state === "sending"} aria-busy={state === "sending"} className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#D4AF37] px-7 py-4 font-semibold text-black transition hover:bg-[#e6c95f] disabled:cursor-not-allowed disabled:opacity-60">
                {state === "sending" ? "Wird gesendet…" : "Kostenloses Problemobjekt besprechen"}<Send size={18} aria-hidden="true" />
              </button>
              <div aria-live="polite" aria-atomic="true">
                {statusMessage && <p className={`mt-4 text-sm ${state === "success" ? "text-emerald-300" : "text-red-300"}`}>{statusMessage}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
