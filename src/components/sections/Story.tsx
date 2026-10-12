import { motion } from "motion/react";
import { Coffee, Heart } from "lucide-react";
import type { InvitationConfig, StoryIcon } from "../../types";
import { photoUrl } from "../../lib/image";
import { PageTitle } from "../ui/Decor";
import { RingIcon } from "../ui/Icons";
import ScrollPage from "../ui/ScrollPage";
import { useReveal } from "../ui/useReveal";

const icons: Record<StoryIcon, JSX.Element> = {
  heart: <Heart className="h-6 w-6 fill-gold text-gold" aria-hidden />,
  coffee: <Coffee className="h-6 w-6 text-gold" strokeWidth={2.2} aria-hidden />,
  ring: <RingIcon className="h-6 w-6 text-gold" />,
};

/** The couple's photo opens with a curtain wipe while it settles from a zoom; its wrapper is what scroll triggers. */
function StoryPhoto({ photo }: { photo: InvitationConfig["story"]["photo"] }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className="relative mx-auto mt-8 max-w-[360px] overflow-hidden rounded-[22px] shadow-card">
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: inView ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
      >
        <motion.img
          src={photoUrl(photo, 800)}
          alt={photo.alt}
          width={519}
          height={762}
          loading="lazy"
          decoding="async"
          className="block w-full"
          initial={{ scale: 1.35 }}
          animate={{ scale: inView ? 1 : 1.35 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}

/**
 * Our Story: a three-step timeline whose spine draws down the page while each step slides in from
 * alternating sides, then the couple's photo opens beneath it.
 */
export default function Story({ story }: { story: InvitationConfig["story"] }) {
  const view = { once: true, amount: 0.4 } as const;

  return (
    <ScrollPage id="our-story" tone="warm" className="px-5 pb-12 pt-10" motionOn={false}>
      <PageTitle subtitle={story.subtitle}>{story.heading}</PageTitle>

      <ol className="relative mx-auto mt-9 max-w-[350px]">
        {/* the spine behind the icons, drawn top to bottom */}
        <motion.span
          aria-hidden
          className="absolute bottom-10 left-[26px] top-8 w-px origin-top bg-gradient-to-b from-gold-light via-gold-soft to-gold-light"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={view}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
        {story.items.map((item, i) => (
          <motion.li
            key={item.title}
            className="relative flex gap-4 pb-8 last:pb-0"
            initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={view}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <span className="relative z-10 grid h-[54px] w-[54px] shrink-0 place-items-center rounded-full border border-gold-soft bg-paper-pale shadow-soft">
              <motion.span initial={{ scale: 0, rotate: -40 }} whileInView={{ scale: 1, rotate: 0 }} viewport={view} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.35 }}>
                {icons[item.icon]}
              </motion.span>
            </span>
            <div className="pt-0.5">
              <h3 className="font-serif text-[20px] font-medium leading-tight text-ink">{item.title}</h3>
              <p className="mt-1 font-serif text-[16px] leading-[1.5] text-ink-soft">{item.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>

      <StoryPhoto photo={story.photo} />
    </ScrollPage>
  );
}
