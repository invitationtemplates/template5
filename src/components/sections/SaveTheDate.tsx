import { AnimatePresence, motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import { useCountdown } from "../../hooks/useCountdown";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { Divider, Floral, PageTitle } from "../ui/Decor";
import { Sparkles } from "../ui/Effects";
import ScrollPage from "../ui/ScrollPage";

/** One countdown box: the number slides in when it changes; the box itself flips up when it enters. */
function Tile({ value, label, index }: { value: number; label: string; index: number }) {
  const text = String(value).padStart(2, "0");
  return (
    <motion.div
      className="rounded-2xl border border-gold-soft/70 bg-paper-pale/70 px-1 pb-3 pt-3.5 text-center shadow-soft"
      initial={{ opacity: 0, rotateX: -70, y: 24 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.3 + index * 0.14 }}
      style={{ transformOrigin: "50% 100%" }}
    >
      <div className="relative h-[48px] overflow-hidden font-serif text-[40px] font-normal leading-[48px] text-gold" aria-hidden>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={text} className="block" initial={{ y: "70%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-70%", opacity: 0 }} transition={{ duration: 0.35 }}>
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="font-serif text-[15px] text-ink">{label}</div>
    </motion.div>
  );
}

/**
 * Save the Date: a floral corner, the live countdown in three boxes (Days, Hours, Secs, as in the design),
 * the date, and a blush watercolour panel carrying the couple's line.
 */
export default function SaveTheDate({ std, parts, start }: { std: InvitationConfig["saveTheDate"]; parts: EventParts; start: string }) {
  const c = useCountdown(start);
  const summary = c.done ? "The wedding day has arrived" : `${c.days} days, ${c.hours} hours, ${c.minutes} minutes and ${c.seconds} seconds to go`;

  return (
    <ScrollPage
      id="save-the-date"
      tone="plain"
      className="px-5 pt-[92px]"
      motionOn={false}
      align="stretch"
      decor={
        <>
          <Floral kind="top2" width="50%" />
          <Sparkles count={8} />
        </>
      }
    >
      <div className="relative">
        <PageTitle ornament={false} subtitle={std.subtitle}>
          {std.heading}
        </PageTitle>

        <p className="sr-only" role="timer">
          {summary}
        </p>

        {c.done ? (
          <p className="mt-8 text-center font-script text-[44px] text-cocoa">The celebration has begun!</p>
        ) : (
          <div className="mx-auto mt-7 grid max-w-[340px] grid-cols-3 gap-3 [perspective:700px]">
            <Tile value={c.days} label="Days" index={0} />
            <Tile value={c.hours} label="Hours" index={1} />
            <Tile value={c.seconds} label="Secs" index={2} />
          </div>
        )}

        <motion.p
          className="mt-7 flex items-center justify-center gap-3 font-serif text-[17px] text-ink"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-paper-pale">
            <CalendarDays className="h-5 w-5" aria-hidden />
          </span>
          {parts.weekday}, {parts.day} {parts.monthLong} {parts.year}
        </motion.p>

        <Divider className="mt-7" />
      </div>

      {/* Blush watercolour panel with the couple's line */}
      <div className="relative -mx-5 mt-6 flex min-h-[260px] flex-1 items-center justify-center px-6 py-12">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,rgba(249,214,190,0.95),rgba(251,228,208,0.6)_55%,transparent_82%)]" />
        <div aria-hidden className="absolute -left-10 top-6 h-28 w-40 rounded-full bg-blush-deep/40 blur-2xl" />
        <div aria-hidden className="absolute -right-8 bottom-4 h-28 w-40 rounded-full bg-blush-deep/40 blur-2xl" />
        <Floral kind="tl" width="22%" className="!top-0" />
        <Floral kind="tr" width="26%" mirror />
        <Floral kind="bl" width="16%" className="opacity-90" />
        <Floral kind="br" width="22%" />
        <motion.p
          className="relative text-center font-serif text-[clamp(28px,8vw,34px)] font-normal italic leading-[1.35] text-gold"
          initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2 }}
        >
          {std.quote.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </motion.p>
      </div>
    </ScrollPage>
  );
}
