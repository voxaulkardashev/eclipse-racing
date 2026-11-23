"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pageFor, type PageInfo } from "@/lib/site";
import { scrollToTop } from "./SmoothScroll";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const COVER_MS = 520;
const REVEAL_MS = 460;

/**
 * Page-turn transition: on an internal link click a yellow spot-ink sheet sweeps in from the
 * right showing the destination's page number and section, the route changes underneath, then
 * the sheet leaves to the left. Back/forward and reduced motion navigate without it.
 */
export default function PageTurn() {
  const router = useRouter();
  const pathname = usePathname();
  const sheet = useRef<HTMLDivElement>(null);
  const turning = useRef(false);
  const [dest, setDest] = useState<PageInfo | undefined>();

  // Intercept internal link clicks before Next's <Link> handles them.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onClick = (e: MouseEvent) => {
      if (reduced.matches || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as Element).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;

      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      let path = url.pathname;
      if (BASE && path.startsWith(BASE)) path = path.slice(BASE.length) || "/";
      const current = window.location.pathname.slice(BASE.length) || "/";
      if (path === current) return; // same page or in-page anchor: let it be

      const info = pageFor(path);
      if (!info || turning.current || !sheet.current) return;

      e.preventDefault();
      turning.current = true;
      setDest(info);

      const anim = sheet.current.animate(
        [{ clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)" }],
        { duration: COVER_MS, easing: EASE, fill: "forwards" },
      );
      anim.onfinish = () => router.push(path + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Once the new route has rendered under the sheet, reveal it.
  useEffect(() => {
    if (!turning.current || !sheet.current) return;
    scrollToTop();
    const el = sheet.current;
    const anim = el.animate(
      [{ clipPath: "inset(0 0 0 0%)" }, { clipPath: "inset(0 100% 0 0)" }],
      { duration: REVEAL_MS, delay: 80, easing: EASE, fill: "forwards" },
    );
    anim.onfinish = () => {
      turning.current = false;
      anim.cancel();
      el.getAnimations().forEach((a) => a.cancel());
    };
  }, [pathname]);

  return (
    <div ref={sheet} className="page-turn" data-ink="spot" aria-hidden="true">
      {dest && (
        <div className="page-turn__inner">
          <span className="page-turn__folio" aria-label={`Page ${dest.folio}`}>{dest.folio}</span>
          <span className="page-turn__title">{dest.section}</span>
        </div>
      )}
    </div>
  );
}
