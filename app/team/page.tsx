import type { Metadata } from "next";
import { Photo, Ph } from "@/components/Placeholder";
import { PageHead, Roundel, SpreadHead } from "@/components/Print";
import { team } from "@/lib/site";

export const metadata: Metadata = { title: "Team" };

const support = ["Teacher", "Industry mentor", "School", "Workshop partner"];

export default function TeamPage() {
  return (
    <>
      <PageHead href="/team/" title="Team">
        <Ph>[Where the team is from, how you formed and what you want to achieve this season.]</Ph>
      </PageHead>

      <section className="container" aria-label="Team members">
        <ol className="entries" data-reveal="rows">
          {team.map((m) => (
            <li className="entry-card" key={m.no}>
              <Roundel no={m.no} size="lg" />
              <Photo caption={`Portrait, ${m.role}`} ratio="4 / 5" />
              <div className="entry-card__body">
                <h2 className="entry-card__name">
                  <Ph>[Name]</Ph>
                </h2>
                <p className="entry-card__role">{m.role}</p>
                <p className="prose">
                  <Ph>[Two sentences: what this person does on the team and what they enjoy about it.]</Ph>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="spread container" aria-labelledby="h-work">
        <SpreadHead id="h-work" title="How we work" />
        <div className="cols">
          <div className="span-5">
            <p className="lede">
              <Ph>[How the team splits the work, when you meet and how decisions get made.]</Ph>
            </p>
          </div>
          <div className="span-7">
            <Photo caption="The team at work in the workshop" ratio="16 / 10" />
          </div>
        </div>
      </section>

      <section className="spread container" aria-labelledby="h-support">
        <SpreadHead id="h-support" title="Pit crew" />
        <table className="ledger">
          <tbody data-reveal="rows">
            {support.map((s) => (
              <tr key={s}>
                <th scope="row">{s}</th>
                <td>
                  <Ph>[Name]</Ph>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
