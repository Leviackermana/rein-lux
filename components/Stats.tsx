"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const started = performance.now();
    let id = 0;
    const run = (now: number) => {
      const p = Math.min((now - started) / 900, 1);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) id = requestAnimationFrame(run);
    };
    id = requestAnimationFrame(run);
    return () => cancelAnimationFrame(id);
  }, [visible, value]);

  return <span ref={ref}>{n}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: "+", label: "Jahre Erfahrung" },
  { value: 30, suffix: "+", label: "Objekte" },
  { value: 6, suffix: "", label: "Leistungen" },
] as const;

export default function Stats() {
  return (
    <section className="border-y border-white/5 bg-[#0e0e0e] py-6 sm:py-10">
      <div className="section-shell grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-8">
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="border-l border-[#D4AF37]/30 pl-4 sm:pl-5">
            <div className="font-display text-3xl font-semibold text-[#e0bd4d] sm:text-5xl">
              <Counter value={value} suffix={suffix} />
            </div>
            <div className="mt-1 text-xs text-white/45 sm:mt-2 sm:text-sm">{label}</div>
          </div>
        ))}
        <div className="border-l border-[#D4AF37]/30 pl-4 sm:pl-5">
          <div className="font-display text-3xl font-semibold text-[#e0bd4d] sm:text-5xl">Wien</div>
          <div className="mt-1 text-xs text-white/45 sm:mt-2 sm:text-sm">& Umgebung</div>
        </div>
      </div>
    </section>
  );
}
