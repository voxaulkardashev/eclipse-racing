"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { pageFor } from "@/lib/site";
import { reducedMotion } from "@/lib/motion";
import { scrollToTop } from "./SmoothScroll";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const COVER_MS = 520;
const REVEAL_MS = 460;

/**
 * Page-turn transition: on an internal link click a yellow spot-ink sheet sweeps in from the
 * right showing the destination's page number and section, the route changes underneath, then
 * the sheet leaves to the left. Back/forward navigate without it (and reduced motion, when the
 * site-wide switch in lib/motion.ts respects it).
 *
 * Code can request the same turn for a page that isn't a link (the contact form opening the
 * team sign-in) with requestPageTurn().
 */

type TurnInfo = { folio: string; section: string };
const TURN_EVENT = "er:page-turn";

/** Turn to `path` (without the base path) with the yellow sheet, labelled with `info`. */
export function requestPageTurn(path: string, info: TurnInfo) {
  window.dispatchEvent(new CustomEvent(TURN_EVENT, { detail: { path, info } }));
}
export default function PageTurn() {
  const router = useRouter();
  const pathname = usePathname();
  const sheet = useRef<HTMLDivElement>(null);
  const turning = useRef(false);
  const [dest, setDest] = useState<TurnInfo | undefined>();

  useEffect(() => {
    // Cover the page with the sheet, then change route underneath it.
    const turn = (path: string, info: TurnInfo) => {
      if (turning.current || !sheet.current) return false;
      if (reducedMotion()) {
        router.push(path);
        return true;
      }
      turning.current = true;
      setDest(info);
      const anim = sheet.current.animate(
        [{ clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)" }],
        { duration: COVER_MS, easing: EASE, fill: "forwards" },
      );
      anim.onfinish = () => router.push(path);
      return true;
    };

    // Intercept internal link clicks before Next's <Link> handles them.
    const onClick = (e: MouseEvent) => {
      if (reducedMotion() || e.defaultPrevented || e.button !== 0) return;
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
      turn(path + url.search + url.hash, info);
    };

    const onRequest = (e: Event) => {
      const { path, info } = (e as CustomEvent<{ path: string; info: TurnInfo }>).detail;
      if (!turn(path, info)) router.push(path);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener(TURN_EVENT, onRequest);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(TURN_EVENT, onRequest);
    };
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
