/** Date helpers. Every label is derived from the single ISO date in the config, in the event's own timezone. */

export interface EventParts {
  weekday: string; // Sunday
  day: string; // 18
  monthLong: string; // April
  monthShort: string; // Apr
  year: string; // 2027
  startTime: string; // 06:00 PM
  startTimeShort: string; // 6:00 PM
  endTime: string; // 11:00 PM
}

const fmt = (date: Date, tz: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: tz, ...opts }).format(date);

export function eventParts(startIso: string, endIso: string, timezone: string): EventParts {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const time = (d: Date) => fmt(d, timezone, { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase();
  return {
    weekday: fmt(start, timezone, { weekday: "long" }),
    day: fmt(start, timezone, { day: "numeric" }),
    monthLong: fmt(start, timezone, { month: "long" }),
    monthShort: fmt(start, timezone, { month: "short" }),
    year: fmt(start, timezone, { year: "numeric" }),
    startTime: time(start),
    startTimeShort: time(start).replace(/^0/, ""),
    endTime: time(end),
  };
}
