import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FEATURED, type Category } from "@/data/site";
import { VideoWithToggle } from "@/components/VideoWithToggle";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work | VEESUALLY" },
      { name: "description", content: "Explore our portfolio of cinematic films including event coverage, fashion brand launches, luxury jewelry editorials, weddings, and premium product videography." },
      { property: "og:title", content: "Work | VEESUALLY" },
      { property: "og:description", content: "Explore our portfolio of cinematic films including event coverage, fashion brand launches, and premium product videography." },
      { property: "og:url", content: "https://veesually.lovable.app/work" },
      { property: "og:image", content: FEATURED[1].image },
    ],
    links: [{ rel: "canonical", href: "https://veesually.lovable.app/work" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Selected Work | VEESUALLY",
        url: "https://veesually.lovable.app/work",
        about: "Cinematic videography portfolio by Veesually",
        hasPart: FEATURED.map((f) => ({
          "@type": "CreativeWork",
          name: f.title,
          genre: f.category,
          description: f.desc,
          image: f.image,
          video: f.video,
        })),
      }),
    }],
  }),
  component: WorkPage,
});

type Filter = "All" | Category;

function WorkPage() {
  const featuredCategories = Array.from(new Set(FEATURED.map((f) => f.category))) as Category[];
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<(typeof FEATURED)[number] | null>(null);

  const items = filter === "All" ? FEATURED : FEATURED.filter((p) => p.category === filter);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <div className="pt-24 md:pt-32">
      <section className="mx-auto max-w-[1500px] px-6 pb-10 md:px-10 md:pb-12">
        <p className="eyebrow">Selected Work</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl">Selected work.</h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          A focused collection of cinematic films across fashion, luxury retail,
          cultural events, and weddings.
        </p>

        <div className="mt-10 flex flex-wrap gap-2 md:mt-12">
          {(["All", ...featuredCategories] as Filter[]).map((c) => (
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((p) => (
            <WorkCard key={p.title} item={p} onOpen={() => setActive(p)} />
          ))}
        </div>
        {items.length === 0 && (
          <p className="py-24 text-center text-muted-foreground">Nothing here yet.</p>
        )}
      </section>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 px-4 py-10 backdrop-blur-sm"
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Close video"
            className="absolute right-4 top-4 z-10 rounded-full border border-border bg-background/60 px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:border-accent hover:text-accent"
          >
            Close ✕
          </button>
          <div
            className="relative w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <VideoWithToggle
              src={active.video}
              poster={active.image}
              autoPlayOnDesktop
              muted={false}
              ariaLabel={active.title}
              objectFit="contain"
              className="aspect-video w-full overflow-hidden bg-black"
            />
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-display text-xl">{active.title}</span>
              <span className="font-mono text-xs text-muted-foreground">{active.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WorkCard({
  item,
  onOpen,
}: {
  item: (typeof FEATURED)[number];
  onOpen: () => void;
}) {
  return (
    <figure
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/20" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="rounded-full border border-foreground/60 bg-background/40 px-5 py-2 text-xs uppercase tracking-widest text-foreground backdrop-blur-sm">
            ▶ Watch
          </span>
        </div>
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between">
        <span className="font-display text-lg">{item.title}</span>
        <span className="font-mono text-xs text-muted-foreground">{item.category}</span>
      </figcaption>
    </figure>
  );
}
