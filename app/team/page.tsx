import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ImageBox, Ph } from "@/components/Placeholder";
import Section from "@/components/Section";
import { team } from "@/lib/site";

export const metadata: Metadata = { title: "Team" };

const supporters = ["Teacher", "Industry mentor", "School", "Partner"];

export default function TeamPage() {
  return (
    <>
      <PageHero title="Team">
        <Ph>[Introduction: where the team is from and how you formed.]</Ph>
      </PageHero>

      <Section title="Members">
        <div className="people">
          {team.map((m) => (
            <article key={m.role}>
              <ImageBox label="Portrait" ratio="4 / 5" />
              <h3 className="person__name">
                <Ph>[Name]</Ph>
              </h3>
              <p className="person__role">{m.role}</p>
              <p className="muted" style={{ marginTop: 8, fontSize: "0.9375rem" }}>
                <Ph>[Short bio, one or two sentences.]</Ph>
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="How we work">
        <div className="cols cols--2">
          <div className="prose">
            <p>
              <Ph>[How the team splits work, meets and makes decisions.]</Ph>
            </p>
          </div>
          <ImageBox label="Workshop photo" ratio="4 / 3" />
        </div>
      </Section>

      <Section title="Support">
        <ul className="rows">
          {supporters.map((s) => (
            <li key={s}>
              <span className="rows__key">{s}</span>
              <Ph>[Name]</Ph>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
