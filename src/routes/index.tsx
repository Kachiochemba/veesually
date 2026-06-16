import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES, FEATURED, TESTIMONIALS, CLIENTS, SITE } from "@/data/site";
import { ArrowDown, Play } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEESUALLY — Cinematic Videography & Content Creation" },
      { name: "description", content: "A premium videography and content studio. We help brands, organizations, and events tell their story through cinematic visual content." },
      { property: "og:title", content: "VEESUALLY — Cinematic Videography & Content Creation" },
      { property: "og:description", content: "Visual storytelling that brings brands to life. Event, fashion, corporate, product, and wedding films." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesTeaser />
      <FeaturedWork />
      <Showreel />
      <AboutSnippet />
      <Testimonials />
    </>
  );
}

function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
      >
        <source
          src="https://cdn.coverr.co/videos/coverr-a-camera-on-a-tripod-7457/1080p.mp4"
          type="video/mp4"
        />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-20 md:px-10 md:pb-28">
        <p className="eyebrow fade-up">Veesually — Est. by Oghenetejiri Etaghene</p>
        <h1 className="fade-up mt-6 max-w-5xl font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9]">
          Visual storytelling<br />
          that brings brands <span className="italic text-accent">to life.</span>
        </h1>
        <p className="fade-up mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
          {SITE.tagline} We craft powerful visual experiences through videography,
          content creation, and cinematic storytelling.
        </p>
        <div className="fade-up mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/work"
            className="rounded-full bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:scale-[1.02]"
          >
            View Portfolio
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-border bg-background/40 px-7 py-4 text-xs uppercase tracking-[0.2em] backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            Book A Project
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-3 text-xs text-muted-foreground md:flex">
        <ArrowDown size={14} className="animate-bounce" />
        <span className="eyebrow">Scroll</span>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...CLIENTS, ...CLIENTS];
  return (
    <div className="overflow-hidden border-y border-border bg-background py-8">
      <div className="marquee-track flex gap-16 whitespace-nowrap">
        {items.map((c, i) => (
          <span key={i} className="font-display text-2xl text-muted-foreground md:text-3xl">
            {c} <span className="mx-8 text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function ServicesTeaser() {
  return (
    <Section index="01" title="What we do" subtitle="Services">
      <div className="grid gap-px bg-border md:grid-cols-3">
        {SERVICES.slice(0, 6).map((s) => (
          <div key={s.title} className="group relative overflow-hidden bg-background p-8 md:p-10">
            <p className="font-mono text-xs text-accent">{s.n}</p>
            <h3 className="mt-6 font-display text-3xl">{s.title}</h3>
            <p className="mt-4 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Link to="/services" className="text-sm uppercase tracking-widest hover:text-accent">
          All services →
        </Link>
      </div>
    </Section>
  );
}

function FeaturedWork() {
  return (
    <Section index="02" title="Selected work" subtitle="Featured Projects">
      <div className="space-y-24 md:space-y-32">
        {FEATURED.map((p, i) => (
          <article
            key={p.title}
            className={`grid items-center gap-8 md:grid-cols-12 ${
              i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="md:col-span-7">
              <div className="group relative aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
              </div>
            </div>
            <div className="md:col-span-5 md:px-6">
              <p className="font-mono text-xs text-accent">
                0{i + 1} / {p.category}
              </p>
              <h3 className="mt-4 font-display text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-4 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Showreel() {
  return (
    <Section index="03" title="Featured Showreel" subtitle="Reel 2026">
      <div className="group relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80"
          alt="Showreel"
          className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="flex h-24 w-24 items-center justify-center rounded-full border border-foreground/40 bg-background/30 backdrop-blur transition-all hover:scale-110 hover:border-accent hover:text-accent md:h-32 md:w-32">
            <Play size={28} className="ml-1" />
          </button>
        </div>
        <div className="absolute bottom-6 left-6 text-xs text-foreground/80">
          <p className="eyebrow">Events · Corporate · Fashion · Product · Interviews · Reels</p>
        </div>
      </div>
    </Section>
  );
}

function AboutSnippet() {
  return (
    <Section index="04" title="The studio" subtitle="About">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80"
              alt="Oghenetejiri Etaghene"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8">
          <h3 className="font-display text-4xl md:text-5xl">
            Meet the creative<br />behind Veesually.
          </h3>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Oghenetejiri Etaghene is a videographer, content creator, and visual storyteller
            with over two years of experience producing engaging content for brands,
            organizations, fashion businesses, educational institutions, churches, and corporate clients.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block border-b border-foreground pb-1 text-sm uppercase tracking-widest hover:border-accent hover:text-accent"
          >
            Read full story →
          </Link>
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section index="05" title="Client experience" subtitle="Words">
      <div className="grid gap-px bg-border md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="bg-background p-8 md:p-12">
            <p className="font-mono text-xs text-accent">{t.industry} · {t.project}</p>
            <blockquote className="mt-6 font-display text-2xl leading-snug md:text-3xl">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-8 text-sm text-muted-foreground">— {t.name}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

export function Section({
  index,
  title,
  subtitle,
  children,
}: {
  index: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
      <header className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">— {index} / {subtitle}</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">{title}</h2>
        </div>
      </header>
      {children}
    </section>
  );
}
