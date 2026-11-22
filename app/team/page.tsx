import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ImageBox, Lines, Ph } from "@/components/Placeholder";
import { team } from "@/lib/site";

export const metadata: Metadata = { title: "Team" };

export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow="The team" title="Meet the crew">
        <Ph>Introduction: where the team is from, how you formed and what drives you.</Ph>
      </PageHero>

      <section className="section">
        <div className="container grid grid--3">
          {team.map((m) => (
            <article className="card member" key={m.role}>
              <ImageBox label="Portrait" ratio="4 / 5" />
              <div className="card__body">
                <p className="card__meta">{m.role}</p>
                <h2 className="card__title">
                  <Ph>[First name]</Ph>
                </h2>
                <Lines count={3} label="Short bio" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--raised">
        <div className="container split">
          <ImageBox label="Team at work (workshop photo)" ratio="4 / 3" />
          <div>
            <p className="eyebrow">How we work</p>
            <h2 className="h2">One team, one goal</h2>
            <Lines count={4} label="Team values and way of working" />
            <Lines count={3} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Support network</p>
              <h2 className="h2">Mentors &amp; supporters</h2>
            </div>
          </div>
          <div className="grid grid--4">
            {["Teacher / mentor", "Industry mentor", "School", "Partner"].map((label) => (
              <div className="feature" key={label}>
                <p className="card__meta">{label}</p>
                <Ph>[Name]</Ph>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
