import { Link } from "@tanstack/react-router";
import { SITE } from "@/data/site";
import { Instagram } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import logoAsset from "@/assets/veesually-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 className="font-display text-5xl leading-[0.95] md:text-7xl">
              Let's create<br />
              <span className="text-accent">something exceptional.</span>
            </h2>
            <Link
              to="/contact"
              className="mt-8 inline-block border-b border-foreground pb-1 text-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
            >
              Start a project →
            </Link>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4">Contact</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-accent" href={`tel:${SITE.phone}`}>
                  Phone
                </a>
              </li>
              <li>
                <a className="hover:text-accent break-all" href={`mailto:${SITE.email}`}>
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4">Social</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="inline-flex items-center gap-2 hover:text-accent"
                  href={`https://instagram.com/${SITE.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram size={14} /> @{SITE.instagram}
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 hover:text-accent"
                  href={`https://tiktok.com/@${SITE.tiktok}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TikTokIcon size={14} /> @{SITE.tiktok}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/work" className="hover:text-accent">Work</Link></li>
              <li><Link to="/services" className="hover:text-accent">Services</Link></li>
              <li><Link to="/about" className="hover:text-accent">About</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 md:flex-row md:items-center">
          <img src={logoAsset.url} alt="Veesually" className="h-[200px] w-auto" />
          <p className="text-xs text-muted-foreground">
            Veesually · Lagos, Nigeria · Founded by Ajoku Victory · © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
