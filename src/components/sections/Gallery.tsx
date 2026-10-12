import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ImageIcon } from "lucide-react";
import type { InvitationConfig, Photo } from "../../types";
import { photoUrl } from "../../lib/image";
import { Floral, PageTitle } from "../ui/Decor";
import Lightbox from "../ui/Lightbox";
import ScrollPage from "../ui/ScrollPage";
import { useReveal } from "../ui/useReveal";

// Each tile opens from a different edge, in turn.
const WIPES = ["inset(0 100% 0 0)", "inset(0 0 0 100%)", "inset(100% 0 0 0)", "inset(0 0 100% 0)"];

/**
 * One gallery tile: opens from its own edge while the picture settles from a zoom. An unclipped wrapper is
 * observed (a fully clipped element has no visible area, so it could never report that it scrolled into view).
 */
function Tile({ photo, index, ratio, onOpen, className = "" }: { photo: Photo; index: number; ratio: string; onOpen: () => void; className?: string }) {
  const { ref, inView } = useReveal<HTMLDivElement>(0.25);
  const hide = WIPES[index % 4];
  const delay = 0.1 * (index % 6);
  return (
    <div ref={ref} className={className} style={{ aspectRatio: ratio }}>
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open photo: ${photo.alt}`}
        className="group relative block h-full w-full overflow-hidden rounded-2xl shadow-soft"
        initial={{ clipPath: hide }}
        animate={{ clipPath: inView ? "inset(0 0% 0 0)" : hide }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay }}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.img
          src={photoUrl(photo, 700)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          initial={{ scale: 1.4 }}
          animate={{ scale: inView ? 1 : 1.4 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay }}
        />
      </motion.button>
    </div>
  );
}

/** Tracks which photo the viewer shows (and in which list) and returns focus to whatever opened it. */
function useViewer() {
  const [view, setView] = useState<{ list: "preview" | "all"; index: number } | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  return {
    view,
    setIndex: (index: number) => setView((v) => (v ? { ...v, index } : v)),
    show: (list: "preview" | "all", index: number) => {
      opener.current = document.activeElement as HTMLElement | null;
      setView({ list, index });
    },
    close: () => {
      setView(null);
      opener.current?.focus();
    },
  };
}

/**
 * The invitation's one gallery: a wide feature photo and two columns of tiles. "View More Photos" opens the
 * full-screen viewer over every photo (gallery.all), so there is no second gallery page.
 */
export default function Gallery({ gallery }: { gallery: InvitationConfig["gallery"] }) {
  const v = useViewer();
  const p = gallery.preview;
  const all = gallery.all.length ? gallery.all : p;
  if (p.length < 6) return null;
  const [main, a, b, c, d, e] = p;

  return (
    <ScrollPage
      id="gallery"
      tone="warm"
      className="px-4 pb-32 pt-10"
      motionOn={false}
      decor={
        <>
          <Floral kind="tr" width="20%" />
          <Floral kind="bl" width="15%" />
          <Floral kind="br" width="20%" />
        </>
      }
    >
      <PageTitle subtitle={gallery.subtitle}>{gallery.heading}</PageTitle>

      <div className="mx-auto mt-6 max-w-[370px]">
        <Tile photo={main} index={0} ratio="519 / 399" onOpen={() => v.show("preview", 0)} />
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="space-y-3">
            <Tile photo={a} index={1} ratio="340 / 332" onOpen={() => v.show("preview", 1)} />
            <Tile photo={c} index={3} ratio="340 / 364" onOpen={() => v.show("preview", 3)} />
            <Tile photo={e} index={5} ratio="255 / 321" onOpen={() => v.show("preview", 5)} />
          </div>
          <div className="space-y-3">
            <Tile photo={b} index={2} ratio="336 / 400" onOpen={() => v.show("preview", 2)} />
            <Tile photo={d} index={4} ratio="252 / 549" onOpen={() => v.show("preview", 4)} />
          </div>
        </div>

        <div className="mt-7 text-center">
          <button type="button" className="btn-outline" onClick={() => v.show("all", 0)}>
            <ImageIcon className="h-5 w-5 text-gold" aria-hidden /> {gallery.viewMore}
          </button>
        </div>
      </div>

      <Lightbox photos={v.view?.list === "all" ? all : p} index={v.view ? v.view.index : null} onClose={v.close} onChange={v.setIndex} />
    </ScrollPage>
  );
}
