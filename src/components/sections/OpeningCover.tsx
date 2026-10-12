import { useEffect, useState, type KeyboardEvent } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { Petals, Sparkles } from "../ui/Effects";

const ease = [0.22, 1, 0.36, 1] as const;

// Petals bursting from the seal when tapped: [angle deg, distance px, size px, colour]
const COLOURS = ["from-[#F7C9B8] to-[#EBA088]", "from-[#FADDC8] to-[#F3B79B]", "from-[#FBE3CF] to-[#F1B896]", "from-[#F9D2C2] to-[#E8957E]"];
const BURST: [number, number, number, string][] = Array.from({ length: 18 }, (_, i) => [i * 20 + (i % 2) * 7, 110 + ((i * 37) % 120), 10 + ((i * 5) % 9), COLOURS[i % COLOURS.length]]);

/**
 * Full-screen "Tap to open" cover over the invitation's own picture. Tap (or Enter/Space) -> petals burst
 * from the gold seal, the writing fades, and the cover shrinks into the seal to reveal the invitation.
 * `onOpenStart` fires synchronously inside the tap so music can start under the tap's permission.
 */
export default function OpeningCover({
  config,
  parts,
  guest,
  initials,
  onOpenStart,
  onOpened,
}: {
  config: InvitationConfig;
  parts: EventParts;
  guest: string;
  initials: [string, string];
  onOpenStart: () => void;
  onOpened: () => void;
}) {
  const { couple, cover, hero } = config;
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [tapped, setTapped] = useState(false);
  const reduce = useReducedMotion();

  // Lock page scroll behind the cover and put keyboard focus on it.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    scope.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [scope]);

  const open = async () => {
    if (tapped) return;
    setTapped(true);
    onOpenStart();

    if (reduce) {
      await animate(scope.current, { opacity: 0 }, { duration: 0.35 });
      onOpened();
      return;
    }
    animate("[data-seal]", { scale: [1, 0.88, 1.12] }, { duration: 0.5 });
    animate("[data-content]", { opacity: 0, y: -12 }, { duration: 0.5, delay: 0.3 });
    await animate(scope.current, { clipPath: "circle(0% at 50% 82%)" }, { duration: 1, ease: [0.65, 0, 0.35, 1], delay: 0.45 });
    onOpened();
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      ref={scope}
      role="button"
      tabIndex={0}
      aria-label={`${cover.tap}: open the wedding invitation of ${couple.first} and ${couple.second}`}
      onClick={open}
      onKeyDown={onKey}
      style={{ clipPath: "circle(150% at 50% 82%)" }}
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden bg-paper outline-none"
    >
      <div className="relative mx-auto h-full w-full max-w-[430px] overflow-hidden">
        <motion.img
          src={photoUrl(hero.photo, 900)}
          alt=""
          aria-hidden
          className="absolute inset-x-0 top-0 h-[62%] w-full object-cover object-[50%_45%]"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 2.4, ease }}
        />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(251,243,226,0)_34%,rgba(251,243,226,0.85)_56%,#FBF3E2_66%)]" />
        <Sparkles count={14} />
        <Petals />

        <div data-content className="absolute inset-x-0 bottom-0 flex h-[58%] flex-col items-center justify-start px-6 pt-4 text-center">
          {guest && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.3 }} className="mb-1 font-serif text-[17px] italic text-ink-soft">
              {cover.dear} {guest}
            </motion.p>
          )}
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.4 }} className="font-caps text-[15px] font-bold uppercase tracking-[0.3em] text-gold-deep">
            {cover.invited}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1.3, ease, delay: 0.7 }}
            className="mt-1 font-script text-[clamp(46px,14vw,60px)] leading-[1.1]"
          >
            <span className="script-ink inline-block">
              {couple.first} &amp;
            </span>
            <br />
            <span className="script-ink inline-block">{couple.second}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mt-2 font-serif text-[16px] text-ink">
            {parts.weekday}, {parts.day} {parts.monthLong} {parts.year}
          </motion.p>
        </div>

        {/* Seal + prompt */}
        <div className="absolute left-1/2 top-[82%] -translate-x-1/2 -translate-y-1/2">
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 140, damping: 14, delay: 1.2 }}>
            <div data-seal className="relative grid h-[82px] w-[82px] place-items-center">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full border-2 border-gold/60 [animation-duration:2.2s] motion-reduce:hidden" />
              <span aria-hidden className="absolute -inset-3 animate-glow rounded-full bg-[radial-gradient(circle,rgba(210,169,88,0.45),rgba(210,169,88,0)_70%)]" />
              <span className="relative grid h-full w-full place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#E9CB86,#B98A3E_55%,#7E5517)] text-[#FFF8E8] shadow-[0_8px_20px_-6px_rgba(90,58,18,0.65),inset_0_0_0_3px_rgba(255,244,210,0.5)]">
                <span className="font-script text-[34px] leading-none">
                  {initials[0]}
                  {initials[1]}
                </span>
              </span>
            </div>
          </motion.div>

          {tapped &&
            !reduce &&
            BURST.map(([angle, dist, size, colour], i) => (
              <motion.span
                key={i}
                aria-hidden
                className={`pointer-events-none absolute left-1/2 top-1/2 rounded-[60%_40%_60%_40%] bg-gradient-to-br ${colour}`}
                style={{ width: size, height: size * 1.3, marginLeft: -size / 2, marginTop: -size / 2 }}
                initial={{ x: 0, y: 0, opacity: 0.95, rotate: 0, scale: 0.6 }}
                animate={{ x: Math.cos((angle * Math.PI) / 180) * dist, y: Math.sin((angle * Math.PI) / 180) * dist - 30, opacity: 0, rotate: angle + 140, scale: 1 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              />
            ))}
        </div>

        <motion.p
          data-content
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute inset-x-0 top-[calc(82%+64px)] animate-pulse text-center font-caps text-[15px] font-bold uppercase tracking-[0.3em] text-cocoa"
        >
          {cover.tap}
        </motion.p>
      </div>
    </div>
  );
}
