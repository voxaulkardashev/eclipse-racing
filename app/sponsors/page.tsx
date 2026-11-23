import type { Metadata } from "next";
import Link from "next/link";
import { Ph } from "@/components/Placeholder";
import { PageHead, SpreadHead } from "@/components/Print";
import { adTiers, site } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsors" };

export default function SponsorsPage() {
  return (
    <>
      <PageHead href="/sponsors/" title="Sponsors">
        Every advert in this programme pays for part of the season: materials, machining, travel and entry fees.
        Empty spaces are still available.
      </PageHead>

      <section className="container" aria-label="Sponsor adverts">
        <div className="ads">
          {adTiers.flatMap((t) =>
            Array.from({ length: t.slots }, (_, i) => (
              <div className={`ad ad--${t.span}`} data-ink={t.span === "full" ? "spot" : undefined} key={`${t.level}-${i}`}>
                <span className="ad__meta">{t.size}</span>
                <span className="ad__title">{t.span === "eighth" ? "Available" : "This space is available"}</span>
                <span className="ad__meta">{t.level}</span>
              </div>
            )),
          )}
        </div>
      </section>

      <section className="spread container" aria-labelledby="h-rates">
        <SpreadHead id="h-rates" title="Advertising rates" />
        <div className="cols">
          <div className="span-4">
            <p className="lede">
              <Ph>[Why a company should back the team: who sees their name, the school outreach you do, and the engineers of the future they meet.]</Ph>
            </p>
          </div>
          <div className="span-8 table-scroll">
            <table className="ledger">
              <thead>
                <tr>
                  <th scope="col">Level</th>
                  <th scope="col">Advert</th>
                  <th scope="col">Contribution</th>
                  <th scope="col">Includes</th>
                </tr>
              </thead>
              <tbody data-reveal="rows">
                {adTiers.map((t) => (
                  <tr key={t.level}>
                    <th scope="row">{t.level}</th>
                    <td>{t.size}</td>
                    <td>
                      <Ph>[£]</Ph>
                    </td>
                    <td>
                      <Ph>[What this level gets, e.g. logo on the car or team kit]</Ph>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ marginTop: 24 }}>
              <Ph>[Sponsor pack (PDF)]</Ph> · Write to <Ph>{site.sponsorEmail}</Ph> or use the{" "}
              <Link href="/contact/">contact form</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
