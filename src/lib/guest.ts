/**
 * Personalised links: https://your-site/?guest=Aunt%20Sara shows "Dear Aunt Sara" on the cover.
 * React escapes the value, and it is length-limited, so a crafted link cannot inject markup.
 */
export function readGuest(): string {
  try {
    const raw = new URLSearchParams(window.location.search).get("guest") ?? "";
    return raw.replace(/[<>]/g, "").trim().slice(0, 40);
  } catch {
    return "";
  }
}
