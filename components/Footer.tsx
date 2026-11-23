import Link from "next/link";
import Logo from "./Logo";
import { Ph } from "./Placeholder";
import { SocialLinks } from "./Print";
import { pages, site } from "@/lib/site";

/** The programme's back cover. */
export default function Footer() {
  return (
    <footer className="back-cover" data-theme="dark">
      <div className="container back-cover__grid">
        <div className="back-cover__mark">
          <Logo />
        </div>

        <div>
          <h2 className="back-cover__h">Follow the season</h2>
          <SocialLinks />
          <p className="back-cover__email">
            <Ph>{site.email}</Ph>
          </p>
        </div>

        <nav aria-label="Pages">
          <h2 className="back-cover__h">Contents</h2>
          <ol className="contents contents--small">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>
                  <span className="contents__label">{p.label}</span>
                  <span className="contents__leader" aria-hidden="true" />
                  <span className="contents__folio">{p.folio}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <div className="container back-cover__imprint">
        <span>
          Published by Eclipse Racing, <Ph>{site.base}</Ph>. {site.competition}. Season <Ph>{site.season}</Ph>.
        </span>
        <span>© {new Date().getFullYear()} Eclipse Racing</span>
      </div>
    </footer>
  );
}
