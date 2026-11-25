import type { Metadata } from "next";
import { Photo, Ph, Val } from "@/components/Placeholder";
import { PageHead, SpreadHead } from "@/components/Print";
import { posts, rounds } from "@/lib/site";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHead href="/news/" title="News">
        The season round by round: results after each event, and news from the workshop in between.
      </PageHead>

      <section className="container" aria-labelledby="h-results">
        <SpreadHead id="h-results" title="Results" />
        <div className="table-scroll">
          <table className="ledger">
            <thead>
              <tr>
                <th scope="col">Round</th>
                <th scope="col">Event</th>
                <th scope="col">Venue</th>
                <th scope="col">Date</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody data-reveal="rows">
              {rounds.map((r) => (
                <tr key={r.round}>
                  <td className="num">{r.round}</td>
                  <th scope="row">
                    <Val>{r.event}</Val>
                  </th>
                  <td>
                    <Val>{r.venue}</Val>
                  </td>
                  <td>
                    <Val>{r.date}</Val>
                  </td>
                  <td>
                    <Val>{r.result}</Val>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="spread container" aria-labelledby="h-bulletins">
        <SpreadHead id="h-bulletins" title="Bulletins" />
        <ol className="bulletins" data-reveal="rows">
          {posts.map((p) => (
            <li className="bulletin" key={p.title}>
              <span className="bulletin__date">
                <Ph>{p.date}</Ph>
              </span>
              <div>
                <h2 className="bulletin__title">
                  <Ph>{p.title}</Ph>
                </h2>
                <p>
                  <Ph>{p.summary}</Ph>
                </p>
              </div>
              <Photo caption="Photo from the day" ratio="3 / 2" />
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
