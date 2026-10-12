import { useId, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Send } from "lucide-react";
import type { InvitationConfig } from "../../types";
import { submitRsvp, type RsvpResult } from "../../lib/rsvp";
import { Floral, PageTitle } from "../ui/Decor";
import ScrollPage from "../ui/ScrollPage";

type Status = "idle" | "sending" | "done" | "error";

const initial = { name: "", phone: "", email: "", guests: "", attending: "" as "" | "yes" | "no", dietary: "", message: "" };

const doneText: Record<RsvpResult["channel"], string> = {
  endpoint: "Your reply has been received. We look forward to celebrating with you.",
  whatsapp: "WhatsApp has opened with your reply ready to send. Please press send there to confirm.",
  none: "RSVP is not connected to a service yet, so this reply was not sent. Please contact the family directly.",
};

const errorText = "mt-1 pl-1 text-[14px] text-[#a3324f]";
const labelCls = "mb-1.5 block font-serif text-[17px] text-ink";

/** A labelled field that slides up when it enters, staggered by its position in the form. */
function Row({ index, children }: { index: number; children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.05 * (index % 3) }}>
      {children}
    </motion.div>
  );
}

const Star = () => (
  <span className="text-[#C0392B]" aria-hidden>
    {" "}
    *
  </span>
);

/** RSVP form (name, phone, email, guests, attendance, dietary, message); replies go through lib/rsvp.ts. */
export default function Rsvp({ rsvp }: { rsvp: InvitationConfig["rsvp"] }) {
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<{ name?: string; phone?: string; guests?: string; attending?: string; email?: string }>({});
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<RsvpResult | null>(null);

  const set = (k: keyof typeof initial, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) e.phone = "Please enter a valid phone number";
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = "Please enter a valid email address";
    if (!form.guests) e.guests = "Please select the number of guests";
    if (!form.attending) e.attending = "Please choose one option";
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("sending");
    try {
      const res = await submitRsvp(
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          attending: form.attending === "yes",
          guests: form.attending === "yes" ? Number(form.guests) : 0,
          dietary: form.dietary.trim(),
          message: form.message.trim(),
          submittedAt: new Date().toISOString(),
        },
        rsvp.whatsappNumber,
      );
      setResult(res);
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <ScrollPage id="rsvp" tone="warm" className="px-5 pb-36 pt-10" motionOn={false} decor={<Floral kind="stripRsvp" width="100%" />}>
      <PageTitle sparkles subtitle={rsvp.subtitle}>
        {rsvp.heading}
      </PageTitle>

      <div className="mx-auto mt-7 max-w-[360px]">
        <AnimatePresence mode="wait">
          {status === "done" && result ? (
            <motion.div key="done" role="status" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="rounded-3xl border border-gold-soft bg-paper-pale/80 px-6 py-10 text-center shadow-card">
              <p className="font-script text-[48px] leading-none text-cocoa">Thank you!</p>
              <p className="mt-3 font-serif text-[17px] leading-relaxed text-ink">{doneText[result.channel]}</p>
              <button
                type="button"
                className="btn-outline mt-5"
                onClick={() => {
                  setForm(initial);
                  setStatus("idle");
                }}
              >
                Send another reply
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="space-y-5">
              <Row index={0}>
                <label htmlFor={id("name")} className={labelCls}>
                  Your Name
                  <Star />
                </label>
                <input id={id("name")} className="field" placeholder="Enter your name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-e") : undefined} />
                {errors.name && <p id={id("name-e")} className={errorText}>{errors.name}</p>}
              </Row>

              <Row index={1}>
                <label htmlFor={id("phone")} className={labelCls}>
                  Phone Number
                  <Star />
                </label>
                <input id={id("phone")} type="tel" inputMode="tel" className="field" placeholder="Enter your phone number" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? id("phone-e") : undefined} />
                {errors.phone && <p id={id("phone-e")} className={errorText}>{errors.phone}</p>}
              </Row>

              <Row index={2}>
                <label htmlFor={id("email")} className={labelCls}>
                  Email Address
                </label>
                <input id={id("email")} type="email" inputMode="email" className="field" placeholder="Enter your email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? id("email-e") : undefined} />
                {errors.email && <p id={id("email-e")} className={errorText}>{errors.email}</p>}
              </Row>

              <Row index={0}>
                <label htmlFor={id("guests")} className={labelCls}>
                  Number of Guests
                  <Star />
                </label>
                <div className="relative">
                  <select id={id("guests")} className="field appearance-none pr-10" value={form.guests} onChange={(e) => set("guests", e.target.value)} aria-invalid={!!errors.guests} aria-describedby={errors.guests ? id("guests-e") : undefined}>
                    <option value="">Select number of guests</option>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" aria-hidden />
                </div>
                {errors.guests && <p id={id("guests-e")} className={errorText}>{errors.guests}</p>}
              </Row>

              <Row index={1}>
                <fieldset>
                  <legend className={labelCls}>
                    Attendance
                    <Star />
                  </legend>
                  <div className="space-y-3 pl-1">
                    {(
                      [
                        ["yes", "Accepts with pleasure"],
                        ["no", "Declines with regret"],
                      ] as const
                    ).map(([v, text]) => (
                      <label key={v} className="flex cursor-pointer items-center gap-3 font-serif text-[16px] text-ink">
                        <input type="radio" name={id("attending")} value={v} checked={form.attending === v} onChange={() => set("attending", v)} className="peer sr-only" />
                        <span className="grid h-[22px] w-[22px] place-items-center rounded-full border-2 border-gold peer-checked:border-gold-deep peer-focus-visible:ring-2 peer-focus-visible:ring-gold/50" aria-hidden>
                          <motion.span className="block h-2.5 w-2.5 rounded-full bg-gold-deep" animate={{ scale: form.attending === v ? 1 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }} />
                        </span>
                        {text}
                      </label>
                    ))}
                  </div>
                  {errors.attending && <p className={errorText}>{errors.attending}</p>}
                </fieldset>
              </Row>

              <Row index={2}>
                <label htmlFor={id("dietary")} className={labelCls}>
                  Dietary Requirements
                </label>
                <textarea id={id("dietary")} rows={3} className="field resize-none" placeholder="Any special dietary needs?" value={form.dietary} onChange={(e) => set("dietary", e.target.value)} />
              </Row>

              <Row index={0}>
                <label htmlFor={id("message")} className={labelCls}>
                  Message (Optional)
                </label>
                <textarea id={id("message")} rows={4} className="field resize-none" placeholder="Your message to the couple..." value={form.message} onChange={(e) => set("message", e.target.value)} />
              </Row>

              {status === "error" && (
                <p role="alert" className="text-center text-[15px] text-[#a3324f]">
                  Something went wrong. Please try again.
                </p>
              )}

              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 12 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "sending"}
                className="btn-gold w-full !rounded-xl"
              >
                <Send className="h-5 w-5" aria-hidden /> {status === "sending" ? "Sending…" : "Submit RSVP"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

    </ScrollPage>
  );
}
