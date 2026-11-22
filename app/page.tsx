import Link from "next/link";
import Logo from "@/components/Logo";
import { ImageBox, Lines, Ph } from "@/components/Placeholder";
import { site, team } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <span className="badge">
              <span className="badge__dot" /> {site.competition}
            </span>
            <h1 className="hero__title">
              Eclipse <span>Racing</span>
            </h1>
            <p className="hero__lede">
              <Ph>Mission statement: one or two sentences on who the team is and what you&apos;re racing for.</Ph>
            </p>
            <div className="btn-row">
              <Link href="/team/" className="btn btn--primary">
                Meet the team
              </Link>
              <Link href="/sponsors/" className="btn btn--ghost">
                Partner with us
              </Link>
            </div>
          </div>
          <div className="hero__visual">
            <Logo className="hero__mark" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats" aria-label="Team at a glance">
        <div className="container stats__grid">
          <div className="stat">
            <span className="stat__value">Pro</span>
            <span className="stat__label">Class</span>
          </div>
          <div className="stat">
            <span className="stat__value">{team.length}</span>
            <span className="stat__label">Team members</span>
          </div>
          <div className="stat">
            <span className="stat__value ph-text">0.000s</span>
            <span className="stat__label">Best track time</span>
          </div>
          <div className="stat">
            <span className="stat__value ph-text">[Region]</span>
            <span className="stat__label">Next event</span>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="h2">Engineering speed from the ground up</h2>
            <Lines count={4} label="About the team" />
            <Lines count={3} />
            <Link href="/team/" className="text-link">
              Our story
            </Link>
          </div>
          <ImageBox label="Team photo" ratio="4 / 3" />
        </div>
      </section>

      {/* The car */}
      <section className="section section--raised">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">The car</p>
              <h2 className="h2">
                <Ph>[Car name]</Ph>
              </h2>
            </div>
            <Link href="/car/" className="text-link">
              Explore the design
            </Link>
          </div>
          <ImageBox label="Hero car render (21:9)" ratio="21 / 9" />
          <div className="grid grid--3" style={{ marginTop: 28 }}>
            {["Design", "Analysis", "Manufacture"].map((step, i) => (
              <div className="feature" key={step}>
                <span className="feature__num">{i + 1}</span>
                <h3>{step}</h3>
                <Lines count={2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">The team</p>
              <h2 className="h2">The people behind the car</h2>
            </div>
            <Link href="/team/" className="text-link">
              Meet everyone
            </Link>
          </div>
          <div className="grid grid--3">
            {team.slice(0, 3).map((m) => (
              <div className="card member" key={m.role}>
                <ImageBox label="Portrait" ratio="1 / 1" />
                <div className="card__body">
                  <p className="member__role">{m.role}</p>
                  <Ph>[First name]</Ph>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors strip */}
      <section className="section section--raised">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Our partners</p>
              <h2 className="h2">Powered by our sponsors</h2>
            </div>
            <Link href="/sponsors/" className="text-link">
              Become a partner
            </Link>
          </div>
          <div className="marquee">
            {Array.from({ length: 5 }, (_, i) => (
              <ImageBox key={i} label="Logo" ratio="3 / 2" />
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Latest</p>
              <h2 className="h2">News from the garage</h2>
            </div>
            <Link href="/news/" className="text-link">
              All news
            </Link>
          </div>
          <div className="grid grid--3">
            {[1, 2, 3].map((n) => (
              <Link href="/news/" className="card" key={n}>
                <ImageBox label="Post image" ratio="16 / 10" />
                <div className="card__body">
                  <p className="card__meta">
                    <Ph>[Date]</Ph>
                  </p>
                  <h3 className="card__title">
                    <Ph>[Post title]</Ph>
                  </h3>
                  <Lines count={2} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container">
        <div className="cta">
          <p className="eyebrow">Partner with Eclipse</p>
          <h2 className="h2">Help us race to the World Finals</h2>
          <p className="muted">
            <Ph>Short pitch to sponsors: what support means to the team and what partners get in return.</Ph>
          </p>
          <div className="btn-row">
            <Link href="/sponsors/" className="btn btn--primary">
              View sponsorship packages
            </Link>
            <Link href="/contact/" className="btn btn--ghost">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
