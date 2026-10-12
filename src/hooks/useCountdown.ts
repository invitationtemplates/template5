import { useEffect, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

const calc = (target: number): Countdown => {
  const ms = target - Date.now();
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  return {
    days: Math.floor(ms / 864e5),
    hours: Math.floor(ms / 36e5) % 24,
    minutes: Math.floor(ms / 6e4) % 60,
    seconds: Math.floor(ms / 1e3) % 60,
    done: false,
  };
};

/** Live countdown, ticking once per second and paused while the tab is hidden. */
export function useCountdown(targetIso: string): Countdown {
  const target = new Date(targetIso).getTime();
  const [value, setValue] = useState<Countdown>(() => calc(target));

  useEffect(() => {
    let id: number | undefined;
    const start = () => {
      setValue(calc(target));
      id = window.setInterval(() => setValue(calc(target)), 1000);
    };
    const stop = () => window.clearInterval(id);
    const onVisibility = () => (document.hidden ? stop() : (stop(), start()));

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [target]);

  return value;
}
