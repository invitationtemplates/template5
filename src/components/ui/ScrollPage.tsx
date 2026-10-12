import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Height of the sticky top bar; each page fills the screen below it. */
export const BAR = 54;

const tones = {
  plain: "",
  warm: "bg-gradient-to-b from-paper-warm/50 via-paper to-paper-warm/40",
  blush: "bg-gradient-to-b from-blush-soft/60 via-paper to-blush-soft/50",
} as const;

/**
 * One full-screen "page" of the invitation. The section fills the screen below the top bar, snaps into
 * place while scrolling, and its content is driven by the scroll position itself: it rises and scales up as
 * the page arrives, holds while on screen, and eases away upward as the next page comes in.
 * `fill` makes the page exactly one screen tall (otherwise it is at least one screen and grows with content).
 */
export default function ScrollPage({
  id,
  tone = "plain",
  className = "",
  contentClassName = "",
  motionOn = true,
  decor,
  align = "center",
  children,
}: {
  id: string;
  tone?: keyof typeof tones;
  className?: string;
  contentClassName?: string;
  /** Set false for very tall pages (the full gallery) so their content is never scaled or faded. */
  motionOn?: boolean;
  /** Florals, sparkles, watermarks: pinned to the page itself (not to the scrolling content) */
  decor?: ReactNode;
  /** "stretch" lets one block fill the page's remaining height (used by Save the Date). */
  align?: "center" | "stretch";
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [70, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.93, 1, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.15, 1, 1, 0.3]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative flex snap-start flex-col overflow-hidden border-b border-gold-soft/30 ${align === "center" ? "justify-center" : ""} ${tones[tone]} ${className}`}
      style={{ minHeight: `max(600px, calc(100svh - ${BAR}px))` }}
    >
      {decor}
      <motion.div className={`relative ${align === "stretch" ? "flex flex-1 flex-col" : ""} ${contentClassName}`} style={reduce || !motionOn ? undefined : { y, scale, opacity }}>
        {children}
      </motion.div>
    </section>
  );
}
