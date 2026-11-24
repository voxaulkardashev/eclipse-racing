"use client";

import { useEffect, useState } from "react";
import { DoubleRule, SpreadHead } from "@/components/Print";
import { requestPageTurn } from "@/components/motion/PageTurn";
import { MEMBER_FLAG, signOut } from "@/lib/demoLogin";
import NotFound from "../not-found";

/**
 * Team overview (demo). Only shown in a browser session that signed in with the demo account;
 * anyone else sees "page missing", and nothing is rendered into the static HTML. All data below
 * is example data held in the page; changes are not saved.
 */
export default function Overview() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let ok = false;
    try {
      ok = sessionStorage.getItem(MEMBER_FLAG) === "demo";
    } catch {
      ok = false;
    }
    setAllowed(ok);
  }, []);

  if (allowed === null) return <div className="login-wait" />;
  if (!allowed) return <NotFound />;
  return <Dashboard />;
}

/* ---------- Example data ---------- */

type Status = "todo" | "doing" | "done";
type Task = { id: number; title: string; owner: string; due: string; status: Status };

const NEXT_ROUND = { event: "Regional final", date: "2027-03-13", venue: "[Venue]" };

const TASKS: Task[] = [
  { id: 1, title: "Run CFD on rear wing version 3", owner: "Design Engineer", due: "06.12", status: "doing" },
  { id: 2, title: "Draft sponsor pack version 2", owner: "Enterprise Manager", due: "05.12", status: "doing" },
  { id: 3, title: "Order body blanks and wheel stock", owner: "Resources Manager", due: "03.12", status: "todo" },
  { id: 4, title: "Machine body prototype 2", owner: "Manufacturing Engineer", due: "12.12", status: "todo" },
  { id: 5, title: "Livery concepts for the pit display", owner: "Graphic Designer", due: "15.12", status: "todo" },
  { id: 6, title: "Portfolio, section 1: research", owner: "Team Manager", due: "20.12", status: "todo" },
  { id: 7, title: "Book a wind tunnel slot", owner: "Team Manager", due: "28.11", status: "done" },
];

const COLUMNS: { status: Status; title: string; action: string; next: Status }[] = [
  { status: "todo", title: "To do", action: "Start", next: "doing" },
  { status: "doing", title: "In progress", action: "Mark done", next: "done" },
  { status: "done", title: "Done", action: "Reopen", next: "todo" },
];

const MILESTONES = [
  ["Portfolio first draft", "19.12.2026", "Team Manager", "On track"],
  ["Car manufactured", "31.01.2027", "Manufacturing Engineer", "On track"],
  ["Pit display built", "21.02.2027", "Graphic Designer", "Not started"],
  ["Regional final", "13.03.2027", "Whole team", "Not started"],
];

const DRAFTS = [
  ["Season launch", "Published", "Team Manager"],
  ["Meet the team", "Scheduled for 01.12.2026", "Graphic Designer"],
  ["A day in the wind tunnel", "Draft", "Design Engineer"],
];

const SPONSORS = [
  ["Company A", "Gold", "Meeting booked", "[£]"],
  ["Company B", "Supporter", "Contacted", "[£]"],
  ["Company C", "Silver", "Agreed", "[£]"],
  ["Company D", "Title partner", "Pitch sent", "[£]"],
];

function daysUntil(iso: string) {
  const target = new Date(`${iso}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((target.getTime() - today.getTime()) / 86_400_000));
}

function Dashboard() {
  const [tasks, setTasks] = useState(TASKS);
  const days = daysUntil(NEXT_ROUND.date);

  const move = (id: number, next: Status) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, status: next } : t)));

  const onSignOut = () => {
    signOut();
    requestPageTurn("/", { folio: "01", section: "Cover" });
  };

  return (
    <div className="ov">
      <header className="container">
        <div className="running-head">
          <span>Eclipse Racing · Team area</span>
          <span>Signed in: Demo member</span>
        </div>
        <div className="page-head__title">
          <h1 className="display page-head__h1">Overview</h1>
          <button type="button" className="button" onClick={onSignOut}>
            Sign out
          </button>
        </div>
        <DoubleRule />
        <p className="ov-demo">Demo account: everything here is example data, and changes aren&apos;t saved.</p>
      </header>

      <section className="container ov-top" aria-label="Next round and this week">
        <div className="next-round" data-ink="spot">
          <h2 className="display">Next round</h2>
          <p className="ov-count">
            <span className="display">{days}</span> days to go
          </p>
          <dl>
            <dt>Event</dt>
            <dd>{NEXT_ROUND.event}</dd>
            <dt>Date</dt>
            <dd>13.03.2027</dd>
            <dt>Venue</dt>
            <dd className="ph">{NEXT_ROUND.venue}</dd>
          </dl>
        </div>
        <div className="ov-week">
          <h2 className="display ov-h3">This week</h2>
          <ul className="ov-rows">
            {tasks
              .filter((t) => t.status !== "done")
              .slice(0, 3)
              .map((t) => (
                <li key={t.id}>
                  <span className="rows__key">Due {t.due}</span>
                  <span>
                    {t.title} <span className="ov-meta">· {t.owner}</span>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="spread container" aria-labelledby="h-tasks">
        <SpreadHead id="h-tasks" title="Tasks" />
        <div className="ov-board">
          {COLUMNS.map((col) => {
            const list = tasks.filter((t) => t.status === col.status);
            return (
              <div className="ov-col" key={col.status}>
                <h3 className="ov-col__h">
                  <span className="display">{col.title}</span>
                  <span className="ov-col__n">{list.length}</span>
                </h3>
                <ol className="ov-tasks">
                  {list.map((t) => (
                    <li key={t.id} className={`ov-task ov-task--${t.status}`}>
                      <span className="ov-task__title">{t.title}</span>
                      <span className="ov-meta">
                        {t.owner} · due {t.due}
                      </span>
                      <button type="button" className="ov-move" onClick={() => move(t.id, col.next)}>
                        {col.action}
                      </button>
                    </li>
                  ))}
                  {list.length === 0 && <li className="ov-empty">Nothing here.</li>}
                </ol>
              </div>
            );
          })}
        </div>
      </section>

      <section className="spread container" aria-labelledby="h-milestones">
        <SpreadHead id="h-milestones" title="Milestones" />
        <div className="table-scroll">
          <table className="ledger">
            <thead>
              <tr>
                <th scope="col">Milestone</th>
                <th scope="col">Due</th>
                <th scope="col">Owner</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {MILESTONES.map(([m, due, owner, status]) => (
                <tr key={m}>
                  <th scope="row">{m}</th>
                  <td>{due}</td>
                  <td>{owner}</td>
                  <td>{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="container cols ov-pair">
        <section className="span-6" aria-labelledby="h-drafts">
          <SpreadHead id="h-drafts" title="News drafts" />
          <ul className="ov-rows">
            {DRAFTS.map(([title, state, by]) => (
              <li key={title}>
                <span className="rows__key">{state}</span>
                <span>
                  {title} <span className="ov-meta">· {by}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="span-6" aria-labelledby="h-sponsors">
          <SpreadHead id="h-sponsors" title="Sponsors" />
          <div className="table-scroll">
            <table className="ledger">
              <thead>
                <tr>
                  <th scope="col">Company</th>
                  <th scope="col">Level</th>
                  <th scope="col">Stage</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {SPONSORS.map(([c, level, stage, amount]) => (
                  <tr key={c}>
                    <th scope="row">{c}</th>
                    <td>{level}</td>
                    <td>{stage}</td>
                    <td className="ph">{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
