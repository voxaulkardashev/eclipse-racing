"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Lenis smooth scrolling. Skipped entirely for reduced-motion users. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.12,
      wheelMultiplier: 0.9,
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
