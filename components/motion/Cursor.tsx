"use client";

import { useEffect, useRef } from "react";

/**
 * A yellow ink-dot cursor that trails the pointer, drawn above everything. Two layers:
 *
 * 1. The base disc, styled for the ground it is over: on paper a yellow dot with a thin black
 *    ring, opening into a highlighter over links (multiply, so link text stays legible); on black
 *    a yellow dot, and a yellow ring over links. Over data-cursor="Label" elements it becomes an
 *    ink disc carrying the label.
 * 2. The spot layer: the same disc in black, clipped every frame to exactly the parts of the
 *    cursor that sit over yellow (data-ink="spot") surfaces. So a cursor half over a yellow panel
 *    is half black and half yellow. Over links this layer inverts what is under it instead
 *    (difference blend: yellow turns black, black text turns yellow).
 *
 * Position and size are eased every frame, so entering, leaving and switching states glide and
 * can be interrupted midway. Colours and the label cross-fade in CSS.
 *
 * Shown whenever a mouse or trackpad is present (including touchscreen laptops). The easing runs
 * for everyone, reduce-motion included, at the team's request.
 */

// How quickly position and size catch up each frame (0..1). Lower is smoother and lazier.
const FOLLOW = 0.16;
const GROW = 0.14;

// Disc size per state, as a scale of its 56px base.
const SIZE = { dot: 0.25, link: 0.85, label: 1.3 };
const PRESSED = 0.8;

// The spot layer is an 80px box centred on the pointer (big enough for the largest disc).
const BOX = 80;
const HALF = BOX / 2;
// Yellow surfaces the spot layer tracks. The page-turn sheet is excluded: it is fixed and
// full-screen, revealed by its own clip-path, so its box says nothing about what is visible.
const SPOT = "[data-ink='spot']:not(.page-turn)";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const spotDiscRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const disc = discRef.current;
    const label = labelRef.current;
    const spot = spotRef.current;
    const spotDisc = spotDiscRef.current;
    if (!el || !disc || !label || !spot || !spotDisc) return;

    // any-*: a touchscreen laptop's primary pointer is touch, but its mouse still counts.
    const fine = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    if (!fine.matches) return;

    document.documentElement.classList.add("has-cursor");

    const target = { x: -100, y: -100, scale: SIZE.dot };
    const pos = { x: -100, y: -100, scale: SIZE.dot };
    let state: keyof typeof SIZE = "dot";
    let pressed = false;
    let raf = 0;
    let visible = false;
    let lastClip = "";

    const settle = (a: number, b: number, eps: number) => Math.abs(a - b) < eps;

    // Clip the spot layer to the yellow surfaces under the cursor's box, as a union of rects.
    const clipSpot = () => {
      const ox = pos.x - HALF;
      const oy = pos.y - HALF;
      let d = "";
      document.querySelectorAll<HTMLElement>(SPOT).forEach((s) => {
        const r = s.getBoundingClientRect();
        const x0 = Math.max(r.left, ox) - ox;
        const y0 = Math.max(r.top, oy) - oy;
        const x1 = Math.min(r.right, ox + BOX) - ox;
        const y1 = Math.min(r.bottom, oy + BOX) - oy;
        if (x1 > x0 && y1 > y0) d += `M${x0} ${y0}H${x1}V${y1}H${x0}Z`;
      });
      const clip = d ? `path('${d}')` : "inset(50%)";
      if (clip !== lastClip) {
        spot.style.clipPath = clip;
        lastClip = clip;
      }
    };

    const draw = () => {
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      disc.style.transform = `scale(${pos.scale})`;
      spot.style.transform = `translate3d(${pos.x - HALF}px, ${pos.y - HALF}px, 0)`;
      // A hair larger than the base disc so no yellow fringe shows around the black.
      spotDisc.style.transform = `scale(${pos.scale * 1.04})`;
      clipSpot();
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * FOLLOW;
      pos.y += (target.y - pos.y) * FOLLOW;
      pos.scale += (target.scale - pos.scale) * GROW;

      const done =
        settle(target.x, pos.x, 0.1) && settle(target.y, pos.y, 0.1) && settle(target.scale, pos.scale, 0.001);
      if (done) pos.scale = target.scale;
      draw();
      raf = done ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const applyScale = () => {
      target.scale = SIZE[state] * (pressed ? PRESSED : 1);
      kick();
    };

    const toggle = (name: string, on: boolean) => {
      el.classList.toggle(name, on);
      spot.classList.toggle(name, on);
    };

    const setState = (node: Element | null) => {
      const field = node?.closest("input, textarea, select, [contenteditable='true']");
      const labelled = node?.closest<HTMLElement>("[data-cursor]");
      const link = node?.closest("a, button, label[for], summary");
      const dark = node?.closest("[data-theme='dark']");

      const next: keyof typeof SIZE = labelled ? "label" : link ? "link" : "dot";
      toggle("is-hidden", Boolean(field));
      toggle("is-dark", Boolean(dark));
      toggle("is-label", next === "label");
      toggle("is-link", next === "link");
      // Keep the old label text while it fades out, so it doesn't vanish mid-fade.
      if (labelled?.dataset.cursor) label.textContent = labelled.dataset.cursor;

      if (next !== state) {
        state = next;
        applyScale();
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        // First move: start at the pointer instead of flying in from the corner.
        pos.x = target.x;
        pos.y = target.y;
        visible = true;
        toggle("is-visible", true);
      }
      setState(e.target as Element);
      kick();
    };

    // Scrolling moves content under a still pointer: re-check what it is over and re-clip.
    const onScroll = () => {
      if (!visible) return;
      setState(document.elementFromPoint(target.x, target.y));
      clipSpot();
    };

    const onLeave = () => {
      visible = false;
      toggle("is-visible", false);
    };
    const onDown = () => {
      pressed = true;
      applyScale();
    };
    const onUp = () => {
      pressed = false;
      applyScale();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ref} className="cursor" aria-hidden="true">
        <div ref={discRef} className="cursor__disc">
          <span ref={labelRef} className="cursor__label" />
        </div>
      </div>
      <div ref={spotRef} className="cursor-spot" aria-hidden="true">
        <div ref={spotDiscRef} className="cursor-spot__disc" />
      </div>
    </>
  );
}
