"use client";

import { useState } from "react";
import Logo from "@/components/Logo";
import { Roundel } from "@/components/Print";

/**
 * Test lab for trying ideas before they go into the site. Currently: the ECLIPSE lettering as
 * the header face. Samples reuse the site's real heading classes; the lab only swaps the face,
 * size and tracking inside its own wrapper, so nothing outside this page changes.
 */

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GROUNDS = { paper: "Paper", dark: "Black", spot: "Yellow" } as const;
type Ground = keyof typeof GROUNDS;

const SECTION_HEADS = ["Entry list", "Technical", "Results and news", "Our partners", "How we work"];

export default function TestLab() {
  const [useEclipse, setUseEclipse] = useState(true);
  // The ECLIPSE face is about twice as wide as the condensed one, so start smaller.
  const [scale, setScale] = useState(0.55);
  // Small titles need less shrinking to stay readable.
  const [smallScale, setSmallScale] = useState(0.85);
  const [tracking, setTracking] = useState(0.02);
  const [ground, setGround] = useState<Ground>("dark");

  const style = {
    "--lab-scale": useEclipse ? scale : 1,
    "--lab-scale-small": useEclipse ? smallScale : 1,
    "--lab-tracking": useEclipse ? `${tracking}em` : "0.005em",
  } as React.CSSProperties;

  return (
    <div className={`lab ${useEclipse ? "lab--eclipse" : ""}`} style={style}>
      <header className="lab-intro container">
        <div className="running-head">
          <span>Test lab</span>
          <span>Not part of the site</span>
        </div>
        <h1 className="lab-intro__h">Test lab</h1>
        <p className="lab-intro__p">
          A sandbox for trying things before they go into the site. This page isn&apos;t linked anywhere and is hidden
          from search engines. Now testing: the ECLIPSE lettering as the header face.
        </p>
      </header>

      {/* Controls */}
      <section className="lab-controls" aria-label="Test controls">
        <div className="container lab-controls__inner">
          <fieldset className="lab-field">
            <legend>Header face</legend>
            <div className="lab-segment">
              <button type="button" aria-pressed={useEclipse} onClick={() => setUseEclipse(true)}>
                Eclipse
              </button>
              <button type="button" aria-pressed={!useEclipse} onClick={() => setUseEclipse(false)}>
                Current
              </button>
            </div>
          </fieldset>

          <label className="lab-field">
            <span>
              Size <output>{Math.round(scale * 100)}%</output>
            </span>
            <input
              type="range"
              min={0.3}
              max={1}
              step={0.01}
              value={scale}
              disabled={!useEclipse}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </label>

          <label className="lab-field">
            <span>
              Small titles <output>{Math.round(smallScale * 100)}%</output>
            </span>
            <input
              type="range"
              min={0.4}
              max={1.2}
              step={0.01}
              value={smallScale}
              disabled={!useEclipse}
              onChange={(e) => setSmallScale(Number(e.target.value))}
            />
          </label>

          <label className="lab-field">
            <span>
              Letter spacing <output>{tracking.toFixed(2)}em</output>
            </span>
            <input
              type="range"
              min={-0.04}
              max={0.15}
              step={0.01}
              value={tracking}
              disabled={!useEclipse}
              onChange={(e) => setTracking(Number(e.target.value))}
            />
          </label>

          <fieldset className="lab-field">
            <legend>Specimen ground</legend>
            <div className="lab-segment">
              {(Object.keys(GROUNDS) as Ground[]).map((g) => (
                <button key={g} type="button" aria-pressed={ground === g} onClick={() => setGround(g)}>
                  {GROUNDS[g]}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </section>

      {/* Specimen */}
      <section
        className={`lab-specimen lab-specimen--${ground}`}
        data-theme={ground === "dark" ? "dark" : undefined}
        data-ink={ground === "spot" ? "spot" : undefined}
        aria-label="Specimen"
      >
        <div className="container">
          <p className="display lab-specimen__big">
            <span className="lab-fit">Eclipse Racing</span>
          </p>
          <p className="display lab-specimen__abc">
            <span className="lab-fit">{ALPHABET}</span>
          </p>
          <p className="lab-note">
            The font has the capitals A to Z and a space only. Digits, punctuation and lowercase fall back to the
            current face, so they will look different, as in <span className="display">&ldquo;02&rdquo;</span> below.
          </p>
        </div>
      </section>

      {/* Cover, in context */}
      <section className="cover lab-block" data-theme="dark" aria-label="Cover sample">
        <div className="container lab-cover">
          <div>
            <Logo className="cover__logo" />
            <h2 className="display cover__title">
              <span className="lab-fit">
                Eclipse
                <br />
                Racing
              </span>
            </h2>
            <p className="cover__sub">STEM Racing, Professional Class.</p>
          </div>
          <div className="next-round" data-ink="spot">
            <h3 className="display">
              <span className="lab-fit lab-fit--small">Next round</span>
            </h3>
            <p>
              Headings inside the yellow panel, at the panel&apos;s own size.
            </p>
          </div>
        </div>
      </section>

      {/* Inner page head, in context */}
      <section className="container lab-block" aria-label="Page title sample">
        <div className="running-head">
          <span>Eclipse Racing · Official programme</span>
          <span>Entry list</span>
        </div>
        <div className="page-head__title">
          <h2 className="display page-head__h1">
            <span className="lab-fit">Team</span>
          </h2>
          <span className="folio-tab" data-ink="spot">
            02
          </span>
        </div>
        <hr className="double-rule" />
      </section>

      {/* Section headings, in context */}
      <section className="container lab-block" aria-label="Section heading samples">
        {SECTION_HEADS.map((t) => (
          <div className="spread-head" key={t}>
            <h2 className="display spread-head__h2">
              <span className="lab-fit">{t}</span>
            </h2>
            <span className="spread-head__link">Section heading</span>
          </div>
        ))}
      </section>

      <section className="band lab-band" data-ink="spot" aria-label="Heading on yellow sample">
        <div className="container">
          <div className="spread-head">
            <h2 className="display spread-head__h2">
              <span className="lab-fit">Timetable</span>
            </h2>
            <span className="spread-head__link">On the yellow band</span>
          </div>
        </div>
      </section>

      {/* Smaller titles, in context */}
      <section className="container lab-block" aria-label="Small title samples">
        <ol className="entries">
          {["Team Manager", "Design Engineer"].map((role, i) => (
            <li className="entry" key={role}>
              <Roundel no={`0${i + 1}`} />
              <span />
              <span className="entry__name">
                <span className="lab-fit lab-fit--small">Team member</span>
              </span>
              <span className="entry__role">{role}</span>
            </li>
          ))}
        </ol>

        <div className="lab-row">
          <div className="ad ad--half lab-ad">
            <span className="ad__meta">Half page</span>
            <span className="ad__title">
              <span className="lab-fit lab-fit--small">This space is available</span>
            </span>
            <span className="ad__meta">Gold</span>
          </div>
          <div>
            <h3 className="bulletin__title">
              <span className="lab-fit lab-fit--small">Regional final</span>
            </h3>
            <p className="lab-note">A bulletin headline.</p>
          </div>
        </div>
      </section>

      <section className="back-cover lab-back" data-theme="dark" aria-label="Back cover heading sample">
        <div className="container">
          <h2 className="back-cover__h">
            <span className="lab-fit lab-fit--small">Follow the season</span>
          </h2>
          <p className="lab-note">The back cover&apos;s small headings.</p>
        </div>
      </section>
    </div>
  );
}
