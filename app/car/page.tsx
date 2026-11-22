import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ImageBox, Lines, Ph } from "@/components/Placeholder";

export const metadata: Metadata = { title: "The Car" };

const specs = [
  "Total mass",
  "Overall length",
  "Overall width",
  "Wheel diameter",
  "Body material",
  "Wheel material",
  "Best track time",
  "Drag coefficient (CFD)",
];

const process = [
  { title: "Research & concept", label: "Initial research and sketches" },
  { title: "CAD design", label: "CAD software and iterations" },
  { title: "CFD & wind tunnel", label: "Aerodynamic analysis and results" },
  { title: "Manufacture", label: "Machining, 3D printing and finishing" },
  { title: "Testing & refinement", label: "Track testing and changes made" },
];

export default function CarPage() {
  return (
    <>
      <PageHero eyebrow="The car" title="[Car name]">
        <Ph>One-line description of the car and its design philosophy.</Ph>
      </PageHero>

      <section className="section">
        <div className="container">
          <ImageBox label="Hero car render (21:9)" ratio="21 / 9" />
        </div>
      </section>

      <section className="section section--raised">
        <div className="container split">
          <div>
            <p className="eyebrow">Specifications</p>
            <h2 className="h2">By the numbers</h2>
            <table className="specs">
              <tbody>
                {specs.map((s) => (
                  <tr key={s}>
                    <th scope="row">{s}</th>
                    <td>
                      <Ph>—</Ph>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid--2">
            <ImageBox label="Side view" ratio="1 / 1" />
            <ImageBox label="Top view" ratio="1 / 1" />
            <ImageBox label="Front view" ratio="1 / 1" />
            <ImageBox label="Detail" ratio="1 / 1" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <p className="eyebrow">Design process</p>
            <h2 className="h2">From sketch to start line</h2>
            <ol className="timeline">
              {process.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <Lines count={2} label={p.label} />
                </li>
              ))}
            </ol>
          </div>
          <div className="grid" style={{ alignSelf: "start" }}>
            <ImageBox label="CFD visualisation" ratio="16 / 10" />
            <ImageBox label="Manufacturing photo" ratio="16 / 10" />
          </div>
        </div>
      </section>

      <section className="section section--raised">
        <div className="container">
          <div className="section__head">
            <div>
              <p className="eyebrow">Gallery</p>
              <h2 className="h2">Up close</h2>
            </div>
          </div>
          <div className="grid grid--3">
            {Array.from({ length: 6 }, (_, i) => (
              <ImageBox key={i} label={`Gallery image ${i + 1}`} ratio="4 / 3" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
