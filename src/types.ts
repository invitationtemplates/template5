/** A photograph. `src` is a local asset; `cloudinaryId` (optional) is used instead when Cloudinary is configured. */
export interface Photo {
  src: string;
  alt: string;
  cloudinaryId?: string;
}

export type StoryIcon = "heart" | "coffee" | "ring";
export type ScheduleIcon = "arrival" | "ceremony" | "photos" | "reception" | "dinner" | "dance";

export interface InvitationConfig {
  couple: { first: string; second: string; hashtag: string };
  /** ISO date-time with timezone offset. Weekday, date, time range and the countdown are derived from it. */
  event: { start: string; end: string; timezone: string };
  hero: { badge: string; invite: string[]; photo: Photo; flowers: Photo };
  saveTheDate: { heading: string; subtitle: string; quote: string[] };
  story: { heading: string; subtitle: string; items: { icon: StoryIcon; title: string; text: string }[]; photo: Photo };
  schedule: { heading: string; subtitle: string; items: { icon: ScheduleIcon; time: string; title: string; note: string }[] };
  /** `preview` are the tiles shown on the page; `all` is every photo, opened by the "View More Photos" button. */
  gallery: { heading: string; subtitle: string; viewMore: string; preview: Photo[]; all: Photo[] };
  rsvp: { heading: string; subtitle: string; whatsappNumber: string };
  venue: {
    heading: string;
    name: string;
    address: string;
    mapsQuery: string;
    photo: Photo;
    map: Photo;
    contactIntro: string;
    phone: string;
    phoneDisplay: string;
    email: string;
  };
  thanks: { line: string; watermark: Photo; copyright: string };
  social: { instagram: string; facebook: string; whatsapp: string };
  cover: { invited: string; tap: string; dear: string };
  /** Background music file in /public (leave empty to hide the music button). */
  musicSrc: string;
  /** Start the music when the guest taps the cover (the tap counts as the permission browsers require). */
  musicOnOpen: boolean;
  nav: { label: string; href: string }[];
}
