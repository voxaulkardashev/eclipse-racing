import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ImageBox, Lines, Ph } from "@/components/Placeholder";

export const metadata: Metadata = { title: "News" };

const categories = ["All", "Competitions", "Design", "Sponsors", "Outreach"];

export default function NewsPage() {
  return (
    <>
      <PageHero eyebrow="News" title="From the garage">
        <Ph>Updates on the team&apos;s journey through the season.</Ph>
      </PageHero>

      <section className="section">
        <div className="container">
          {/* Featured post */}
          <article className="card" style={{ marginBottom: 40 }}>
            <div className="split" style={{ gap: 32 }}>
              <ImageBox label="Featured post image" ratio="16 / 10" />
              <div className="card__body">
                <p className="card__meta">
                  Featured · <Ph>[Date]</Ph>
                </p>
                <h2 className="h2" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                  <Ph>[Featured post title]</Ph>
                </h2>
                <Lines count={4} />
                <span className="text-link">Read more</span>
              </div>
            </div>
          </article>

          <div className="chips" role="list" aria-label="Categories (coming soon)">
            {categories.map((c, i) => (
              <span role="listitem" key={c} className={`chip ${i === 0 ? "chip--active" : ""}`}>
                {c}
              </span>
            ))}
          </div>

          <div className="grid grid--3">
            {Array.from({ length: 6 }, (_, i) => (
              <article className="card" key={i}>
                <ImageBox label="Post image" ratio="16 / 10" />
                <div className="card__body">
                  <p className="card__meta">
                    <Ph>[Category · Date]</Ph>
                  </p>
                  <h3 className="card__title">
                    <Ph>[Post title]</Ph>
                  </h3>
                  <Lines count={2} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
