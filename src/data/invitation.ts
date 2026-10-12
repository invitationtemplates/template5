import type { InvitationConfig } from "../types";
import hero from "../assets/photos/hero.webp";
import heroFlowers from "../assets/photos/hero-flowers.webp";
import story from "../assets/photos/story.webp";
import galMain from "../assets/photos/gal-main.webp";
import galA from "../assets/photos/gal-a.webp";
import galB from "../assets/photos/gal-b.webp";
import galC from "../assets/photos/gal-c.webp";
import galD from "../assets/photos/gal-d.webp";
import galE from "../assets/photos/gal-e.webp";
import g1 from "../assets/photos/g1.webp";
import g2 from "../assets/photos/g2.webp";
import g3 from "../assets/photos/g3.webp";
import g4 from "../assets/photos/g4.webp";
import g5 from "../assets/photos/g5.webp";
import g6 from "../assets/photos/g6.webp";
import g7 from "../assets/photos/g7.webp";
import g8 from "../assets/photos/g8.webp";
import g9 from "../assets/photos/g9.webp";
import g10 from "../assets/photos/g10.webp";
import venue from "../assets/photos/venue.webp";
import map from "../assets/photos/map.webp";
import palace from "../assets/photos/palace-faint.webp";

/**
 * ============================================================================
 *  EDIT THIS FILE to reuse the design for another couple.
 *  Everything below is SAMPLE CONTENT taken from the reference mock-up: the
 *  names, date, venue, phone and e-mail are placeholders, not real details.
 *  All photographs are low-resolution crops of the reference sheet. Replace
 *  them in src/assets/photos (same file names) or give a photo a
 *  `cloudinaryId` and set VITE_CLOUDINARY_CLOUD in .env.
 * ============================================================================
 */
export const invitation: InvitationConfig = {
  couple: { first: "Abhishek", second: "Radhika", hashtag: "#AbhishekAndRadhika" },

  // SAMPLE DATE. The weekday is calculated from the date, so it can never disagree with it.
  event: {
    start: "2027-04-20T19:00:00+05:00",
    end: "2027-04-20T23:00:00+05:00",
    timezone: "Asia/Karachi",
  },

  hero: {
    badge: "Wedding Invitation",
    invite: ["Joyfully invite you to", "celebrate their wedding"],
    photo: { src: hero, alt: "Lord Ganesha seated on a golden throne before a grand palace at golden hour, framed by flowers" },
    flowers: { src: heroFlowers, alt: "" },
  },

  saveTheDate: {
    heading: "Save the Date",
    subtitle: "Our special day is just around the corner",
    quote: ["Two souls,", "one journey,", "forever to go."],
  },

  story: {
    heading: "Our Story",
    subtitle: "Two hearts, one journey, forever to go.",
    items: [
      { icon: "heart", title: "First Meeting", text: "We met at a mutual friend's wedding and instantly felt a connection." },
      { icon: "coffee", title: "First Date", text: "Our first date was a simple coffee date that turned into hours of laughter." },
      { icon: "ring", title: "The Proposal", text: "He proposed in the most beautiful way, surrounded by the people we love." },
    ],
    photo: { src: story, alt: "The couple standing close together in a rose garden at golden hour" },
  },

  schedule: {
    heading: "Wedding Day Schedule",
    subtitle: "Let's make beautiful memories together",
    items: [
      { icon: "arrival", time: "03:00 PM", title: "Guest Arrival", note: "Welcome & refreshments" },
      { icon: "ceremony", time: "04:00 PM", title: "Wedding Ceremony", note: "Vows & blessings" },
      { icon: "photos", time: "05:30 PM", title: "Photography", note: "Family & couple photos" },
      { icon: "reception", time: "07:00 PM", title: "Reception", note: "Grand entry & celebration" },
      { icon: "dinner", time: "08:00 PM", title: "Dinner", note: "Enjoy the feast" },
      { icon: "dance", time: "10:00 PM", title: "Dance & Celebration", note: "Let's make memories" },
    ],
  },

  gallery: {
    heading: "Our Gallery",
    subtitle: "Moments we'll cherish forever",
    viewMore: "View More Photos",
    preview: [
      { src: galMain, alt: "Lord Ganesha on a throne in a candle-lit golden hall" },
      { src: galA, alt: "A garden with pink flowers and trees" },
      { src: galB, alt: "The couple standing in a flower-lined garden" },
      { src: galC, alt: "The couple's hands clasped together" },
      { src: galD, alt: "A grand palace with arched courtyards and flowers" },
      { src: galE, alt: "A golden Ganesha statue among flowers" },
    ],
    all: [
      { src: g1, alt: "The couple in formal wedding attire, close together" },
      { src: g2, alt: "The couple in green and cream outfits" },
      { src: g3, alt: "A bouquet of yellow and pink flowers" },
      { src: g4, alt: "A large arrangement of pink and white flowers" },
      { src: g5, alt: "A vase of red and pink roses" },
      { src: g6, alt: "The couple smiling at each other in a garden" },
      { src: g7, alt: "The palace seen across a flower garden" },
      { src: g8, alt: "A golden Ganesha statue on a throne" },
      { src: g9, alt: "The palace gardens with pink blossoms" },
      { src: g10, alt: "A candle-lit table with a floral centrepiece" },
    ],
  },

  rsvp: {
    heading: "RSVP",
    subtitle: "Please let us know if you can attend",
    // Digits only, with country code. Used to send RSVP replies through WhatsApp when no endpoint is set.
    // SAMPLE: replace with the family's real number.
    whatsappNumber: "923001234567",
  },

  venue: {
    heading: "Venue & Location",
    name: "Royal Palace",
    address: "Canal Road, Lahore",
    mapsQuery: "Royal Palace, Canal Road, Lahore",
    photo: { src: venue, alt: "The Royal Palace, a grand sandstone building with arched windows and landscaped gardens" },
    map: { src: map, alt: "Map showing the Royal Palace on Canal Road, Lahore" },
    contactIntro: "For any further details, please contact us",
    phone: "+923001234567",
    phoneDisplay: "+92 300 1234567",
    email: "abhishekandradhika@gmail.com",
  },

  thanks: {
    line: "Thank you for being part of our special day",
    watermark: { src: palace, alt: "" },
    copyright: "All Rights Reserved.",
  },

  social: { instagram: "https://instagram.com/", facebook: "https://facebook.com/", whatsapp: "https://wa.me/923001234567" },

  cover: { invited: "You are invited", tap: "Tap to open", dear: "Dear" },

  // Leave empty to hide the music button. Example: "/audio/wedding.mp3" (file placed in /public/audio).
  musicSrc: "",
  musicOnOpen: true,

  nav: [
    { label: "Home", href: "#home" },
    { label: "Save the Date", href: "#save-the-date" },
    { label: "Our Story", href: "#our-story" },
    { label: "Schedule", href: "#schedule" },
    { label: "Gallery", href: "#gallery" },
    { label: "RSVP", href: "#rsvp" },
    { label: "Venue", href: "#venue" },
  ],
};
