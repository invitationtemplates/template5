import { motion } from "motion/react";
import type { ReactNode } from "react";
import flTl from "../../assets/florals/fl-tl.png";
import flTr from "../../assets/florals/fl-tr.png";
import flBl from "../../assets/florals/fl-bl.png";
import flBr from "../../assets/florals/fl-br.png";
import flStrip from "../../assets/florals/fl-strip.png";
import flStripRsvp from "../../assets/florals/fl-strip-rsvp.png";
import flTopS2 from "../../assets/florals/fl-top-left-s2.png";

/** Decorative images are hidden from assistive tech and never take pointer events. */
const base = "pointer-events-none select-none";

const FLORALS = {
  tl: { src: flTl, w: 333, h: 363, place: "left-0 top-0", origin: "origin-top-left" },
  tr: { src: flTr, w: 429, h: 447, place: "right-0 top-0", origin: "origin-top-right" },
  bl: { src: flBl, w: 207, h: 510, place: "left-0 bottom-0", origin: "origin-bottom-left" },
  br: { src: flBr, w: 270, h: 264, place: "right-0 bottom-0", origin: "origin-bottom-right" },
  top2: { src: flTopS2, w: 291, h: 189, place: "left-0 top-0", origin: "origin-top-left" },
  strip: { src: flStrip, w: 531, h: 222, place: "inset-x-0 bottom-0", origin: "origin-bottom" },
  stripRsvp: { src: flStripRsvp, w: 588, h: 165, place: "inset-x-0 bottom-0", origin: "origin-bottom" },
} as const;

export type FloralKind = keyof typeof FLORALS;

/**
 * A painted floral piece pinned to a corner or edge of a page. It blooms in when scrolled into view,
 * then sways very gently. `width` is a CSS width (e.g. "46%"). `mirror` flips it horizontally.
 */
export function Floral({ kind, width = "40%", mirror = false, className = "", delay = 0 }: { kind: FloralKind; width?: string; mirror?: boolean; className?: string; delay?: number }) {
  const f = FLORALS[kind];
  return (
    <div className={`${base} absolute ${f.place} ${className}`} style={{ width }} aria-hidden>
      <motion.div
        className={`${f.origin}`}
        initial={{ opacity: 0, scale: 0.82, rotate: mirror ? 6 : -6 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <img src={f.src} alt="" width={f.w} height={f.h} loading="lazy" decoding="async" className={`h-auto w-full ${f.origin} animate-sway ${mirror ? "-scale-x-100" : ""}`}
          style={kind === "bl" ? { WebkitMaskImage: "linear-gradient(to right, #000 55%, transparent 100%)", maskImage: "linear-gradient(to right, #000 55%, transparent 100%)" } : undefined}
        />
      </motion.div>
    </div>
  );
}

/** The small gold fleuron that sits above every page title; its two arms draw outward. */
export function TopOrnament({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 22"
      className={`${base} mx-auto h-[18px] w-[104px] text-gold ${className}`}
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.path
        d="M60 11 C54 4 46 3 38 7 C32 10 28 8 24 5 M60 11 C66 4 74 3 82 7 C88 10 92 8 96 5 M20 11 H44 M76 11 H100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.2, ease: "easeOut" } } }}
      />
      <motion.path d="M60 5 l4 6 -4 6 -4 -6 z" fill="currentColor" variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring" } } }} style={{ transformOrigin: "60px 11px" }} />
    </motion.svg>
  );
}

/** Larger fleuron divider with a lozenge centre, used between blocks of text. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 220 28"
      className={`${base} mx-auto h-7 w-[200px] text-gold ${className}`}
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <motion.path
        d="M10 14 H84 M136 14 H210 M84 14 C90 6 98 6 104 12 M136 14 C130 6 122 6 116 12 M84 14 C90 22 98 22 104 16 M136 14 C130 22 122 22 116 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 1.3, ease: "easeOut" } } }}
      />
      <motion.g variants={{ hidden: { opacity: 0, scale: 0.3 }, show: { opacity: 1, scale: 1, transition: { delay: 0.5, type: "spring", stiffness: 180, damping: 12 } } }} style={{ transformOrigin: "110px 14px" }}>
        <path d="M110 4 l6 10 -6 10 -6 -10 z" fill="currentColor" />
        <circle cx="110" cy="14" r="2.2" fill="#FBF3E2" />
        <circle cx="94" cy="14" r="1.6" fill="currentColor" />
        <circle cx="126" cy="14" r="1.6" fill="currentColor" />
      </motion.g>
    </motion.svg>
  );
}

/** Four-point gold sparkle, used either side of the "Gallery", "RSVP" and "Venue" titles. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-12 -12 24 24" className={`${base} h-5 w-5 text-gold ${className}`} aria-hidden>
      <path d="M0 -10 C1.500 -3 3 -1.500 10 0 C3 1.500 1.500 3 0 10 C-1.500 3 -3 1.500 -10 0 C-3 -1.500 -1.500 -3 0 -10Z" fill="currentColor" />
      <circle cx="-9" cy="-8" r="1.300" fill="currentColor" />
      <circle cx="9" cy="8" r="1.300" fill="currentColor" />
    </svg>
  );
}

/**
 * Page title in script, centred. `sparkles` adds the small gold ornaments either side (as on the
 * Gallery, RSVP and Venue pages). The words rise in one after another.
 */
export function PageTitle({ children, sparkles = false, ornament = true, subtitle, className = "" }: { children: string; sparkles?: boolean; ornament?: boolean; subtitle?: ReactNode; className?: string }) {
  const words = children.split(" ");
  return (
    <header className={`relative z-10 text-center ${className}`}>
      {ornament && <TopOrnament className="mb-3" />}
      <div className="flex items-center justify-center gap-3">
        {sparkles && <Sparkle />}
        <h2 aria-label={children} className={`font-script leading-[1.15] text-cocoa ${children.length > 14 ? "text-[clamp(32px,9.4vw,40px)]" : "text-[clamp(40px,12vw,50px)]"}`}>
          {words.map((w, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="inline-block"
              initial={{ opacity: 0, y: 18, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.12 }}
            >
              <span className="script-ink inline-block">{w}</span>
              {" "}
            </motion.span>
          ))}
        </h2>
        {sparkles && <Sparkle />}
      </div>
      {subtitle && (
        <motion.p
          className="mx-auto mt-2 max-w-[300px] font-serif text-[16px] leading-snug text-ink"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </header>
  );
}
