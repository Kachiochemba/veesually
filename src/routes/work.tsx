import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PORTFOLIO, CATEGORIES, type Category } from "@/data/site";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — VEESUALLY" },
      { name: "description", content: "Selected videography and content work across events, fashion, corporate, product, weddings, interviews, and social media." },
      { property: "og:title", content: "Work — VEESUALLY" },
      { property: "og:description", content: "Filterable portfolio of cinematic visual work by Veesually." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80" },
    ],
  }),
  component: WorkPage,
});

type Filter = "All" | Category;

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("All");
  const items = filter === "All" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <div className="pt-24 md:pt-32">
      <section className="mx-auto max-w-[1500px] px-6 pb-10 md:px-10 md:pb-12">
        <p className="eyebrow">— Selected Work</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Selected work.</h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          A living archive of films and content produced for fashion houses,
          corporate clients, faith organizations, and cultural events.
        </p>

        <div className="mt-10 flex flex-wrap gap-2 md:mt-12">
          {(["All", ...CATEGORIES] as Filter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest transition-all ${
                filter === c
                  ? "border-accent text-accent"
                  : "border-border text-muted-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-20 md:px-10 md:pb-32">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <figure key={p.title + p.image} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/30" />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between">
                <span className="font-display text-lg">{p.title}</span>
                <span className="font-mono text-xs text-muted-foreground">{p.category}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        {items.length === 0 && (
          <p className="py-24 text-center text-muted-foreground">Nothing here yet.</p>
        )}
      </section>
    </div>
  );
}
