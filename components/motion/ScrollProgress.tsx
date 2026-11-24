"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Scroll progress: a thin yellow line along the bottom edge of the masthead that fills left to
 * right as you scroll down the page. Rendered inside the masthead, so it always sits on black.
 */
export default function ScrollProgress() {
  const fill = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = fill.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
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

  return (
    <div className="masthead__progress" aria-hidden="true">
      <span ref={fill} />
    </div>
  );
}
