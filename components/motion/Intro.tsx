"use client";

import { useEffect, useRef } from "react";
import { CAR, LOGO_VIEWBOX, STAR_AND_CRESCENT } from "@/components/Logo";
import { site } from "@/lib/site";
import { reducedMotion } from "@/lib/motion";

/**
 * First-visit loading screen (once per browser session).
 *
 * anime.js draws the logo: the yellow star-and-crescent outline grows outwards from its middle,
 * the white car outline traces in, then both fills flood in and the outlines fade.
 * GSAP then flies the drawn mark onto the page's own logo, wipes the black sheet up off the page
 * and, on the cover, brings in the title, the next-round panel and the contents list.
 *
 * The sheet is only shown while <html> has .intro, which an inline script sets before paint
 * (and clears after 7s regardless), so the page is never blocked if scripts fail.
 * When the site-wide switch in lib/motion.ts respects reduce motion and the device asks for it,
 * the logo still draws but the sheet fades instead of wiping.
 */
export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const el = ref.current;
    if (!el || !html.classList.contains("intro")) return;

    const reduced = reducedMotion();
    let cancelled = false;
    window.__lenis?.stop();

    const finish = () => {
      html.classList.remove("intro");
      try {
        sessionStorage.setItem("er-intro", "1");
      } catch {
        /* private mode: the intro may play again next load, which is fine */
      }
      window.__lenis?.start();
    };

    (async () => {
      const [{ createTimeline, svg, stagger }, { gsap }] = await Promise.all([import("animejs"), import("gsap")]);
      if (cancelled) return;

      const mark = el.querySelector<SVGSVGElement>(".loader__mark")!; // always rendered below
      const [star, car] = svg.createDrawable(el.querySelectorAll(".loader__stroke"));

      const wipe = () => {
        const tl = gsap.timeline({
          onComplete: () => {
            finish();
            gsap.set(el, { clearProps: "all" });
          },
        });

        if (reduced) {
          tl.to(el, { autoAlpha: 0, duration: 0.4, ease: "power1.out" });
          return;
        }

        // Fly the drawn mark onto the page's own logo (the cover logo on the home page, the
        // masthead logo elsewhere). The sheet's edge passes it last, so the handoff is seamless.
        const target = document.querySelector(".cover__logo") ?? document.querySelector(".masthead__logo svg");
        if (target) {
          const from = mark.getBoundingClientRect();
          const to = target.getBoundingClientRect();
          tl.to(mark, {
            x: to.left + to.width / 2 - (from.left + from.width / 2),
            y: to.top + to.height / 2 - (from.top + from.height / 2),
            scale: to.width / from.width,
            transformOrigin: "50% 50%",
            duration: 0.95,
            ease: "power3.inOut",
          });
        }
        tl.to(".loader__foot", { autoAlpha: 0, duration: 0.3, ease: "power1.out" }, 0).to(
          el,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "power4.inOut" },
          target ? "-=0.4" : 0,
        );

        // Cover entrance, only when the visit starts on the home page.
        const lines = document.querySelectorAll(".cover__line > span");
        if (lines.length) {
          tl.from(lines, { yPercent: 108, duration: 1, ease: "power4.out", stagger: 0.09 }, "-=0.5")
            .from(".next-round", { y: 36, autoAlpha: 0, duration: 0.8, ease: "power3.out" }, "-=0.8")
            .from(
              ".cover__contents li",
              { y: 14, autoAlpha: 0, duration: 0.55, ease: "power3.out", stagger: 0.05 },
              "-=0.6",
            );
        }
      };

      createTimeline({ onComplete: wipe })
        .set(mark, { opacity: 1 })
        .add(".loader__rule", { scaleX: [0, 1], duration: 1700, ease: "outExpo" }, 0)
        .add(".loader__meta > *", { opacity: [0, 1], translateY: [8, 0], duration: 500, delay: stagger(90) }, 150)
        .add(star, { draw: ["0.5 0.5", "0 1"], duration: 1150, ease: "inOutCubic" }, 0)
        .add(car, { draw: ["0 0", "0 1"], duration: 950, ease: "inOutCubic" }, 420)
        .add(".loader__fill", { opacity: [0, 1], duration: 480, delay: stagger(140), ease: "outQuad" }, 1150)
        .add(".loader__stroke", { opacity: [1, 0], duration: 420, ease: "outQuad" }, 1350)
        .add(mark, { scale: [1, 1.035, 1], duration: 700, ease: "inOutSine" }, 1250);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={ref} className="loader" data-theme="dark" aria-hidden="true">
      <div className="loader__stage">
        <svg className="loader__mark" viewBox={LOGO_VIEWBOX} xmlns="http://www.w3.org/2000/svg">
          <path className="loader__fill loader__fill--star" d={STAR_AND_CRESCENT} fillRule="evenodd" />
          <path className="loader__fill loader__fill--car" d={CAR} fillRule="evenodd" />
          <path className="loader__stroke loader__stroke--star" d={STAR_AND_CRESCENT} />
          <path className="loader__stroke loader__stroke--car" d={CAR} />
        </svg>
      </div>
      <div className="loader__foot container">
        <span className="loader__rule" />
        <div className="loader__meta">
          <span>Eclipse Racing · Official programme</span>
          <span>Season {site.season}</span>
        </div>
      </div>
    </div>
  );
}
