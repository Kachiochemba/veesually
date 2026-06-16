import { createFileRoute, Link } from "@tanstack/react-router";
import { useReveal } from "@/hooks/useReveal";
import { INDUSTRIES } from "@/data/site";
import ownerImage from "@/assets/ajoku-victory.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VEESUALLY" },
      { name: "description", content: "Meet Oghenetejiri Etaghene, the videographer and visual storyteller behind Veesually." },
      { property: "og:title", content: "About — VEESUALLY" },
      { property: "og:description", content: "Two years crafting cinematic visual content for fashion, faith, education, and corporate clients." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=80" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const bodyRef = useReveal<HTMLDivElement>();
  return (
    <div className="pt-24 md:pt-32">
      <section className="mx-auto max-w-[1500px] px-6 pb-16 md:px-10 md:pb-20">
        <p className="eyebrow">The Studio</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.95] md:text-8xl">
          Meet Ajoku Victory,<br />the creative behind <span className="text-accent">Veesually.</span>
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 pb-20 md:grid-cols-12 md:px-10 md:pb-32">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={ownerImage.url}
              alt="Ajoku Victory"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-px bg-border">
            <Stat label="Years" value="2+" />
            <Stat label="Sectors served" value="9" />
          </div>
        </div>

        <div ref={bodyRef} className="reveal md:col-span-7 md:pl-8">
          <p className="text-lg leading-relaxed text-foreground md:text-xl">
            Ajoku Victory is a videographer, content creator, and visual storyteller
            with over two years of experience producing high-quality visual content for brands,
            organizations, educational institutions, churches, conferences, retail, fashion,
            and corporate clients. Based in Lagos, Nigeria.
          </p>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            He specializes in storytelling, event documentation, corporate content, product
            marketing, social-media short-form, and brand visibility. Known for attention to
            detail, creativity, professionalism, fast turnaround, strong client communication,
            and high-quality editing.
          </p>

          <p className="eyebrow mt-10">Industries</p>
          <p className="mt-3 text-sm text-muted-foreground">
            {INDUSTRIES.join(" · ")}
          </p>

          <div className="mt-12 grid gap-px bg-border sm:grid-cols-3">
            {[
              { t: "Story-driven", d: "Narrative before noise." },
              { t: "Premium craft", d: "Cinema-grade editing and color." },
              { t: "Reliable delivery", d: "Fast turnaround, clear comms." },
            ].map((v) => (
              <div key={v.t} className="bg-background p-6">
                <p className="font-display text-xl">{v.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-12 inline-block border-b border-foreground pb-1 text-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
          >
            Work with us →
          </Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-6">
      <p className="font-display text-4xl text-accent">{value}</p>
      <p className="eyebrow mt-2">{label}</p>
    </div>
  );
}
