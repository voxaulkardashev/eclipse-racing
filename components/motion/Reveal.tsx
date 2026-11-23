"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll reveals, two kinds only:
 *  - data-reveal="ink": a heading rolls on left to right, like ink from a press roller.
 *  - data-reveal="rows": a list prints row by row (stagger capped at 8 rows).
 * Content is visible by default; it is only hidden while the html element has .motion-ok,
 * which an inline script sets before paint when motion is allowed.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion-ok")) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    items.forEach((el) => {
      if (el.dataset.reveal === "rows") {
        Array.from(el.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty("--i", String(Math.min(i, 8)));
        });
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      // threshold 0: a clip-path-hidden heading reports an intersection ratio of 0 in Chrome.
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    items.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
