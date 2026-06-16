import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES, TOOLS } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | VEESUALLY" },
      { name: "description", content: "Event coverage, corporate videography, fashion & retail content, product films, social media content, and wedding films." },
      { property: "og:title", content: "Services | VEESUALLY" },
      { property: "og:description", content: "Full-service videography and content creation for premium brands." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="pt-24 md:pt-32">
      <section className="mx-auto max-w-[1500px] px-6 pb-12 md:px-10 md:pb-16">
        <p className="eyebrow">Capabilities</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] md:text-8xl">
          Crafted for brands that <span className="text-accent">care</span> how they're seen.
        </h1>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-10 md:px-10 md:pb-12">
        <p className="eyebrow">Tools</p>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">
          {TOOLS.join(" · ")}
        </p>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-20 md:px-10 md:pb-32">
        <div className="space-y-16 md:space-y-28">
          {SERVICES.map((s, i) => (
            <ServiceArticle key={s.title} s={s} i={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ServiceArticle({ s, i }: { s: (typeof SERVICES)[number]; i: number }) {
  const ref = useReveal<HTMLElement>();
  return (
    <article
      ref={ref}
      className={`reveal grid items-center gap-10 md:grid-cols-12 ${
        i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="md:col-span-6">
        <div className="aspect-[5/4] overflow-hidden bg-muted">
          <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="md:col-span-6 md:px-6">
        <p className="font-mono text-xs text-accent">{s.n} · Service</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl">{s.title}</h2>
        <p className="mt-6 text-base text-muted-foreground md:text-lg">{s.desc}</p>
        <Link
          to="/contact"
          className="mt-8 inline-block border-b border-foreground pb-1 text-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
        >
          Enquire →
        </Link>
      </div>
    </article>
  );
}
