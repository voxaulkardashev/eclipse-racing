"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DoubleRule } from "@/components/Print";
import { KNOCK_FLAG } from "@/lib/knock";
import NotFound from "../not-found";

/**
 * Shows the sign-in form only to someone who came through the contact form's combination this
 * session; anyone opening /login/ directly sees the ordinary "page missing" page. Nothing is
 * rendered into the static HTML, so the form isn't in the page source either.
 */
export default function LoginGate() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    let ok = false;
    try {
      ok = sessionStorage.getItem(KNOCK_FLAG) === "1";
    } catch {
      ok = false;
    }
    setAllowed(ok);
  }, []);

  if (allowed === null) return <div className="login-wait" />;
  if (!allowed) return <NotFound />;
  return <SignIn />;
}

function SignIn() {
  const [note, setNote] = useState("Accounts aren't connected yet. This is the front end only.");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get("email") ?? "").trim() || !String(data.get("password") ?? "")) {
      setNote("Please enter your email and password.");
      return;
    }
    setNote("Accounts aren't connected yet, so you can't sign in. Nothing was sent.");
  };

  return (
    <section className="container login">
      <div className="running-head">
        <span>Eclipse Racing · Team area</span>
        <span>Members only</span>
      </div>
      <div className="page-head__title">
        <h1 className="display page-head__h1">Sign in</h1>
      </div>
      <DoubleRule />

      <div className="cols login__body">
        <div className="span-5">
          <p className="lede">The team&apos;s own space for tasks, deadlines and news drafts.</p>
          <p className="login__aside">
            Accounts are by invitation from the Team Manager. Forgotten your password? Ask them to reset it.
          </p>
          <p className="login__aside">
            <Link href="/">Back to the cover</Link>
          </p>
        </div>

        <div className="span-7">
          <form className="form" aria-describedby="login-status" noValidate onSubmit={onSubmit}>
            <h2 className="form__h">Team sign-in</h2>
            <div className="field">
              <label htmlFor="login-email">Email</label>
              <input id="login-email" name="email" type="email" autoComplete="username" />
            </div>
            <div className="field">
              <label htmlFor="login-password">Password</label>
              <input id="login-password" name="password" type="password" autoComplete="current-password" />
            </div>
            <p id="login-status" className="form__note" role="status" aria-live="polite">
              {note}
            </p>
            <div>
              <button type="submit" className="button">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
