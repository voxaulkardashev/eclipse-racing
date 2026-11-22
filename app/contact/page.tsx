import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Ph } from "@/components/Placeholder";
import Section from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact">For sponsorship, press or school visits.</PageHero>

      <Section title="Details">
        <ul className="rows">
          <li>
            <span className="rows__key">General</span>
            <Ph>{site.email}</Ph>
          </li>
          <li>
            <span className="rows__key">Sponsorship</span>
            <Ph>[sponsors]@eclipseracing.co.uk</Ph>
          </li>
          <li>
            <span className="rows__key">Based at</span>
            <Ph>[School, town]</Ph>
          </li>
          <li>
            <span className="rows__key">Social</span>
            <span>
              {site.socials.map((s, i) => (
                <span key={s.label}>
                  {i > 0 && ", "}
                  <a href={s.href}>{s.label}</a>
                </span>
              ))}
            </span>
          </li>
        </ul>
      </Section>

      <Section title="Message">
        <form className="form" aria-describedby="form-status">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" />
          </div>
          <div className="field">
            <label htmlFor="topic">Topic</label>
            <select id="topic" name="topic" defaultValue="Sponsorship">
              <option>Sponsorship</option>
              <option>Press</option>
              <option>School visit</option>
              <option>Other</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" />
          </div>
          <p id="form-status" className="muted" style={{ fontSize: "0.9375rem" }}>
            This form is not connected yet.
          </p>
          <button type="submit" className="button" disabled>
            Send
          </button>
        </form>
      </Section>
    </>
  );
}
