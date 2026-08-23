const steps = [
  ["01", "Besichtigung", "Wir besichtigen Ihr Objekt und klären Anforderungen."],
  ["02", "Angebot", "Sie erhalten ein klares, unverbindliches Angebot."],
  ["03", "Ausführung", "Unser Team arbeitet nach vereinbartem Leistungsumfang."],
  ["04", "Qualitätskontrolle", "Die Ausführung wird geprüft. Auffälligkeiten und notwendige Nachbesserungen werden intern nachverfolgt."],
  ["05", "Zufriedener Kunde", "Sie erhalten verlässliche Betreuung im Alltag."],
] as const;

export default function Process() {
  return (
    <section id="ablauf" aria-labelledby="ablauf-title" className="section-pad">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow">So arbeiten wir</div>
          <h2 id="ablauf-title" className="font-display mt-4 text-[2.65rem] font-semibold leading-[.98] sm:text-6xl">
            Einfach. Transparent. <span className="gold-text">Zuverlässig.</span>
          </h2>
        </div>

        <ol className="process-list relative mt-9 grid gap-0 md:mt-16 md:grid-cols-5 md:gap-8">
          {steps.map(([number, title, text], i) => (
            <li key={title} className="process-step relative flex gap-4 pb-5 last:pb-0 md:block md:pb-0 md:text-center">
              <div className="flex flex-col items-center md:block">
                <div className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D4AF37]/40 bg-[#0b0b0b] font-display text-sm text-[#e0bd4d] md:mx-auto md:h-12 md:w-12 md:text-lg">
                  {number}
                </div>
                {i < steps.length - 1 && <div className="mt-1 h-full w-px bg-[#D4AF37]/20 md:hidden" aria-hidden="true" />}
              </div>
              <div className="pt-1.5 md:pt-0">
                <h3 className="font-semibold md:mt-5">{title}</h3>
                <p className="mt-1 text-sm leading-5 text-white/55 md:mx-auto md:mt-2 md:max-w-[180px] md:leading-6">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
