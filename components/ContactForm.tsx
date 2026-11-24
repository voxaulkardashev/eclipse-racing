"use client";

import { useState } from "react";
import { openDoor, KNOCK_FLAG } from "@/lib/knock";
import { requestPageTurn } from "@/components/motion/PageTurn";
import { site } from "@/lib/site";

type Status = { kind: "idle" | "sent" | "error"; text: string };

const IDLE: Status = { kind: "idle", text: "Messages aren't connected yet. Until they are, please email us." };

/**
 * The contact form. It isn't connected to a mail service yet, so a normal message gets a polite
 * "please email us" reply. It also doubles as the team's discreet way in: the right combination
 * of all four fields opens the team sign-in page, whose address is worked out from the
 * combination (see lib/knock.ts). Nothing on the page hints at it.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>(IDLE);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = ["name", "email", "topic", "message"].map((k) => String(data.get(k) ?? ""));

    setBusy(true);
    const door = await openDoor(fields);
    setBusy(false);

    if (door) {
      try {
        sessionStorage.setItem(KNOCK_FLAG, "1");
      } catch {
        /* storage blocked: the login page will still open for this navigation */
      }
      form.reset();
      setStatus(IDLE);
      // The same yellow page-turn as the rest of the site, labelled as the page before the cover.
      requestPageTurn(door, { folio: "00", section: "Team area" });
      return;
    }

    const [name, email, , message] = fields.map((f) => f.trim());
    if (!name || !email || !message) {
      setStatus({ kind: "error", text: "Please fill in your name, email and message." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: "error", text: "That email address doesn't look right. Please check it." });
      return;
    }
    setStatus({
      kind: "sent",
      text: `Thanks. This form isn't connected yet, so your message wasn't sent. Please email ${site.email} instead.`,
    });
  };

  return (
    <form className="form" aria-describedby="form-status" noValidate onSubmit={onSubmit}>
      <h2 className="form__h">Message form</h2>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="topic">About</label>
        <select id="topic" name="topic" defaultValue="Sponsorship">
          <option>Sponsorship</option>
          <option>Press</option>
          <option>School visit</option>
          <option>Something else</option>
        </select>
      </div>
      <div className="field field--stack">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
      </div>
      <p id="form-status" className={`form__note form__note--${status.kind}`} role="status" aria-live="polite">
        {status.text}
      </p>
      <div>
        <button type="submit" className="button" disabled={busy}>
          Send message
        </button>
      </div>
    </form>
  );
}
