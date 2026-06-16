import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SITE } from "@/data/site";
import { Mail, Phone, Instagram, MessageCircle, MapPin } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | VEESUALLY" },
      { name: "description", content: "Start a project with Veesually and reach out via WhatsApp or email to discuss your cinematic videography needs in Lagos and beyond." },
      { property: "og:title", content: "Contact | VEESUALLY" },
      { property: "og:description", content: "Start a project with Veesually and reach out via WhatsApp or email to discuss your cinematic videography needs in Lagos and beyond." },
      { property: "og:url", content: "https://veesually.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://veesually.lovable.app/contact" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "VEESUALLY",
        description: "Premium videography and visual storytelling studio based in Lagos, Nigeria.",
        url: "https://veesually.lovable.app",
        telephone: "+2348146304928",
        email: "ajokuvictory0032@gmail.com",
        address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
        areaServed: "Lagos, Nigeria",
        founder: { "@type": "Person", name: "Ajoku Victory" },
      }),
    }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(100),
  email: z.string().trim().email("Valid email please").max(255),
  type: z.string().min(1, "Pick a project type"),
  message: z.string().trim().min(10, "A few more words").max(2000),
});

const BTN_PRIMARY =
  "rounded-full bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:scale-[1.02]";
const BTN_GHOST =
  "rounded-full border border-border px-7 py-4 text-xs uppercase tracking-[0.2em] transition-colors hover:border-accent hover:text-accent";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykavngn";

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useReveal<HTMLFormElement>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form) as Record<string, string>;
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(false);
    setSending(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: form,
      });
      if (res.ok) {
        setErrors({});
        setSent(true);
        e.currentTarget.reset();
      } else {
        setSent(false);
        setErrors({ form: "Something went wrong. Please try again or reach out directly." });
      }
    } catch {
      setSent(false);
      setErrors({ form: "Something went wrong. Please try again or reach out directly." });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="pt-24 md:pt-32">
      <section className="mx-auto max-w-[1500px] px-6 pb-12 md:px-10 md:pb-16">
        <p className="eyebrow">Start a Project</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.95] md:text-8xl">
          Let's create something <span className="text-accent">exceptional.</span>
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-16 px-6 pb-8 md:grid-cols-12 md:px-10 md:pb-12">
        <div className="md:col-span-5">
          <p className="eyebrow">Direct</p>
          <ul className="mt-6 space-y-5 text-lg">
            <li>
              <a href={`tel:${SITE.phone}`} className="group flex items-center gap-3 hover:text-accent">
                <Phone size={18} className="text-accent" /> Phone
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-3 hover:text-accent">
                <Mail size={18} className="text-accent" /> Email
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${SITE.phoneIntl}`} target="_blank" rel="noreferrer" className="group flex items-center gap-3 hover:text-accent">
                <MessageCircle size={18} className="text-accent" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noreferrer" className="group flex items-center gap-3 hover:text-accent">
                <Instagram size={18} className="text-accent" /> @{SITE.instagram}
              </a>
            </li>
            <li>
              <a href={`https://tiktok.com/@${SITE.tiktok}`} target="_blank" rel="noreferrer" className="group flex items-center gap-3 hover:text-accent">
                <TikTokIcon size={18} className="text-accent" /> @{SITE.tiktok}
              </a>
            </li>
            <li>
              <span className="flex items-center gap-3 text-muted-foreground">
                <MapPin size={18} className="text-accent" /> {SITE.location}
              </span>
            </li>
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent("Hi Veesually, I'd like to discuss a project.")}`}
              target="_blank"
              rel="noreferrer"
              className={BTN_PRIMARY}
            >
              WhatsApp us
            </a>
            <a href={`mailto:${SITE.email}`} className={BTN_GHOST}>
              Send email
            </a>
          </div>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="reveal md:col-span-7 space-y-6">
          <p className="eyebrow">Project enquiry</p>

          <Field label="Name" name="name" error={errors.name} />
          <Field label="Email" name="email" type="email" error={errors.email} />

          <div>
            <label htmlFor="contact-type" className="eyebrow block">Project Type</label>
            <select
              id="contact-type"
              name="type"
              defaultValue=""
              className="mt-3 w-full border-0 border-b border-border bg-transparent py-3 text-base outline-none focus:border-accent"
            >
              <option value="" disabled className="bg-background">Select one…</option>
              {["Event Coverage","Corporate","Fashion & Retail","Product","Social Media","Wedding","Other"].map((o) => (
                <option key={o} value={o} className="bg-background">{o}</option>
              ))}
            </select>
            {errors.type && <p className="mt-2 text-xs text-destructive">{errors.type}</p>}
          </div>

          <div>
            <label htmlFor="contact-message" className="eyebrow block">Tell us about the project</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              className="mt-3 w-full resize-none border-0 border-b border-border bg-transparent py-3 text-base outline-none focus:border-accent"
              placeholder="What are we creating together?"
            />
            {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
          </div>

          <button type="submit" disabled={sending || sent} className={`mt-4 ${BTN_PRIMARY} disabled:opacity-60`}>
            {sent ? "Sent ✓" : sending ? "Sending…" : "Send enquiry →"}
          </button>
          {sent && <p className="text-xs text-accent">Message sent. We'll be in touch shortly.</p>}
          {errors.form && <p className="text-xs text-destructive">{errors.form}</p>}
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  const id = `contact-${name}`;
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        className="mt-3 w-full border-0 border-b border-border bg-transparent py-3 text-base outline-none focus:border-accent"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
