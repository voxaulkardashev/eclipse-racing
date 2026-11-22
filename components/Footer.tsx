import { site } from "@/lib/site";
import { Ph } from "./Placeholder";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span>
          © {new Date().getFullYear()} Eclipse Racing. {site.competition}.
        </span>
        <ul>
          {site.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href}>{s.label}</a>
            </li>
          ))}
          <li>
            <Ph>{site.email}</Ph>
          </li>
        </ul>
      </div>
    </footer>
  );
}
