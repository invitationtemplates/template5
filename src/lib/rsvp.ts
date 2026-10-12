export interface RsvpPayload {
  name: string;
  phone: string;
  email: string;
  attending: boolean;
  guests: number;
  dietary: string;
  message: string;
  submittedAt: string;
}

/** What actually happened, so the UI never claims a reply was saved when it was not. */
export type RsvpResult = { channel: "endpoint" } | { channel: "whatsapp" } | { channel: "none" };

/**
 * INTEGRATION POINT for RSVP replies.
 *
 * 1. If VITE_RSVP_ENDPOINT is set, the reply is POSTed there as JSON (Google Apps Script web app,
 *    a Supabase edge function, your own API...). It throws on failure.
 * 2. Otherwise, if a WhatsApp number is configured, a pre-filled WhatsApp message to the family opens.
 * 3. Otherwise nothing is sent, and the UI says so.
 */
export async function submitRsvp(payload: RsvpPayload, whatsappNumber: string): Promise<RsvpResult> {
  const endpoint = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined;

  if (endpoint) {
    // text/plain avoids a CORS preflight, which Google Apps Script cannot answer.
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`RSVP endpoint responded ${res.status}`);
    return { channel: "endpoint" };
  }

  if (whatsappNumber) {
    const lines = [
      "RSVP",
      `Name: ${payload.name}`,
      payload.phone ? `Phone: ${payload.phone}` : null,
      payload.email ? `Email: ${payload.email}` : null,
      `Attending: ${payload.attending ? "Yes" : "No"}`,
      payload.attending ? `Guests: ${payload.guests}` : null,
      payload.dietary ? `Dietary: ${payload.dietary}` : null,
      payload.message ? `Message: ${payload.message}` : null,
    ].filter(Boolean);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
    return { channel: "whatsapp" };
  }

  return { channel: "none" };
}
