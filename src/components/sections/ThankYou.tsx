import { motion } from "motion/react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { Divider, Floral } from "../ui/Decor";
import { Petals, Sparkles } from "../ui/Effects";
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "../ui/Icons";
import ScrollPage from "../ui/ScrollPage";
import { useReveal } from "../ui/useReveal";

/** One name, written in left to right as if by hand; an unclipped wrapper is what scroll triggers. */
function Handwritten({ children, delay }: { children: string; delay: number }) {
  const { ref, inView } = useReveal<HTMLSpanElement>(0.6);
  return (
    <span ref={ref} className="block">
      <motion.span
        className="script-ink inline-block"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: inView ? "inset(-20% -10% -20% -10%)" : "inset(0 100% 0 0)" }}
        transition={{ duration: 1.5, ease: "easeInOut", delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Thank-you page: florals frame the top corners, the couple's names are written in, then the thanks, a
 * fleuron, the hashtag and the social icons appear in turn; a faint palace and more flowers close the page.
 */
export default function ThankYou({ config, parts }: { config: InvitationConfig; parts: EventParts }) {
  const { couple, thanks, social } = config;
  const view = { once: true, amount: 0.4 } as const;
  const fade = (delay: number) => ({ initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: view, transition: { duration: 0.8, delay } });
  const icons = [
    { href: social.instagram, label: "Instagram", icon: <InstagramIcon className="h-5 w-5" /> },
    { href: social.facebook, label: "Facebook", icon: <FacebookIcon className="h-5 w-5" /> },
    { href: social.whatsapp, label: "WhatsApp", icon: <WhatsAppIcon className="h-5 w-5" /> },
  ];

  return (
    <ScrollPage
      id="thank-you"
      tone="plain"
      className="px-6 pb-10 pt-8"
      motionOn={false}
      decor={
        <>
          <Petals />
          <Sparkles count={10} />
          {/* faint palace watermark */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] opacity-70" aria-hidden style={{ WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 40%, #000 80%, transparent)", maskImage: "linear-gradient(to bottom, transparent, #000 40%, #000 80%, transparent)" }}>
            <img src={photoUrl(thanks.watermark, 900)} alt="" width={804} height={360} loading="lazy" decoding="async" className="h-full w-full object-cover object-bottom" />
          </div>
          <Floral kind="tl" width="38%" />
          <Floral kind="tr" width="42%" />
          <Floral kind="bl" width="23%" />
          <Floral kind="br" width="30%" />
          <p className="absolute inset-x-0 bottom-5 text-center font-serif text-[14px] leading-snug text-ink-soft">
            © {parts.year} {couple.first} &amp; {couple.second}.
            <br />
            {thanks.copyright}
          </p>
        </>
      }
    >
      <div className="relative mx-auto mt-6 max-w-[340px] text-center">
        <h2 className="font-script text-[clamp(54px,16.5vw,70px)] leading-[1.12]" aria-label={`${couple.first} and ${couple.second}`}>
          <span aria-hidden>
            <Handwritten delay={0.2}>{`${couple.first} &`}</Handwritten>
            <Handwritten delay={1.1}>{couple.second}</Handwritten>
          </span>
        </h2>

        <motion.p {...fade(0.4)} className="mx-auto mt-6 max-w-[280px] font-serif text-[clamp(19px,5.6vw,23px)] leading-[1.45] text-ink">
          {thanks.line}
        </motion.p>

        <Divider className="mt-5" />

        <motion.p {...fade(0.2)} className="mt-5 font-serif text-[17px] text-ink">
          {couple.hashtag}
        </motion.p>

        <div className="mt-5 flex items-center justify-center gap-4">
          {icons.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              initial={{ opacity: 0, scale: 0, rotate: -90 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={view}
              transition={{ type: "spring", stiffness: 220, damping: 12, delay: 0.3 + i * 0.12 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.92 }}
              className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-b from-[#B98A3E] to-[#98692A] text-[#FFF8E8] shadow-soft"
            >
              {s.icon}
            </motion.a>
          ))}
        </div>
      </div>

    </ScrollPage>
  );
}
