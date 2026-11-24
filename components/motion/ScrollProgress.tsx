"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * A vertical line down the right edge showing how far down the page you are.
 *
 * Like the cursor it is an inverting lens in the logo's yellow (a "darken" copy under a
 * "difference" copy), so it reads on every surface: black over paper, yellow over black, black
 * over yellow. A faint full-height track sits behind the filled part.
 */
const PARTS = ["track darken", "track difference", "fill darken", "fill difference"] as const;

export default function ScrollProgress() {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const fills = refs.current.filter((el, i) => el && PARTS[i].startsWith("fill")) as HTMLSpanElement[];
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      for (const f of fills) f.style.transform = `scaleY(${p})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Pages grow as fonts and reveals settle; keep the ratio right.
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [pathname]);

  // Top-level fixed elements, so their blend modes mix with the page (see Cursor).
  return (
    <>
      {PARTS.map((part, i) => (
        <span
          key={part}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`progress progress--${part.replace(" ", " progress--")}`}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
