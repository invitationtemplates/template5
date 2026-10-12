import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

const base = "pointer-events-none select-none";

/** Thin gold line at the very top of the page that fills as the guest scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return (
    <div className={`${base} fixed left-1/2 top-0 z-[60] h-[3px] w-full max-w-[430px] -translate-x-1/2`} aria-hidden>
      <motion.div className="h-full origin-left bg-gradient-to-r from-gold-light via-gold to-cocoa" style={{ scaleX }} />
    </div>
  );
}

// Falling petals: [left %, delay s, size px, duration s, colour]. Deterministic, so renders are stable.
const PETALS: [number, number, number, number, string][] = [
  [7, 0, 11, 12, "from-[#F7C9B8] to-[#EBA088]"],
  [23, 4, 13, 14, "from-[#FADDC8] to-[#F3B79B]"],
  [40, 1.5, 10, 11.5, "from-[#F9D2C2] to-[#E8957E]"],
  [58, 6, 12, 13, "from-[#FBE3CF] to-[#F1B896]"],
  [74, 2.8, 11, 12.5, "from-[#F7C9B8] to-[#EBA088]"],
  [90, 7, 13, 15, "from-[#FADDC8] to-[#F3B79B]"],
];

/** Blush rose petals drifting down a page. CSS transforms only; hidden for reduced-motion guests. */
export function Petals({ className = "" }: { className?: string }) {
  return (
    <div className={`${base} absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`} aria-hidden>
      {PETALS.map(([left, delay, size, dur, colour], i) => (
        <span
          key={i}
          className={`absolute -top-5 animate-fall rounded-[60%_40%_60%_40%] bg-gradient-to-br ${colour} opacity-0`}
          style={{ left: `${left}%`, width: size, height: size * 1.3, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}
        />
      ))}
    </div>
  );
}

const DUST: [number, number, number, number, number][] = Array.from({ length: 18 }, (_, i) => [
  (i * 41.3 + 7) % 100,
  (i * 27.7 + 11) % 100,
  2 + ((i * 3) % 3),
  (i * 0.43) % 3,
  2.2 + ((i * 0.37) % 2.4),
]);

/** Small four-point gold stars that fade in and out, scattered over a page. */
export function Sparkles({ className = "", count = 12 }: { className?: string; count?: number }) {
  return (
    <div className={`${base} absolute inset-0 overflow-hidden motion-reduce:hidden ${className}`} aria-hidden>
      {DUST.slice(0, count).map(([x, y, size, delay, dur], i) => (
        <svg key={i} viewBox="-10 -10 20 20" className="absolute animate-twinkle" style={{ left: `${x}%`, top: `${y}%`, width: size * 3, height: size * 3, animationDelay: `${delay}s`, animationDuration: `${dur}s` }}>
          <path d="M0 -9 C1 -3 3 -1 9 0 C3 1 1 3 0 9 C-1 3 -3 1 -9 0 C-3 -1 -1 -3 0 -9Z" fill="#E2B964" />
        </svg>
      ))}
    </div>
  );
}

/** A brief burst of tiny gold and blush sparks wherever the guest taps or clicks. */
export function TapSparkles() {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const next = useRef(0);

  useEffect(() => {
    if (reduce) return;
    const onDown = (e: PointerEvent) => {
      const id = next.current++;
      setBursts((b) => [...b.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 800);
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [reduce]);

  if (reduce) return null;
  return (
    <div className={`${base} fixed inset-0 z-[70]`} aria-hidden>
      {bursts.map((b) =>
        Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <motion.span
              key={`${b.id}-${i}`}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{ left: b.x, top: b.y, background: i % 2 ? "#D2A958" : "#EBA088" }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: Math.cos(a) * 26, y: Math.sin(a) * 26, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          );
        }),
      )}
    </div>
  );
}
