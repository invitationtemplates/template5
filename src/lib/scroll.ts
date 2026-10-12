import { BAR } from "../components/ui/ScrollPage";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

let running = 0;

/**
 * Smoothly scrolls so that the element with `id` sits just under the sticky top bar.
 *
 * The browser's own smooth scroll is cancelled part-way on a long page like this one (images and
 * animated sections shift the layout while it runs), so the animation is done here and the target is
 * re-measured on every frame. Scroll snapping is paused while it runs so it cannot fight the animation.
 */
export function scrollToId(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const html = document.documentElement;
  const aim = () => Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - BAR));

  if (reduced()) {
    window.scrollTo(0, aim());
    return;
  }

  const token = ++running;
  const from = window.scrollY;
  const start = performance.now();
  const duration = Math.min(1400, 500 + Math.abs(aim() - from) * 0.35);
  const prevSnap = html.style.scrollSnapType;
  const prevBehavior = html.style.scrollBehavior;
  html.style.scrollSnapType = "none";
  html.style.scrollBehavior = "auto";

  const finish = () => {
    html.style.scrollSnapType = prevSnap;
    html.style.scrollBehavior = prevBehavior;
  };
  const cancel = () => {
    running++;
    finish();
  };
  window.addEventListener("wheel", cancel, { once: true, passive: true });
  window.addEventListener("touchstart", cancel, { once: true, passive: true });

  const step = (now: number) => {
    if (token !== running) return;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, from + (aim() - from) * ease(t));
    if (t < 1) requestAnimationFrame(step);
    else {
      window.scrollTo(0, aim());
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      finish();
      history.replaceState(null, "", `#${id}`);
    }
  };
  requestAnimationFrame(step);
}

/** Routes every in-page "#section" link through scrollToId. Returns a cleanup function. */
export function installAnchorScrolling(): () => void {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
    if (!a) return;
    const id = a.getAttribute("href")!.slice(1);
    if (!id || !document.getElementById(id)) return;
    e.preventDefault();
    scrollToId(id);
  };
  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
