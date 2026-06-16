import { useEffect, useState, type RefObject } from "react";

/** Returns true once the element is (or has been) within the viewport. */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options: IntersectionObserverInit = { rootMargin: "200px" },
  once = false,
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && once) obs.disconnect();
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, once]);

  return inView;
}
