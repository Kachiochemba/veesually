import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES, FEATURED, TESTIMONIALS, CLIENTS, SITE } from "@/data/site";
import { useReveal } from "@/hooks/useReveal";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { VideoWithToggle } from "@/components/VideoWithToggle";
import ownerImage from "@/assets/ajoku-victory.jpg.asset.json";
import showreelVideo from "@/assets/luxury-watches.mp4.asset.json";
import showreelPoster from "@/assets/luxury-watches-thumb-5s.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VEESUALLY | Cinematic Videography & Content Creation" },
      { name: "description", content: "A premium videography and content studio. We help brands, organizations, and events tell their story through cinematic visual content." },
      { property: "og:title", content: "VEESUALLY | Cinematic Videography & Content Creation" },
      { property: "og:description", content: "Visual storytelling that brings brands to life. Event, fashion, corporate, product, and wedding films by Ajoku Victory in Lagos." },
      { property: "og:url", content: "https://veesually.lovable.app/" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80" },
    ],
    links: [{ rel: "canonical", href: "https://veesually.lovable.app/" }],
  }),
  component: Index,
});

const BTN_PRIMARY =
  "rounded-full bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:scale-[1.02]";
const BTN_GHOST =
  "rounded-full border border-border bg-background/40 px-7 py-4 text-xs uppercase tracking-[0.2em] backdrop-blur transition-colors hover:border-accent hover:text-accent";
const TEXT_LINK =
  "inline-block border-b border-foreground pb-1 text-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent";

function Index() {
  return (
    <>
      <Hero />
      <Marquee />
      <ServicesTeaser />
      <FeaturedWork />
      <Showreel />
      <Testimonials />
      <AboutSnippet />
    </>
  );
}

function Hero() {
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const posterUrl = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80";
  const useImage = isMobile || reducedMotion;
  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden">
      {useImage ? (
        <img
          src={posterUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disableRemotePlayback
          poster={posterUrl}
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-camera-on-a-tripod-7457/1080p.mp4"
            type="video/mp4"
          />
        </video>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 pb-14 md:px-10 md:pb-24">
        <p className="eyebrow fade-up">Veesually, est. by Ajoku Victory · Lagos, Nigeria</p>
        <h1 className="fade-up mt-6 max-w-5xl font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.9]">
          Visual storytelling<br />
          that brings brands <span className="text-accent">to life.</span>
        </h1>
        <p className="fade-up mt-8 max-w-xl text-base text-muted-foreground md:text-lg">
          {SITE.tagline} We craft powerful visual experiences through videography,
          content creation, and cinematic storytelling.
        </p>
        <div className="fade-up mt-10 flex flex-wrap items-center gap-4">
          <Link to="/work" className={BTN_PRIMARY}>
            View Portfolio
          </Link>
          <Link to="/contact" className={BTN_GHOST}>
            Book A Project
          </Link>
        </div>
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
    <Section title="What we do" subtitle="Services">
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
        <Link to="/services" className={TEXT_LINK}>
          All services →
        </Link>
      </div>
    </Section>
  );
}

function FeaturedWork() {
  return (
    <Section title="Selected work" subtitle="Featured Projects">
      <div className="space-y-16 md:space-y-28">
        {FEATURED.map((p, i) => (
          <FeaturedArticle key={p.title} p={p} i={i} />
        ))}
      </div>
    </Section>
  );
}

function FeaturedArticle({ p, i }: { p: (typeof FEATURED)[number]; i: number }) {
  const ref = useReveal<HTMLElement>();
  const isMobile = useIsMobile();
  const reducedMotion = usePrefersReducedMotion();
  const useImage = isMobile || reducedMotion;
  return (
    <article
      ref={ref}
      className={`reveal grid items-center gap-8 md:grid-cols-12 ${
        i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="md:col-span-7">
        <div className="group relative aspect-[16/10] overflow-hidden bg-muted">
          {useImage ? (
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
            />
          ) : (
            <FeaturedClip src={p.video} poster={p.image} title={p.title} />
          )}
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
  );
}

function FeaturedClip({ src, poster, title }: { src: string; poster: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const START = 5;
  const END = 10;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const seekStart = () => {
      try { v.currentTime = START; } catch {}
    };
    const onLoaded = () => {
      seekStart();
      v.play().catch(() => {});
    };
    const onTimeUpdate = () => {
      if (v.currentTime >= END) seekStart();
    };
    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
      muted
      playsInline
      autoPlay
      preload="metadata"
      disableRemotePlayback
      poster={poster}
      aria-label={title}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

function Showreel() {
  return (
    <Section title="Featured Showreel" subtitle="Reel 2026">
      <VideoWithToggle
        src={showreelVideo.url}
        poster={showreelPoster.url}
        loop
        muted
        autoPlayOnDesktop
        ariaLabel="featured showreel"
        className="aspect-video w-full overflow-hidden bg-muted"
      />
    </Section>
  );
}


function AboutSnippet() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Section title="Behind the lens: Ajoku Victory." subtitle="About">
      <div ref={ref} className="reveal grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={ownerImage.url}
              alt="Ajoku Victory"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-8">
          <p className="text-base text-muted-foreground md:text-lg">
            Lagos-based videographer building Veesually into a premium
            visual-storytelling studio for brands that care how they're seen.
          </p>
          <Link to="/about" className={`mt-8 ${TEXT_LINK}`}>
            Read full story →
          </Link>
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section title="Client experience" subtitle="Words">
      <div className="grid gap-px bg-border md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.name} t={t} />
        ))}
      </div>
    </Section>
  );
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  const ref = useReveal<HTMLElement>();
  return (
    <figure ref={ref} className="reveal bg-background p-8 md:p-12">
      <p className="font-mono text-xs text-accent">{t.industry} · {t.project}</p>
      <blockquote className="mt-6 font-display text-2xl leading-snug md:text-3xl">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-8 text-sm text-muted-foreground">{t.name}</figcaption>
    </figure>
  );
}

export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section className="mx-auto max-w-[1500px] px-6 py-16 md:px-10 md:py-28">
      <header ref={ref} className="reveal mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{subtitle}</p>
          <h2 className="mt-4 font-display text-4xl md:text-6xl">{title}</h2>
        </div>
      </header>
      {children}
    </section>
  );
}
