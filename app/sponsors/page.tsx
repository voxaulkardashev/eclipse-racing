import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ImageBox, Lines, Ph } from "@/components/Placeholder";
import { sponsorTiers } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsors" };

const packages = [
  { name: "Silver", perks: 3 },
  { name: "Gold", perks: 4, featured: true },
  { name: "Title Partner", perks: 5 },
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero eyebrow="Sponsors" title="Our partners">
        <Ph>Thank-you message to sponsors and a line on why partnerships matter to the team.</Ph>
      </PageHero>

      <section className="section">
        <div className="container">
          {sponsorTiers.map((tier) => (
            <div className="tier" key={tier.name}>
              <h2 className="tier__name">{tier.name}</h2>
              <div className={`logo-row logo-row--${tier.size}`}>
                {Array.from({ length: tier.slots }, (_, i) => (
                  <ImageBox
                    key={i}
                    label={tier.size === "sm" ? "Logo" : "Sponsor logo"}
                    ratio={tier.size === "xl" ? "4 / 1" : tier.size === "sm" ? "3 / 2" : "5 / 2"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--raised">
        <div className="container">
          <div className="section__head">
            <div className="section__intro">
              <p className="eyebrow">Why sponsor us</p>
              <h2 className="h2">Back the next generation of engineers</h2>
            </div>
          </div>
          <div className="grid grid--3">
            {["Brand visibility", "STEM outreach", "Talent pipeline"].map((t, i) => (
              <div className="feature" key={t}>
                <span className="feature__num">{i + 1}</span>
                <h3>{t}</h3>
                <Lines count={3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Packages</p>
              <h2 className="h2">Sponsorship tiers</h2>
            </div>
          </div>
          <div className="grid grid--3">
            {packages.map((p) => (
              <div className={`package ${p.featured ? "package--featured" : ""}`} key={p.name}>
                <p className="card__meta">{p.featured ? "Most popular" : " "}</p>
                <h3>{p.name}</h3>
                <p className="h2" style={{ fontSize: "2rem", margin: "4px 0 8px" }}>
                  <Ph>£—</Ph>
                </p>
                <ul>
                  {Array.from({ length: p.perks }, (_, i) => (
                    <li key={i}>
                      <Ph>[Benefit {i + 1}]</Ph>
                    </li>
                  ))}
                </ul>
                <Link href="/contact/" className={`btn ${p.featured ? "btn--primary" : "btn--ghost"}`}>
                  Enquire
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="cta">
          <p className="eyebrow">Sponsor pack</p>
          <h2 className="h2">Download our sponsorship proposal</h2>
          <p className="muted">
            <Ph>Link to the PDF sponsor pack goes here.</Ph>
          </p>
          <div className="btn-row">
            <button className="btn btn--primary" disabled>
              Download PDF
            </button>
            <Link href="/contact/" className="btn btn--ghost">
              Talk to our Enterprise Manager
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
