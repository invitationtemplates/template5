import { useEffect, useRef, useState } from "react";
import { Music2, Pause } from "lucide-react";

/**
 * Floating play / pause control. Music never starts by itself (browsers block it and some families
 * prefer none): the guest must press the button. Renders nothing when no music file is configured.
 */
export default function MusicPlayer({ src, autoStart = false }: { src: string; autoStart?: boolean }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  // Pause while the tab is hidden, resume when it returns.
  useEffect(() => {
    let wasPlaying = false;
    const onVisibility = () => {
      const a = audio.current;
      if (!a) return;
      if (document.hidden) {
        wasPlaying = !a.paused;
        a.pause();
      } else if (wasPlaying) {
        a.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Start once when told to (the cover tap): this runs inside the guest's tap, so browsers allow it.
  const started = useRef(false);
  useEffect(() => {
    if (!autoStart || started.current || !src) return;
    started.current = true;
    audio.current?.play().catch(() => setFailed(true));
  }, [autoStart, src]);

  if (!src) return null;

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setFailed(true));
    else a.pause();
  };

  return (
    <>
      <audio ref={audio} src={src} loop preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause background music" : "Play background music"}
        title={failed ? "Music file could not be loaded" : playing ? "Pause music" : "Play music"}
        className="fixed bottom-4 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-gold bg-cream/95 text-gold shadow-card transition-transform active:scale-95"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
      </button>
    </>
  );
}
