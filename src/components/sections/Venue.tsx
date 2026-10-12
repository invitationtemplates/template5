import { motion } from "motion/react";
import { CalendarDays, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { InvitationConfig } from "../../types";
import type { EventParts } from "../../lib/dates";
import { photoUrl } from "../../lib/image";
import { Floral, PageTitle } from "../ui/Decor";
import ScrollPage from "../ui/ScrollPage";

const view = { once: true, amount: 0.3 } as const;

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: view,
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
});

/**
 * Venue & Location: the venue photograph settles from a zoom, the details rise in turn, the button
 * glints, and the map card carries a pin whose ripple pulses once it has appeared.
 */
export default function Venue({ venue, parts }: { venue: InvitationConfig["venue"]; parts: EventParts }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapsQuery)}`;

  return (
    <ScrollPage
      id="venue"
      tone="plain"
      className="px-5 pb-40 pt-10"
      motionOn={false}
      decor={
        <>
          <Floral kind="bl" width="17%" />
          <Floral kind="br" width="22%" />
        </>
      }
    >
      <PageTitle sparkles>{venue.heading}</PageTitle>

      <div className="mx-auto mt-6 max-w-[370px]">
        <motion.div {...rise()} className="overflow-hidden rounded-2xl shadow-card">
          <motion.img
            src={photoUrl(venue.photo, 900)}
            alt={venue.photo.alt}
            width={708}
            height={378}
            loading="lazy"
            decoding="async"
            className="block aspect-[708/378] w-full object-cover"
            initial={{ scale: 1.3 }}
            whileInView={{ scale: 1 }}
            viewport={view}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        <motion.div {...rise(0.1)} className="mt-5">
          <h3 className="font-serif text-[27px] font-semibold leading-tight text-ink">{venue.name}</h3>
          <p className="font-serif text-[17px] text-ink-soft">{venue.address}</p>
        </motion.div>

        <motion.ul {...rise(0.15)} className="mt-4 space-y-3 font-serif text-[17px] text-ink">
          <li className="flex items-center gap-4">
            <CalendarDays className="h-7 w-7 text-gold" strokeWidth={1.8} aria-hidden />
            {parts.day} {parts.monthLong} {parts.year} ({parts.weekday})
          </li>
          <li className="flex items-center gap-4">
            <Clock className="h-7 w-7 text-gold" strokeWidth={1.8} aria-hidden />
            {parts.startTime} - {parts.endTime}
          </li>
        </motion.ul>

        <motion.a {...rise(0.2)} whileTap={{ scale: 0.98 }} href={mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-gold mt-5 w-full">
          <MapPin className="h-5 w-5 fill-[#FFF8E8]" aria-hidden /> Open in Google Maps
        </motion.a>

        {/* Map card */}
        <motion.a
          {...rise(0.1)}
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the venue map in Google Maps"
          className="relative mt-5 block overflow-hidden rounded-2xl shadow-card"
        >
          <img src={photoUrl(venue.map, 900)} alt={venue.map.alt} width={708} height={378} loading="lazy" decoding="async" className="block aspect-[708/378] w-full object-cover" />
          <span aria-hidden className="pointer-events-none absolute left-1/2 top-[29%] -ml-5 -mt-2 h-4 w-10 animate-ripple rounded-full border-2 border-[#D9442B]/70 motion-reduce:hidden" />
          <span aria-hidden className="pointer-events-none absolute left-1/2 top-[29%] -ml-5 -mt-2 h-4 w-10 animate-ripple rounded-full border-2 border-[#D9442B]/70 [animation-delay:1.2s] motion-reduce:hidden" />
        </motion.a>

        {/* Contact */}
        <motion.div {...rise(0.1)} className="mt-5 rounded-2xl bg-paper-warm/60 px-5 py-4">
          <p className="font-serif text-[16px] leading-snug text-ink">{venue.contactIntro}</p>
          <a href={`tel:${venue.phone}`} className="mt-3 flex items-center gap-4 font-serif text-[17px] text-ink">
            <Phone className="h-6 w-6 fill-gold text-gold" aria-hidden /> {venue.phoneDisplay}
          </a>
          <a href={`mailto:${venue.email}`} className="mt-2.5 flex items-center gap-4 break-all font-serif text-[17px] text-ink">
            <Mail className="h-6 w-6 text-gold" aria-hidden /> {venue.email}
          </a>
        </motion.div>
      </div>

    </ScrollPage>
  );
}
