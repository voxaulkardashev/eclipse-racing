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

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.dataset.reveal === "rows") {
          Array.from(el.children).forEach((child, i) => {
            (child as HTMLElement).style.setProperty("--i", String(Math.min(i, 8)));
          });
        }
        io.observe(el);
      });
    };
    scan();

    // Content that appears after the page loads (pages that render after a check, such as the
    // team area) gets the same reveals.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
