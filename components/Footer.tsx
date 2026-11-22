import Link from "next/link";
import Logo from "./Logo";
import { nav, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Logo className="site-footer__mark" />
          <p className="muted">{site.competition}</p>
          <p className="muted small">{site.season}</p>
        </div>

        <div>
          <h2 className="eyebrow">Explore</h2>
          <ul className="link-list">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">Follow</h2>
          <ul className="link-list">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow">Contact</h2>
          <p className="ph-text">{site.email}</p>
        </div>
      </div>
      <div className="container site-footer__legal">
        <span>© {new Date().getFullYear()} Eclipse Racing. All rights reserved.</span>
        <span className="muted">STEM Racing team website</span>
      </div>
    </footer>
  );
}
