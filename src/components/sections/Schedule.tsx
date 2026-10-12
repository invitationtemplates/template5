import { motion } from "motion/react";
import { Camera, Coffee, Music, Users, Utensils, HeartHandshake } from "lucide-react";
import type { InvitationConfig, ScheduleIcon } from "../../types";
import { Floral, PageTitle } from "../ui/Decor";
import ScrollPage from "../ui/ScrollPage";

const icons: Record<ScheduleIcon, JSX.Element> = {
  arrival: <Users className="h-6 w-6" strokeWidth={2} aria-hidden />,
  ceremony: <HeartHandshake className="h-6 w-6" strokeWidth={2} aria-hidden />,
  photos: <Camera className="h-6 w-6" strokeWidth={2} aria-hidden />,
  reception: <Utensils className="h-6 w-6" strokeWidth={2} aria-hidden />,
  dinner: <Coffee className="h-6 w-6" strokeWidth={2} aria-hidden />,
  dance: <Music className="h-6 w-6" strokeWidth={2} aria-hidden />,
};

/**
 * Wedding Day Schedule: a gold spine draws down the page and the six icons pop onto it one after another,
 * each releasing a soft ripple as it lands; the time and details then slide in beside it.
 */
export default function Schedule({ schedule }: { schedule: InvitationConfig["schedule"] }) {
  const view = { once: true, amount: 0.3 } as const;

  return (
    <ScrollPage id="schedule" tone="plain" className="px-5 pb-40 pt-10" motionOn={false} decor={<Floral kind="strip" width="100%" />}>
      <PageTitle subtitle={schedule.subtitle}>{schedule.heading}</PageTitle>

      <ol className="relative mx-auto mt-9 max-w-[350px]">
        <motion.span
          aria-hidden
          className="absolute bottom-10 left-[26px] top-8 w-px origin-top bg-gradient-to-b from-gold-light via-gold-soft to-gold-light"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={view}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
        {schedule.items.map((item, i) => (
          <li key={item.time} className={`relative flex gap-4 py-4 ${i > 0 ? "border-t border-gold-soft/40" : ""}`}>
            <span className="relative z-10 block h-[54px] w-[54px] shrink-0">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border-2 border-gold"
                initial={{ scale: 1, opacity: 0 }}
                whileInView={{ scale: 1.9, opacity: [0, 0.7, 0] }}
                viewport={view}
                transition={{ duration: 1, delay: 0.25 + i * 0.12 }}
              />
              <motion.span
                className="relative grid h-[54px] w-[54px] place-items-center rounded-full border border-gold-soft bg-paper-pale text-gold-deep shadow-soft"
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={view}
                transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.15 + i * 0.12 }}
              >
                {icons[item.icon]}
              </motion.span>
            </span>
            <motion.div
              className="pt-0.5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={view}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 + i * 0.12 }}
            >
              <p className="font-serif text-[20px] leading-tight text-ink">{item.time}</p>
              <p className="mt-0.5 font-serif text-[20px] font-medium leading-tight text-ink">{item.title}</p>
              <p className="font-serif text-[15px] text-ink-soft">{item.note}</p>
            </motion.div>
          </li>
        ))}
      </ol>

    </ScrollPage>
  );
}
