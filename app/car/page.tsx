import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ImageBox, Ph } from "@/components/Placeholder";
import Section from "@/components/Section";

export const metadata: Metadata = { title: "Car" };

const specs = [
  ["Mass", "[g]"],
  ["Length", "[mm]"],
  ["Width", "[mm]"],
  ["Wheel diameter", "[mm]"],
  ["Body material", "[material]"],
  ["Wheel material", "[material]"],
  ["Drag coefficient (CFD)", "[Cd]"],
  ["Best track time", "[s]"],
];

const process = [
  ["Research and concept", "[Early research and sketches.]"],
  ["CAD", "[Software used and how many iterations.]"],
  ["CFD and wind tunnel", "[What you tested and what changed.]"],
  ["Manufacture", "[Machining, printing, finishing.]"],
  ["Testing", "[Track runs and refinements.]"],
];

export default function CarPage() {
  return (
    <>
      <PageHero title={<Ph>[Car name]</Ph>}>
        <Ph>[One sentence on the car and its design idea.]</Ph>
      </PageHero>

      <div className="container">
        <ImageBox label="Car render" ratio="21 / 9" />
      </div>

      <Section title="Specification">
        <table className="table">
          <tbody>
            {specs.map(([name, unit]) => (
              <tr key={name}>
                <th scope="row">{name}</th>
                <td className="mono">
                  <Ph>{unit}</Ph>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="Process">
        <div className="cols cols--2">
          <ol className="steps">
            {process.map(([name, note]) => (
              <li key={name}>
                <div>
                  <h3 style={{ fontSize: "1rem" }}>{name}</h3>
                  <p className="muted" style={{ marginTop: 4 }}>
                    <Ph>{note}</Ph>
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="stack">
            <ImageBox label="CFD result" ratio="16 / 10" />
            <ImageBox label="Manufacturing photo" ratio="16 / 10" />
          </div>
        </div>
      </Section>

      <Section title="Photos">
        <div className="cols cols--3">
          {Array.from({ length: 6 }, (_, i) => (
            <ImageBox key={i} label={`Photo ${i + 1}`} ratio="4 / 3" />
          ))}
        </div>
      </Section>
    </>
  );
}
