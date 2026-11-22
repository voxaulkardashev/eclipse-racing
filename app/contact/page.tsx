import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Ph } from "@/components/Placeholder";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Get in touch">
        Sponsorship, press, school visits or just saying hello. We&apos;d love to hear from you.
      </PageHero>

      <section className="section">
        <div className="container split" style={{ alignItems: "start" }}>
          <form className="form card" style={{ padding: 28 }} aria-describedby="form-status">
            <div className="form__row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="org">Organisation (optional)</label>
              <input id="org" name="organisation" autoComplete="organization" />
            </div>
            <div className="field">
              <label htmlFor="topic">Topic</label>
              <select id="topic" name="topic" defaultValue="Sponsorship">
                <option>Sponsorship</option>
                <option>Press &amp; media</option>
                <option>School / outreach</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" />
            </div>
            <p id="form-status" className="notice">
              Mockup: this form isn&apos;t connected yet. It will send messages once a form service is set up.
            </p>
            <div>
              <button type="submit" className="btn btn--primary" disabled>
                Send message
              </button>
            </div>
          </form>

          <div>
            <p className="eyebrow">Direct</p>
            <h2 className="h2">Contact details</h2>
            <ul className="contact-list">
              <li>
                <span className="muted small">General enquiries</span>
                <Ph>{site.email}</Ph>
              </li>
              <li>
                <span className="muted small">Sponsorship</span>
                <Ph>[sponsors]@eclipseracing.co.uk</Ph>
              </li>
              <li>
                <span className="muted small">Based at</span>
                <Ph>[School / town]</Ph>
              </li>
              <li>
                <span className="muted small">Social</span>
                <span>
                  {site.socials.map((s, i) => (
                    <span key={s.label}>
                      {i > 0 && " · "}
                      <a href={s.href} className="text-link" style={{ fontWeight: 500 }}>
                        {s.label}
                      </a>
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
