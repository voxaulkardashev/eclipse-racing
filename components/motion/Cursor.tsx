"use client";

import { useEffect, useRef } from "react";

/**
 * A yellow ink-dot cursor that trails the pointer.
 * Over links it opens into a highlighter disc (multiply blend, so the text under it stays legible);
 * over elements with data-cursor="Label" it becomes an ink disc showing that label.
 *
 * Position and size are both eased every frame towards their targets, so entering, leaving and
 * switching states all glide and can be interrupted midway without a jump. Colour and label
 * changes cross-fade in CSS.
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

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const disc = discRef.current;
    const label = labelRef.current;
    if (!el || !disc || !label) return;

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

    const tick = () => {
      pos.x += (target.x - pos.x) * FOLLOW;
      pos.y += (target.y - pos.y) * FOLLOW;
      pos.scale += (target.scale - pos.scale) * GROW;

      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      disc.style.transform = `scale(${pos.scale})`;

      const done =
        settle(target.x, pos.x, 0.1) && settle(target.y, pos.y, 0.1) && settle(target.scale, pos.scale, 0.001);
      if (done) {
        pos.scale = target.scale;
        disc.style.transform = `scale(${pos.scale})`;
        raf = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const applyScale = () => {
      target.scale = SIZE[state] * (pressed ? PRESSED : 1);
      kick();
    };

    const setState = (node: Element | null) => {
      const field = node?.closest("input, textarea, select, [contenteditable='true']");
      const labelled = node?.closest<HTMLElement>("[data-cursor]");
      const link = node?.closest("a, button, label[for], summary");
      const dark = node?.closest("[data-theme='dark']");

      const next: keyof typeof SIZE = labelled ? "label" : link ? "link" : "dot";
      el.classList.toggle("is-hidden", Boolean(field));
      el.classList.toggle("is-dark", Boolean(dark));
      el.classList.toggle("is-label", next === "label");
      el.classList.toggle("is-link", next === "link");
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
        el.classList.add("is-visible");
      }
      setState(e.target as Element);
      kick();
    };

    // Scrolling moves content under a still pointer; re-check what it is over.
    const onScroll = () => {
      if (!visible) return;
      setState(document.elementFromPoint(target.x, target.y));
    };

    const onLeave = () => {
      visible = false;
      el.classList.remove("is-visible");
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
    <div ref={ref} className="cursor" aria-hidden="true">
      <div ref={discRef} className="cursor__disc">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </div>
  );
}
