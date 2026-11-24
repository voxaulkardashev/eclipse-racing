"use client";

import { useEffect, useRef } from "react";

/**
 * A yellow ink-dot cursor that trails the pointer, drawn above everything, whose colour adapts
 * per pixel to the ground beneath it.
 *
 * Every frame the cursor's 80px box is split into three non-overlapping regions, and one layer
 * is drawn into each (clipped with a path() of rectangles):
 *   - paper: a yellow dot with a thin black ring; over links an open highlighter (multiply, so
 *     link text stays legible); over data-cursor="Label" elements an ink disc with the label.
 *   - black ([data-theme="dark"]: masthead, cover, footer, menu, loading screen): a yellow disc
 *     in difference blend, so it is yellow over black and black over anything yellow there (the
 *     logo, page numbers, underlines); over links it becomes a yellow ring.
 *   - yellow ([data-ink="spot"], a paper link's yellow hover highlight, the page-turn sheet while
 *     it moves): the same difference disc, so yellow turns black and black text turns yellow.
 * Regions are resolved in stacking order (masthead and overlays first, then yellow, then black,
 * then paper), so a cursor straddling any edge is split exactly along it.
 *
 * Position and size are eased every frame, so entering, leaving and switching states glide and
 * can be interrupted midway. Colours and the label cross-fade in CSS. Shown whenever a mouse or
 * trackpad is present; the easing runs for everyone, reduce-motion included (team request).
 */

// How quickly position and size catch up each frame (0..1). Lower is smoother and lazier.
const FOLLOW = 0.16;
const GROW = 0.14;

// Disc size per state, as a scale of its 56px base.
const SIZE = { dot: 0.25, link: 0.85, label: 1.3 };
const PRESSED = 0.8;

// Each layer is an 80px box centred on the pointer (big enough for the largest disc).
const BOX = 80;
const HALF = BOX / 2;

// Grounds, by stacking order. TOP sits above page content (sticky masthead, open menu, loader).
const TOP = ".masthead, .contents-panel.is-open, html.intro .loader";
const DARK = "[data-theme='dark']";
const SPOT = "[data-ink='spot']:not(.page-turn)";

type Rect = [number, number, number, number]; // x0, y0, x1, y1 in box coordinates

const intersect = (a: Rect, b: Rect): Rect | null => {
  const r: Rect = [Math.max(a[0], b[0]), Math.max(a[1], b[1]), Math.min(a[2], b[2]), Math.min(a[3], b[3])];
  return r[2] > r[0] && r[3] > r[1] ? r : null;
};

// a minus b, as up to four rectangles.
const subtract = (a: Rect, b: Rect): Rect[] => {
  const hit = intersect(a, b);
  if (!hit) return [a];
  const out: Rect[] = [];
  if (hit[1] > a[1]) out.push([a[0], a[1], a[2], hit[1]]);
  if (hit[3] < a[3]) out.push([a[0], hit[3], a[2], a[3]]);
  if (hit[0] > a[0]) out.push([a[0], hit[1], hit[0], hit[3]]);
  if (hit[2] < a[2]) out.push([hit[2], hit[1], a[2], hit[3]]);
  return out;
};

// Claim the parts of `free` covered by `rects`; returns [claimed, still free]. Disjoint by construction.
const claim = (free: Rect[], rects: Rect[]): [Rect[], Rect[]] => {
  const got: Rect[] = [];
  for (const r of rects) {
    for (const f of free) {
      const hit = intersect(f, r);
      if (hit) got.push(hit);
    }
    free = free.flatMap((f) => subtract(f, r));
  }
  return [got, free];
};

const toPath = (rects: Rect[]) =>
  rects.length ? `path('${rects.map(([a, b, c, d]) => `M${a} ${b}H${c}V${d}H${a}Z`).join("")}')` : "inset(50%)";

// The visible part of the page-turn sheet while it animates (its clip-path is an inset()).
const sheetRect = (): DOMRect | null => {
  const sheet = document.querySelector<HTMLElement>(".page-turn");
  if (!sheet || !sheet.getAnimations().length) return null;
  const m = getComputedStyle(sheet).clipPath.match(/inset\(([^)]+)\)/);
  if (!m) return null;
  const W = innerWidth;
  const H = innerHeight;
  const v = m[1].trim().split(/\s+/);
  const [t, r, b, l] = [v[0], v[1] ?? v[0], v[2] ?? v[0], v[3] ?? v[1] ?? v[0]].map((s, i) =>
    s.endsWith("%") ? (parseFloat(s) / 100) * (i % 2 ? W : H) : parseFloat(s) || 0,
  );
  return new DOMRect(l, t, W - l - r, H - t - b);
};

export default function Cursor() {
  const paperRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const layers = [paperRef.current, darkRef.current, spotRef.current];
    if (layers.some((l) => !l)) return;
    const [paper, dark, spot] = layers as HTMLDivElement[];
    const discs = layers.map((l) => l!.firstElementChild as HTMLElement);
    const labels = labelRefs.current;

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
    let yellowLink: Element | null = null; // a paper link showing its yellow hover highlight
    const lastClip = ["", "", ""];

    const settle = (a: number, b: number, eps: number) => Math.abs(a - b) < eps;

    const inBox = (r: DOMRect, ox: number, oy: number): Rect | null =>
      r.width && r.height ? intersect([r.left - ox, r.top - oy, r.right - ox, r.bottom - oy], [0, 0, BOX, BOX]) : null;

    const rectsOf = (els: Iterable<Element>, ox: number, oy: number) => {
      const out: Rect[] = [];
      for (const el of els) {
        const r = inBox(el.getBoundingClientRect(), ox, oy);
        if (r) out.push(r);
      }
      return out;
    };

    // Split the cursor's box into paper / black / yellow regions and clip each layer to its own.
    const partition = () => {
      const ox = pos.x - HALF;
      const oy = pos.y - HALF;
      const tops = Array.from(document.querySelectorAll(TOP));
      const darks = Array.from(document.querySelectorAll(DARK)).filter((el) => !el.matches(TOP));
      const spotRects = rectsOf(document.querySelectorAll(SPOT), ox, oy);
      if (yellowLink?.isConnected) {
        // A link's painted highlight can sit a fraction of a pixel inside its measured box; pull the
        // box in by a pixel so no sliver of paper gets inverted along its edge.
        const r = yellowLink.getBoundingClientRect();
        const inner = inBox(new DOMRect(r.left + 1, r.top + 1, r.width - 2, r.height - 2), ox, oy);
        if (inner) spotRects.push(inner);
      }

      const sheet = sheetRect();
      const sheetBox = sheet ? inBox(sheet, ox, oy) : null;

      let free: Rect[] = [[0, 0, BOX, BOX]];
      let yellowTop: Rect[] = [];
      if (sheetBox) [yellowTop, free] = claim(free, [sheetBox]);
      const [darkTop, f1] = claim(free, rectsOf(tops, ox, oy));
      const [yellow, f2] = claim(f1, spotRects);
      const [darkFlow, rest] = claim(f2, rectsOf(darks, ox, oy));

      const clips = [toPath(rest), toPath([...darkTop, ...darkFlow]), toPath([...yellowTop, ...yellow])];
      clips.forEach((c, i) => {
        if (c !== lastClip[i]) {
          layers[i]!.style.clipPath = c;
          lastClip[i] = c;
        }
      });
    };

    const draw = () => {
      const t = `translate3d(${pos.x - HALF}px, ${pos.y - HALF}px, 0)`;
      const s = `scale(${pos.scale})`;
      for (let i = 0; i < 3; i++) {
        layers[i]!.style.transform = t;
        discs[i].style.transform = s;
      }
      partition();
    };

    const tick = () => {
      pos.x += (target.x - pos.x) * FOLLOW;
      pos.y += (target.y - pos.y) * FOLLOW;
      pos.scale += (target.scale - pos.scale) * GROW;

      const done =
        settle(target.x, pos.x, 0.1) && settle(target.y, pos.y, 0.1) && settle(target.scale, pos.scale, 0.001);
      if (done) pos.scale = target.scale;
      draw();
      // Keep re-partitioning while the page-turn sheet moves under a still cursor.
      raf = done && !document.querySelector(".page-turn")?.getAnimations().length ? 0 : requestAnimationFrame(tick);
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

      // Paper links get a yellow highlight on hover (see globals.css), so treat them as yellow ground.
      yellowLink =
        link instanceof HTMLAnchorElement &&
        !link.classList.contains("button") &&
        !link.closest(`${DARK}, [data-ink='spot']`)
          ? link
          : null;

      const next: keyof typeof SIZE = labelled ? "label" : link ? "link" : "dot";
      toggle("is-hidden", Boolean(field));
      toggle("is-label", next === "label");
      toggle("is-link", next === "link");
      // Keep the old label text while it fades out, so it doesn't vanish mid-fade.
      if (labelled?.dataset.cursor) for (const l of labels) l.textContent = labelled.dataset.cursor;

      if (next !== state) {
        state = next;
        applyScale();
      }
      kick();
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

    // Scrolling moves content under a still pointer: re-check what it is over and re-split.
    const onScroll = () => {
      if (!visible) return;
      setState(document.elementFromPoint(target.x, target.y));
      partition();
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
    // Navigation (the page-turn) starts on click; follow it frame by frame.
    const onClick = () => kick();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("click", onClick, true);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  const layer = (ref: React.RefObject<HTMLDivElement | null>, ground: string, i: number) => (
    <div ref={ref} className={`cursor-layer cursor-layer--${ground}`} aria-hidden="true">
      <div className="cursor-layer__disc">
        <span
          ref={(el) => {
            if (el) labelRefs.current[i] = el;
          }}
          className="cursor-layer__label"
        />
      </div>
    </div>
  );

  return (
    <>
      {layer(paperRef, "paper", 0)}
      {layer(darkRef, "dark", 1)}
      {layer(spotRef, "spot", 2)}
    </>
  );
}
