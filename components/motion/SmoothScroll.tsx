"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Temporary: the team asked for Lenis to run for everyone, even with "reduce motion" on
// (Windows: Animation effects off). Set to false to respect that setting again.
const FORCE_SMOOTH_SCROLL = true;

/** Lenis smooth scrolling. */
export default function SmoothScroll() {
  useEffect(() => {
    if (!FORCE_SMOOTH_SCROLL && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      // Low lerp = long, heavy glide after each wheel flick (more momentum).
      lerp: 0.055,
      wheelMultiplier: 1.15,
      stopInertiaOnNavigate: true,
      // Lenis also checks reduce-motion itself and would scroll 1:1; honour the flag above instead.
      respectReducedMotion: !FORCE_SMOOTH_SCROLL,
    });
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

/** Jump to the top, through Lenis when it is running. */
export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}
