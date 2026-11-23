import Link from "next/link";
import Logo from "@/components/Logo";
import { Photo, Ph } from "@/components/Placeholder";
import { Roundel, SocialLinks, SpreadHead } from "@/components/Print";
import { adTiers, nextRound, pages, posts, rounds, site, team } from "@/lib/site";

export default function CoverPage() {
  return (
    <>
      {/* Cover */}
      <section className="cover" data-theme="dark" aria-labelledby="cover-title">
        <div className="container cover__frame">
          <div className="cover__strip">
            <span>Official programme</span>
            <span>
              Season <Ph>{site.season}</Ph>
            </span>
            <span>Free</span>
          </div>

          <div className="cover__body">
            <div>
              <Logo className="cover__logo" />
              <h1 id="cover-title" className="display cover__title">
                <span className="cover__line">
                  <span>Eclipse</span>
                </span>
                <span className="cover__line">
                  <span>Racing</span>
                </span>
              </h1>
              <p className="cover__sub">
                {site.competition}. <Ph>{site.base}</Ph>
              </p>
            </div>

            <div className="cover__side">
              <div className="next-round">
                <h2 className="display">Next round</h2>
                <dl>
                  <dt>Event</dt>
                  <dd>
                    <Ph>{nextRound.event}</Ph>
                  </dd>
                  <dt>Date</dt>
                  <dd>
                    <Ph>{nextRound.date}</Ph>
                  </dd>
                  <dt>Venue</dt>
                  <dd>
                    <Ph>{nextRound.venue}</Ph>
                  </dd>
                </dl>
                <Link href="/news/" className="button">
                  Latest results
                </Link>
              </div>

              <nav aria-label="In this programme">
                <h2 className="cover__contents-h">In this programme</h2>
                <ol className="contents cover__contents">
                  {pages
                    .filter((p) => p.href !== "/")
                    .map((p) => (
                      <li key={p.href}>
                        <Link href={p.href}>
                          <span className="contents__label">
                            {p.section} · {p.label}
                          </span>
                          <span className="contents__leader" aria-hidden="true" />
                          <span className="contents__folio">{p.folio}</span>
                        </Link>
                      </li>
                    ))}
                </ol>
              </nav>
            </div>
          </div>

          <div className="cover__foot">
            <span>Follow the season</span>
            <SocialLinks />
          </div>
        </div>
      </section>

      {/* Entry list */}
      <section className="spread container" aria-labelledby="h-entry">
        <SpreadHead id="h-entry" title="Entry list" to="/team/" />
        <div className="cols">
          <div className="span-8">
            <ol className="entries" data-reveal="rows">
              {team.map((m) => (
                <li className="entry" key={m.no}>
                  <Roundel no={m.no} />
                  <Photo caption={`Portrait, ${m.role}`} ratio="1 / 1" />
                  <span className="entry__name">
                    <Ph>[Name]</Ph>
                  </span>
                  <span className="entry__role">{m.role}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="span-4">
            <p className="lede">
              <Ph>[Who the team is in two or three sentences: school, year group, how you came together, what you are aiming for this season.]</Ph>
            </p>
            <Photo caption="The whole team together" ratio="4 / 5" />
          </div>
        </div>
      </section>

      {/* Technical */}
      <section className="spread container" aria-labelledby="h-tech">
        <SpreadHead id="h-tech" title="Technical" to="/car/" />
        <Photo caption="The car, side profile" ratio="21 / 9" cursor="View" />
        <div className="cols" style={{ marginTop: 32 }}>
          <div className="span-5">
            <h3 className="display" style={{ fontSize: "2.5rem" }}>
              <Ph>[Car name]</Ph>
            </h3>
          </div>
          <div className="span-7">
            <p className="lede">
              <Ph>[The design idea behind the car in one or two sentences.]</Ph>
            </p>
          </div>
        </div>
      </section>

      {/* Timetable */}
      <section className="band" aria-labelledby="h-timetable">
        <div className="container">
          <SpreadHead id="h-timetable" title="Timetable" to="/news/" />
          <div className="table-scroll">
            <table className="ledger">
              <thead>
                <tr>
                  <th scope="col">Round</th>
                  <th scope="col">Event</th>
                  <th scope="col">Venue</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody data-reveal="rows">
                {rounds.map((r) => (
                  <tr key={r.round}>
                    <td className="num">{r.round}</td>
                    <th scope="row">
                      <Ph>{r.event}</Ph>
                    </th>
                    <td>
                      <Ph>{r.venue}</Ph>
                    </td>
                    <td>
                      <Ph>{r.date}</Ph>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Results and news */}
      <section className="spread container" aria-labelledby="h-news">
        <SpreadHead id="h-news" title="Results and news" to="/news/" />
        <ol className="bulletins" data-reveal="rows">
          {posts.slice(0, 3).map((p) => (
            <li className="bulletin bulletin--compact" key={p.title}>
              <span className="bulletin__date">
                <Ph>{p.date}</Ph>
              </span>
              <div>
                <h3 className="bulletin__title">
                  <Ph>{p.title}</Ph>
                </h3>
                <p>
                  <Ph>{p.summary}</Ph>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Our partners */}
      <section className="spread container" aria-labelledby="h-partners">
        <SpreadHead id="h-partners" title="Our partners" to="/sponsors/" />
        <div className="ads">
          {adTiers.slice(0, 2).flatMap((t) =>
            Array.from({ length: t.slots }, (_, i) => (
              <div className={`ad ad--${t.span}`} key={`${t.level}-${i}`}>
                <span className="ad__meta">
                  {t.level} · {t.size}
                </span>
                <span className="ad__title">This space is available</span>
                <Link href="/sponsors/" className="ad__meta">
                  Advertising rates
                </Link>
              </div>
            )),
          )}
        </div>
      </section>
    </>
  );
}
