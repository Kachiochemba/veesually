import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useInView } from "@/hooks/use-in-view";

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
  objectPosition,
  clipRange,
}: Props) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { rootMargin: "200px" });
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [preload, setPreload] = useState<"metadata" | "auto">("metadata");
  const [iconVisible, setIconVisible] = useState(false);
  const hideTimer = useRef<number | null>(null);
  const userPausedRef = useRef(false);

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
    if (!inView) {
      if (!v.paused) v.pause();
      return;
    }
    if (userPausedRef.current) return;
    setPreload("auto");
    const seekStart = () => {
      if (clipRange) {
        try { v.currentTime = clipRange.start; } catch {}
      }
    };
    const onLoaded = () => seekStart();
    v.addEventListener("loadedmetadata", onLoaded);
    if (v.readyState >= 1) seekStart();
    v.play().then(() => {
      setStarted(true);
      setPlaying(true);
    }).catch(() => {});
    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayOnDesktop, reducedMotion, inView]);

  useEffect(() => {
    if (!clipRange) return;
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.currentTime >= clipRange.end) {
        try { v.currentTime = clipRange.start; } catch {}
      }
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [clipRange]);

  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) {
        if (!v.paused) v.pause();
      } else if (inView && autoPlayOnDesktop && !reducedMotion && !userPausedRef.current) {
        v.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [inView, autoPlayOnDesktop, reducedMotion]);




  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    setPreload("auto");
    if (v.paused) {
      userPausedRef.current = false;
      v.play().then(() => {
        setStarted(true);
        setPlaying(true);
        revealIcon();
      }).catch(() => {});
    } else {
      userPausedRef.current = true;
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
      ref={containerRef}
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
        style={objectPosition ? { objectPosition } : undefined}
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
