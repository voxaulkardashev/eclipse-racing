"use client";

import { useEffect, useRef } from "react";

/**
 * The cursor is an inverting lens in the logo's yellow, drawn above everything.
 *
 * Two copies of a yellow disc sit on top of each other: the first blends with "darken", the
 * second with "difference". Together they compute, per pixel, yellow minus whatever is beneath:
 *   white or grey paper -> black      black text and lines -> yellow
 *   black areas         -> yellow     white text, the white car on black -> black
 *   yellow              -> black
 * So every surface flips, with no knowledge of the page needed, and text under the cursor stays
 * readable in the opposite colour.
 *
 * States: a small dot; a larger lens over links; over data-cursor="Label" elements a third,
 * normal layer (black disc with the label in yellow) covers the lens.
 *
 * Position and size are eased every frame, so entering, leaving and switching states glide and
 * can be interrupted midway. Shown whenever a mouse or trackpad is present; the easing runs for
 * everyone (see lib/motion.ts).
 */

// How quickly position and size catch up each frame (0..1). Lower is smoother and lazier.
const FOLLOW = 0.16;
const GROW = 0.14;

// Disc size per state, as a scale of its 56px base.
const SIZE = { dot: 0.25, link: 0.85, label: 1.3 };
const PRESSED = 0.8;

// Each layer is an 80px box centred on the pointer (big enough for the largest disc).
const HALF = 40;

const LAYERS = ["darken", "difference", "label"] as const;

export default function Cursor() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layers = refs.current;
    const label = labelRef.current;
    if (layers.length !== LAYERS.length || layers.some((l) => !l) || !label) return;
    const discs = layers.map((l) => l!.firstElementChild as HTMLElement);

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

    const settle = (a: number, b: number, eps: number) => Math.abs(a - b) < eps;

    const draw = () => {
      const t = `translate3d(${pos.x - HALF}px, ${pos.y - HALF}px, 0)`;
      const s = `scale(${pos.scale})`;
      for (let i = 0; i < layers.length; i++) {
        layers[i]!.style.transform = t;
        discs[i].style.transform = s;
      }
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
      for (const l of layers) l!.classList.toggle(name, on);
    };

    const setState = (node: Element | null) => {
      const field = node?.closest("input, textarea, select, [contenteditable='true']");
      const labelled = node?.closest<HTMLElement>("[data-cursor]");
      const link = node?.closest("a, button, label[for], summary");

      const next: keyof typeof SIZE = labelled ? "label" : link ? "link" : "dot";
      toggle("is-hidden", Boolean(field));
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

    // Scrolling moves content under a still pointer: re-check what it is over.
    const onScroll = () => {
      if (visible) setState(document.elementFromPoint(target.x, target.y));
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

  // Each layer must be a top-level fixed element: a blend mode only mixes with the page when the
  // element is not nested inside another stacking context.
  return (
    <>
      {LAYERS.map((kind, i) => (
        <div
          key={kind}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={`cursor-layer cursor-layer--${kind}`}
          aria-hidden="true"
        >
          <div className="cursor-layer__disc">
            {kind === "label" && <span ref={labelRef} className="cursor-layer__label" />}
          </div>
        </div>
      ))}
    </>
  );
}
