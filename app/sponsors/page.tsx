import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { ImageBox, Ph } from "@/components/Placeholder";
import Section from "@/components/Section";
import { sponsorTiers } from "@/lib/site";

export const metadata: Metadata = { title: "Sponsors" };

const packages = [
  ["Title partner", "[£]", "[What a title partner gets, e.g. logo on car and team kit.]"],
  ["Gold", "[£]", "[What gold sponsors get.]"],
  ["Silver", "[£]", "[What silver sponsors get.]"],
  ["Supporter", "[£ / in kind]", "[Materials, tools, services or mentoring.]"],
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero title="Sponsors">
        <Ph>[Thank you to current sponsors, and a line on what their support pays for.]</Ph>
      </PageHero>

      <Section title="Current sponsors">
        {sponsorTiers.map((tier) => (
          <div className="tier" key={tier.name}>
            <h3 className="muted">{tier.name}</h3>
            <div className={`logos logos--${tier.slots}`}>
              {Array.from({ length: tier.slots }, (_, i) => (
                <ImageBox key={i} label="Logo" ratio={tier.slots >= 6 ? "3 / 2" : "5 / 2"} />
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Sponsorship">
        <div className="prose" style={{ marginBottom: 32 }}>
          <p>
            <Ph>[Why a company should support the team: visibility, outreach, links with future engineers.]</Ph>
          </p>
        </div>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Level</th>
                <th scope="col">Contribution</th>
                <th scope="col">Includes</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(([level, amount, includes]) => (
                <tr key={level}>
                  <th scope="row" style={{ color: "var(--text)" }}>
                    {level}
                  </th>
                  <td className="mono">
                    <Ph>{amount}</Ph>
                  </td>
                  <td>
                    <Ph>{includes}</Ph>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="section__more">
          <Ph>[Sponsor pack (PDF)]</Ph>
          <span className="muted"> · </span>
          <Link href="/contact/">Contact us about sponsorship</Link>
        </p>
      </Section>
    </>
  );
}
