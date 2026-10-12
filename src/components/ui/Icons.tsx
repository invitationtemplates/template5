/** Inline SVG icons for things lucide lacks (ring, brands) and the AR monogram. stroke/fill = currentColor. */
type P = { className?: string };

export const RingIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="19.500" r="8" />
    <path d="M12 7.500 L14 4.500 H18 L20 7.500 L16 11.500 Z" fill="currentColor" stroke="none" />
  </svg>
);

export const InstagramIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.500" y="3.500" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.200" cy="6.800" r="0.800" fill="currentColor" />
  </svg>
);

export const FacebookIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M13.500 21v-7.600h2.600l.4-3h-3V8.500c0-.9.3-1.500 1.600-1.500h1.600V4.300c-.3 0-1.200-.1-2.300-.1-2.300 0-3.900 1.400-3.900 4v2.200H8V13.400h2.600V21h2.900Z" />
  </svg>
);

export const WhatsAppIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2Zm0 18.200a8.200 8.200 0 0 1-4.200-1.200l-.3-.2-3 .8.8-2.900-.2-.3A8.200 8.200 0 1 1 12 20.200Zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8s-.4-.1-.6.1-.7.800-.8 1-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.3-.4.3-.4.700-1.400.1-.2 0-.3 0-.4l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.200 5.200 5.200 0 0 0 1.100 2.700 11.800 11.800 0 0 0 4.500 4c1.700.7 2.300.8 3.200.6a2.700 2.700 0 0 0 1.800-1.300 2.200 2.200 0 0 0 .2-1.300c-.1-.1-.3-.2-.5-.3Z" />
  </svg>
);

/**
 * The "A R" monogram: script initials with a small sprig above, as at the top-left of every screen.
 * Pass the couple's initials; the letters are real text, so any pair works.
 */
export function Monogram({ a, b, className = "h-9 w-12" }: { a: string; b: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 48" className={className} role="img" aria-label={`Monogram ${a} ${b}`}>
      <path d="M31 4 C29 7 29 9 31 11 C33 9 33 7 31 4Z M26 8 C24 9 23 11 24 13 C26 12 27 10 26 8Z M36 8 C38 9 39 11 38 13 C36 12 35 10 36 8Z" fill="#A8782F" />
      <text x="4" y="40" fontFamily="Allura, cursive" fontSize="36" fill="#A8782F">
        {a}
      </text>
      <text x="26" y="42" fontFamily="Allura, cursive" fontSize="34" fill="#7A4A14">
        {b}
      </text>
    </svg>
  );
}
