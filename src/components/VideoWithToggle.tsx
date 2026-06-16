import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  src: string;
  poster: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  /** Autoplay on desktop only (mobile always waits for tap). */
  autoPlayOnDesktop?: boolean;
  ariaLabel?: string;
  /** CSS object-position for the video (e.g. "center 70%"). */
  objectPosition?: string;
  /** Loop a sub-range of the video, e.g. { start: 5, end: 10 }. */
  clipRange?: { start: number; end: number };
};

export function VideoWithToggle({
  src,
  poster,
  className = "",
  loop = false,
  muted = true,
  autoPlayOnDesktop = false,
  ariaLabel = "Video",
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [preload, setPreload] = useState<"metadata" | "auto">("metadata");
  const [iconVisible, setIconVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);

  const scheduleHide = () => {
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => setIconVisible(false), 2000);
  };

  const revealIcon = () => {
    setIconVisible(true);
    scheduleHide();
  };

  useEffect(() => {
    if (!autoPlayOnDesktop) return;
    if (typeof window === "undefined") return;
    if (reducedMotion) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile) return;
    const v = videoRef.current;
    if (!v) return;
    setPreload("auto");
    v.play().then(() => {
      setStarted(true);
      setPlaying(true);
      // No icon flash on autoplay — only show on hover/tap.
    }).catch(() => {});
    return () => {
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayOnDesktop, reducedMotion]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    setPreload("auto");
    if (v.paused) {
      v.play().then(() => {
        setStarted(true);
        setPlaying(true);
        revealIcon();
      }).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
      revealIcon();
    }
  };

  const handlePointer = () => {
    if (!started) return;
    revealIcon();
  };

  const showPosterOverlay = !started;
  const mobileLike = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
  // Pre-start, show big play button only on mobile OR when reduced-motion forces a manual start.
  const bigPlayButton = showPosterOverlay && (reducedMotion || mobileLike || !autoPlayOnDesktop);

  return (
    <div
      className={`relative ${className}`}
      onMouseMove={handlePointer}
      onMouseEnter={handlePointer}
      onTouchStart={handlePointer}
      onClick={started ? toggle : undefined}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted={muted}
        playsInline
        preload={preload}
        onPlay={() => { setStarted(true); setPlaying(true); }}
        onPause={() => { setPlaying(false); revealIcon(); }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {bigPlayButton && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); toggle(); }}
          aria-label={`Play ${ariaLabel}`}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20"
        >
          <span className="grid h-20 w-20 place-items-center rounded-full border border-white/70 bg-black/40 text-white backdrop-blur-sm transition-transform hover:scale-105">
            <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
          </span>
        </button>
      )}

      {started && (
        <div
          aria-hidden={!iconVisible}
          className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${
            iconVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-black/50 text-white backdrop-blur-sm">
            {playing ? <Pause className="h-7 w-7" fill="currentColor" /> : <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />}
          </span>
        </div>
      )}
    </div>
  );
}
