"use client";

import { useEffect, useRef } from "react";

/**
 * A yellow ink-dot cursor that trails the pointer with easing.
 * Over links it opens into a highlighter disc (multiply blend, so the text under it stays legible);
 * over elements with data-cursor="Label" it becomes an ink disc showing that label.
 * Shown whenever a mouse or trackpad is present (including touchscreen laptops, whose primary
 * pointer reports as touch). With reduced motion it follows the pointer instantly instead of trailing.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label) return;

    // any-*: a touchscreen laptop's primary pointer is touch, but its mouse still counts.
    const fine = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    if (!fine.matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    document.documentElement.classList.add("has-cursor");

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;
    let visible = false;

    const tick = () => {
      // Ease towards the pointer (a higher factor feels tighter); no trailing with reduced motion.
      const ease = reduced.matches ? 1 : 0.2;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const setState = (node: Element | null) => {
      const field = node?.closest("input, textarea, select, [contenteditable='true']");
      const labelled = node?.closest<HTMLElement>("[data-cursor]");
      const link = node?.closest("a, button, label[for], summary");
      const dark = node?.closest("[data-theme='dark']");

      el.classList.toggle("is-hidden", Boolean(field));
      el.classList.toggle("is-dark", Boolean(dark));
      el.classList.toggle("is-label", Boolean(labelled));
      el.classList.toggle("is-link", Boolean(link) && !labelled);
      label.textContent = labelled?.dataset.cursor ?? "";
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
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      visible = false;
      el.classList.remove("is-visible");
    };
    const onDown = () => el.classList.add("is-down");
    const onUp = () => el.classList.remove("is-down");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor__disc">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </div>
  );
}
