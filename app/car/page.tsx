import type { Metadata } from "next";
import { Photo, Ph } from "@/components/Placeholder";
import { PageHead, Roundel, SpreadHead } from "@/components/Print";

export const metadata: Metadata = { title: "Car" };

// Parts every STEM Racing car has; the notes are for the team to fill in.
const callouts = ["Front wing", "Nose cone", "Front wheels", "Sidepods", "CO₂ canister chamber", "Rear wing", "Rear wheels", "Tether line guides"];

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

const notes = [
  ["Research", "[What you studied first and the ideas you sketched.]"],
  ["CAD", "[Software used and how many design iterations you went through.]"],
  ["CFD and wind tunnel", "[What you tested and what you changed because of it.]"],
  ["Manufacture", "[How the body and wheels were made and finished.]"],
  ["Testing", "[Track runs, times and the changes they led to.]"],
];

export default function CarPage() {
  return (
    <>
      <PageHead href="/car/" title={<Ph>[Car name]</Ph>}>
        <Ph>[One sentence on the car and the idea behind its design.]</Ph>
      </PageHead>

      <section className="container" aria-label="Car profile">
        <Photo caption="The car, side profile on a plain background" ratio="21 / 9" cursor="View" />
        <ol className="callouts" style={{ marginTop: 28 }} data-reveal="rows">
          {callouts.map((c, i) => (
            <li key={c}>
              <Roundel no={String(i + 1)} />
              <span>
                <strong>{c}.</strong> <Ph>[note]</Ph>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="spread container" aria-labelledby="h-spec">
        <SpreadHead id="h-spec" title="Specification" />
        <div className="cols">
          <div className="span-7">
            <table className="ledger">
              <tbody data-reveal="rows">
                {specs.map(([name, unit]) => (
                  <tr key={name}>
                    <th scope="row">{name}</th>
                    <td>
                      <Ph>{unit}</Ph>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="span-5">
            <Photo caption="CFD pressure plot" ratio="4 / 3" cursor="View" />
          </div>
        </div>
      </section>

      <section className="spread container" aria-labelledby="h-notes">
        <SpreadHead id="h-notes" title="Design notes" />
        <div className="cols">
          <ol className="notes span-7" data-reveal="rows">
            {notes.map(([title, note], i) => (
              <li key={title}>
                <Roundel no={String(i + 1)} />
                <div>
                  <h3>{title}</h3>
                  <p>
                    <Ph>{note}</Ph>
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="span-5" style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <Photo caption="Machining the body" ratio="4 / 3" cursor="View" />
            <Photo caption="Wind tunnel smoke test" ratio="4 / 3" cursor="View" />
          </div>
        </div>
      </section>

      <section className="spread container" aria-labelledby="h-gallery">
        <SpreadHead id="h-gallery" title="Gallery" />
        <div className="gallery">
          {["Front three-quarter", "Rear detail", "Wheels and axles", "On the track", "In the pit display", "Final finish"].map((c) => (
            <Photo key={c} caption={c} ratio="4 / 3" cursor="View" />
          ))}
        </div>
      </section>
    </>
  );
}
