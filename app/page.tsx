import Logo from "@/components/Logo";
import { ImageBox, Ph } from "@/components/Placeholder";
import Section from "@/components/Section";
import { posts, site, team } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="container intro">
        <div>
          <h1>Eclipse Racing</h1>
          <p className="lede muted">
            {site.competition}. <Ph>[Mission statement: one or two sentences on who the team is and what you are racing for.]</Ph>
          </p>
        </div>
        <Logo className="intro__logo" />
      </section>

      <Section title="About" more={{ href: "/team/", label: "About the team" }}>
        <div className="cols cols--2">
          <div className="prose">
            <p>
              <Ph>[Two or three sentences about the team: school, how you formed, what you are aiming for this season.]</Ph>
            </p>
          </div>
          <ImageBox label="Team photo" ratio="4 / 3" />
        </div>
      </Section>

      <Section title="Car" more={{ href: "/car/", label: "Car details" }}>
        <div className="stack">
          <ImageBox label="Car render" ratio="21 / 9" />
          <div className="cols cols--2">
            <h3>
              <Ph>[Car name]</Ph>
            </h3>
            <p className="muted">
              <Ph>[One or two sentences on the car&apos;s design idea.]</Ph>
            </p>
          </div>
        </div>
      </Section>

      <Section title="Team" more={{ href: "/team/", label: "All team members" }}>
        <div className="people people--compact">
          {team.map((m) => (
            <div key={m.role}>
              <ImageBox label="Portrait" ratio="4 / 5" />
              <p className="person__name">
                <Ph>[Name]</Ph>
              </p>
              <p className="person__role">{m.role}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sponsors" more={{ href: "/sponsors/", label: "Sponsor the team" }}>
        <div className="cols cols--logos">
          {Array.from({ length: 5 }, (_, i) => (
            <ImageBox key={i} label="Logo" ratio="3 / 2" />
          ))}
        </div>
      </Section>

      <Section title="News" more={{ href: "/news/", label: "All news" }}>
        <ul className="rows">
          {posts.slice(0, 3).map((p) => (
            <li key={p.title}>
              <span className="rows__key mono">
                <Ph>{p.date}</Ph>
              </span>
              <span>
                <Ph>{p.title}</Ph>
              </span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
