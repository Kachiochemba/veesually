import { createFileRoute, Link } from "@tanstack/react-router";

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
  return (
    <div className="pt-32">
      <section className="mx-auto max-w-[1500px] px-6 pb-20 md:px-10">
        <p className="eyebrow">— About / The Studio</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.95] md:text-8xl">
          Meet the creative<br />behind <span className="italic text-accent">Veesually.</span>
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-12 px-6 pb-32 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80"
              alt="Oghenetejiri Etaghene"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-px bg-border">
            <Stat label="Years" value="2+" />
            <Stat label="Sectors served" value="9" />
          </div>
        </div>

        <div className="md:col-span-7 md:pl-8">
          <p className="text-lg leading-relaxed text-foreground md:text-xl">
            Oghenetejiri Etaghene is a videographer, content creator, and visual storyteller
            with over two years of experience creating engaging visual content for brands,
            organizations, fashion businesses, educational institutions, churches, and corporate clients.
          </p>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            His work focuses on capturing authentic moments, building emotional connections,
            and helping brands communicate their value through compelling visual narratives.
            Veesually exists at the intersection of cinema and commerce — where craft serves story,
            and story serves the brand.
          </p>

          <div className="mt-12 grid gap-px bg-border sm:grid-cols-3">
            {[
              { t: "Authentic moments", d: "Truth before polish." },
              { t: "Emotional connection", d: "Story over surface." },
              { t: "Compelling narratives", d: "Craft as message." },
            ].map((v) => (
              <div key={v.t} className="bg-background p-6">
                <p className="font-display text-xl">{v.t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>

          <Link
            to="/contact"
            className="mt-12 inline-block border-b border-foreground pb-1 text-sm uppercase tracking-widest hover:border-accent hover:text-accent"
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
