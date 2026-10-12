import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Share2 } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { Monogram } from "../ui/Icons";

/**
 * Sticky top bar like every screen of the reference: the A R monogram on the left, a three-line menu on
 * the right. The menu opens a panel of anchor links and a share action; Escape closes it.
 */
export default function TopBar({ nav, title, initials }: { nav: InvitationConfig["nav"]; title: string; initials: [string, string] }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const share = async () => {
    const data = { title, text: title, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* the guest cancelled the share sheet */
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gold-soft/60 bg-[#FBF0DF]/95 backdrop-blur-md">
      <div className="flex h-[54px] items-center justify-between px-4">
        <a href="#home" aria-label="Back to the top">
          <Monogram a={initials[0]} b={initials[1]} className="h-10 w-[54px]" />
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full"
        >
          <span className="relative block h-[18px] w-[26px]" aria-hidden>
            <motion.span className="absolute left-0 top-0 block h-[2.5px] w-full rounded bg-ink" animate={open ? { y: 7.5, rotate: 45 } : { y: 0, rotate: 0 }} />
            <motion.span className="absolute left-0 top-[7.5px] block h-[2.5px] w-full rounded bg-ink" animate={{ opacity: open ? 0 : 1 }} />
            <motion.span className="absolute left-0 top-[15px] block h-[2.5px] w-full rounded bg-ink" animate={open ? { y: -7.5, rotate: -45 } : { y: 0, rotate: 0 }} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Main"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gold-soft/50 bg-[#FBF0DF]"
          >
            <ul className="px-6 py-2 font-serif text-[17px] text-cocoa">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-gold-soft/40">
                  <a href={item.href} onClick={() => setOpen(false)} className="block py-3">
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="py-3">
                <button type="button" onClick={share} className="flex items-center gap-2 text-gold-deep">
                  <Share2 className="h-4 w-4" /> {copied ? "Link copied" : "Share invitation"}
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
