import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * Scroll trigger for effects whose own element starts clipped or masked (a curtain wipe, a text mask).
 * A fully clipped element has no visible area, so the browser's observer would never report it; observe
 * an unclipped wrapper with this hook and drive the clipped child from `inView` instead.
 */
export function useReveal<T extends HTMLElement>(amount = 0.3) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}
