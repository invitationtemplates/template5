import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, MapPin } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { Petals, Sparkles } from "../ui/Effects";
import { BAR } from "../ui/ScrollPage";

const ease = [0.22, 1, 0.36, 1] as const;

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

/** The date in its ornate frame: thin double border with small curled corners. */
function DateFrame({ parts }: { parts: EventParts }) {
  const curl = (rot: number, pos: string) => (
    <svg viewBox="0 0 24 24" className={`absolute h-5 w-5 text-gold ${pos}`} style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
      <path d="M2 22 V10 C2 5 5 2 10 2 H22 M2 14 C6 14 10 10 10 6" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
  return (
    <motion.div {...enter(1.5)} className="relative mx-auto w-[152px] rounded-md border border-gold-soft bg-paper-pale/40 px-4 pb-3 pt-2.5 text-center">
      <span aria-hidden className="absolute inset-[3px] rounded-[3px] border border-gold-soft/70" />
      {curl(0, "-left-1.5 -top-1.5")}
      {curl(90, "-right-1.5 -top-1.5")}
      {curl(270, "-bottom-1.5 -left-1.5")}
      {curl(180, "-bottom-1.5 -right-1.5")}
      <p className="relative font-caps text-[15px] font-semibold uppercase tracking-[0.16em] text-ink">{parts.weekday}</p>
      <p className="relative font-serif text-[clamp(44px,6.4svh,56px)] font-medium leading-[1.05] text-cocoa">{parts.day}</p>
      <p className="relative font-caps text-[14px] font-semibold uppercase tracking-[0.16em] text-ink">
        {parts.monthLong} {parts.year}
      </p>
    </motion.div>
  );
}

/**
 * Hero: the whole first screen. The supplied picture fills the upper part and fades into the paper; the
 * invitation, date frame and venue sit below it with a strip of flowers and a glowing diya at the very
 * bottom. The picture settles from a zoom, and zooms on as the guest scrolls away.
 */
export default function Hero({ config, parts }: { config: InvitationConfig; parts: EventParts }) {
  const { couple, hero, venue } = config;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const infoY = useTransform(scrollYProgress, [0, 1], [0, -36]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex snap-start flex-col overflow-hidden bg-[linear-gradient(180deg,#FBF3E2_0%,#FAEBD3_55%,#F7DDB8_100%)]"
      style={{ height: `max(620px, calc(100svh - ${BAR}px))` }}
    >
      {/* Picture, fading into the paper at its lower edge */}
      <div className="relative min-h-0 flex-1 overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)", maskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)" }}>
        <motion.div className="absolute inset-0" style={{ scale: photoScale, y: photoY }}>
          <motion.img
            src={photoUrl(hero.photo, 1000)}
            alt={hero.photo.alt}
            width={848}
            height={1280}
            decoding="async"
            {...({ fetchpriority: "high" } as Record<string, string>)}
            className="h-full w-full object-cover object-[50%_46%]"
            initial={{ scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.6, ease }}
          />
        </motion.div>
        <Sparkles count={10} />
        <Petals />
      </div>

      {/* Invitation */}
      <motion.div className="relative z-10 -mt-7 px-5 pb-[84px] text-center" style={{ y: infoY }}>
        <motion.span {...enter(0.4)} className="mx-auto block w-fit rounded-full bg-paper-pale/90 px-5 py-1.5 font-caps text-[15px] font-semibold uppercase tracking-[0.14em] text-ink shadow-soft backdrop-blur">
          {hero.badge}
        </motion.span>

        <h1 className="mt-1.5 font-script text-[clamp(42px,7.6svh,58px)] leading-[1.08]">
          <motion.span initial={{ opacity: 0, x: -24, filter: "blur(6px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ duration: 1.1, ease, delay: 0.6 }} className="script-ink inline-block">
            {couple.first} &amp;
          </motion.span>
          <br />
          <motion.span initial={{ opacity: 0, x: 24, filter: "blur(6px)" }} animate={{ opacity: 1, x: 0, filter: "blur(0px)" }} transition={{ duration: 1.1, ease, delay: 0.85 }} className="script-ink inline-block">
            {couple.second}
          </motion.span>
        </h1>

        <motion.p {...enter(1.1)} className="mx-auto mt-1.5 max-w-[310px] font-caps text-[clamp(15px,2.3svh,17px)] font-semibold uppercase leading-[1.35] tracking-[0.08em] text-ink">
          {hero.invite.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </motion.p>

        <div className="mt-3">
          <DateFrame parts={parts} />
        </div>

        <motion.div {...enter(1.7)} className="mx-auto mt-3 flex w-fit items-center gap-3 text-left">
          <MapPin className="h-8 w-8 shrink-0 fill-gold text-gold" strokeWidth={1.4} aria-hidden />
          <p className="font-serif text-[19px] font-medium leading-tight text-ink">
            {venue.name}
            <span className="block text-[15px] font-normal text-ink-soft">{venue.address}</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Flowers and a glowing diya along the bottom edge */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[74px] overflow-hidden" aria-hidden style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 45%)", maskImage: "linear-gradient(to bottom, transparent 0%, #000 45%)" }}>
        <img src={photoUrl(hero.flowers, 900)} alt="" width={872} height={388} loading="lazy" decoding="async" className="absolute bottom-0 left-0 h-full w-full object-cover object-bottom" />
        <span className="absolute bottom-[10px] left-1/2 h-14 w-14 -translate-x-1/2 animate-glow rounded-full bg-[radial-gradient(circle,rgba(255,214,120,0.85),rgba(255,170,60,0)_68%)] mix-blend-screen" />
      </div>

      <a
        href="#save-the-date"
        aria-label="Scroll to the next page"
        className="absolute bottom-3.5 left-1/2 z-20 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full bg-paper-pale/90 text-gold-deep shadow-card"
      >
        <ArrowDown className="h-5 w-5 animate-bob" aria-hidden />
      </a>
    </section>
  );
}
