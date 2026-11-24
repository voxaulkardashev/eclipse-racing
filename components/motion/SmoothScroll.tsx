"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { RESPECT_REDUCED_MOTION, reducedMotion } from "@/lib/motion";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scrolling. */
export default function SmoothScroll() {
  useEffect(() => {
    if (reducedMotion()) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      // Low lerp = long, heavy glide after each wheel flick (more momentum).
      lerp: 0.055,
      wheelMultiplier: 1.15,
      stopInertiaOnNavigate: true,
      // Lenis also checks reduce-motion itself and would scroll 1:1; follow the site-wide switch instead.
      respectReducedMotion: RESPECT_REDUCED_MOTION,
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
