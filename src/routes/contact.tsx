import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SITE } from "@/data/site";
import { Mail, Phone, Instagram, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VEESUALLY" },
      { name: "description", content: "Start a project with Veesually. Reach out by WhatsApp, email, or the contact form." },
      { property: "og:title", content: "Contact — VEESUALLY" },
      { property: "og:description", content: "Let's create something exceptional." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(100),
  email: z.string().trim().email("Valid email please").max(255),
  type: z.string().min(1, "Pick a project type"),
  message: z.string().trim().min(10, "A few more words").max(2000),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    const body = `Name: ${data.name}%0AEmail: ${data.email}%0AProject: ${data.type}%0A%0A${encodeURIComponent(data.message)}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("New project enquiry — " + data.name)}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-[1500px] px-6 pb-16 md:px-10">
        <p className="eyebrow">— Contact / Start a Project</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.95] md:text-8xl">
          Let's create something <span className="italic text-accent">exceptional.</span>
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-16 px-6 pb-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="eyebrow">Direct</p>
          <ul className="mt-6 space-y-5 text-lg">
            <li>
              <a href={`tel:${SITE.phone}`} className="group flex items-center gap-3 hover:text-accent">
                <Phone size={18} className="text-accent" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="group flex items-center gap-3 break-all hover:text-accent">
                <Mail size={18} className="text-accent" /> {SITE.email}
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
                <span className="grid h-[18px] w-[18px] place-items-center font-mono text-xs text-accent">T</span> TikTok / @{SITE.tiktok}
              </a>
            </li>
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${SITE.phoneIntl}?text=${encodeURIComponent("Hi Veesually, I'd like to discuss a project.")}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-foreground px-6 py-3 text-xs uppercase tracking-widest text-background"
            >
              WhatsApp us
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-full border border-border px-6 py-3 text-xs uppercase tracking-widest hover:border-accent hover:text-accent"
            >
              Send email
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="md:col-span-7 space-y-6">
          <p className="eyebrow">Project enquiry</p>

          <Field label="Name" name="name" error={errors.name} />
          <Field label="Email" name="email" type="email" error={errors.email} />

          <div>
            <label className="eyebrow block">Project Type</label>
            <select
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
            <label className="eyebrow block">Tell us about the project</label>
            <textarea
              name="message"
              rows={5}
              className="mt-3 w-full resize-none border-0 border-b border-border bg-transparent py-3 text-base outline-none focus:border-accent"
              placeholder="What are we creating together?"
            />
            {errors.message && <p className="mt-2 text-xs text-destructive">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="mt-4 rounded-full bg-foreground px-8 py-4 text-xs uppercase tracking-widest text-background transition-transform hover:scale-[1.02]"
          >
            Send enquiry →
          </button>
          {sent && <p className="text-xs text-accent">Opening your email client…</p>}
        </form>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="eyebrow block">{label}</label>
      <input
        name={name}
        type={type}
        className="mt-3 w-full border-0 border-b border-border bg-transparent py-3 text-base outline-none focus:border-accent"
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
