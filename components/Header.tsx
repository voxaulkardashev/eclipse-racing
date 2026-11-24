"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import ScrollProgress from "./motion/ScrollProgress";
import { pages } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll while the contents panel is open.
  useEffect(() => {
    document.documentElement.classList.toggle("contents-open", open);
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.replace(/\/$/, "")));
  const inner = pages.filter((p) => p.href !== "/");

  return (
    <header className="masthead" data-theme="dark">
      <div className="container masthead__inner">
        <Link href="/" className="masthead__logo" aria-label="Eclipse Racing, cover page">
          <Logo />
        </Link>

        <nav className="masthead__nav" aria-label="Main">
          <ul>
            {inner.map((p) => (
              <li key={p.href}>
                <Link href={p.href} aria-current={isActive(p.href) ? "page" : undefined}>
                  <span className="masthead__folio">{p.folio}</span>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="masthead__toggle"
          aria-expanded={open}
          aria-controls="contents-panel"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "Close" : "Contents"}
        </button>
      </div>

      <ScrollProgress />

      <div id="contents-panel" className={`contents-panel ${open ? "is-open" : ""}`} hidden={!open}>
        {/* The gutter lives on a wrapper: .contents resets padding, which would cancel .container's. */}
        <div className="container">
          <ol className="contents contents--panel">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} aria-current={isActive(p.href) ? "page" : undefined}>
                  <span className="contents__label">{p.label}</span>
                  <span className="contents__leader" aria-hidden="true" />
                  <span className="contents__folio">{p.folio}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </header>
  );
}
