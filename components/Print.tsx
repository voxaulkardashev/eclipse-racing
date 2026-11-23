import Link from "next/link";
import { pageFor, site } from "@/lib/site";

/** Race-number roundel, as painted on a car. */
export function Roundel({ no, size = "md" }: { no: string; size?: "md" | "lg" }) {
  return (
    <span className={`roundel roundel--${size}`} aria-label={`Number ${no}`}>
      {no}
    </span>
  );
}

/** The thick-and-thin rule printers put under a title. */
export function DoubleRule() {
  return <hr className="double-rule" />;
}

/** Running head, title and page-number tab at the top of each inner page. */
export function PageHead({ href, title, children }: { href: string; title: React.ReactNode; children?: React.ReactNode }) {
  const info = pageFor(href);
  return (
    <header className="page-head container">
      <div className="running-head">
        <span>Eclipse Racing · Official programme</span>
        <span>{info?.section}</span>
      </div>
      <div className="page-head__title">
        <h1 className="display page-head__h1" data-reveal="ink">
          {title}
        </h1>
        {info && (
          <span className="folio-tab" data-ink="spot" aria-label={`Page ${info.folio}`}>
            {info.folio}
          </span>
        )}
      </div>
      <DoubleRule />
      {children && <div className="page-head__lede">{children}</div>}
    </header>
  );
}

/** Section heading on a page, with an optional link to the page that holds the full version. */
export function SpreadHead({ title, to, id }: { title: string; to?: string; id?: string }) {
  const info = to ? pageFor(to) : undefined;
  return (
    <div className="spread-head">
      <h2 id={id} className="display spread-head__h2" data-reveal="ink">
        {title}
      </h2>
      {to && info && (
        <Link href={to} className="spread-head__link">
          {info.section}, page {info.folio}
        </Link>
      )}
    </div>
  );
}

export function SocialLinks() {
  return (
    <ul className="inline-list">
      {site.socials.map((s) => (
        <li key={s.label}>
          <a href={s.href}>{s.label}</a>
        </li>
      ))}
    </ul>
  );
}
