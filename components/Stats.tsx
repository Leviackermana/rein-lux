"use client";

import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      const started = performance.now();
      const duration = 750;
      const animate = (now: number) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = `${Math.round(value * eased)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
    }, { rootMargin: "0px 0px -10%" });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [suffix, value]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: "+", label: "Jahre Erfahrung" },
  { value: 30, suffix: "+", label: "Objekte" },
  { value: 4, suffix: "", label: "Leistungen" },
] as const;

export default function Stats() {
  return (
    <section aria-label="REIN LUX in Zahlen" className="border-y border-white/5 bg-[#0e0e0e] py-6 sm:py-10">
      <div className="section-shell grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-8">
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="border-l border-[#D4AF37]/30 pl-4 sm:pl-5">
            <div className="font-display text-3xl font-semibold text-[#e0bd4d] sm:text-5xl">
              <Counter value={value} suffix={suffix} />
            </div>
            <div className="mt-1 text-xs text-white/60 sm:mt-2 sm:text-sm">{label}</div>
          </div>
        ))}
        <div className="border-l border-[#D4AF37]/30 pl-4 sm:pl-5">
          <div className="font-display text-3xl font-semibold text-[#e0bd4d] sm:text-5xl">Wien</div>
          <div className="mt-1 text-xs text-white/60 sm:mt-2 sm:text-sm">&amp; Umgebung</div>
        </div>
      </div>
    </section>
  );
}
