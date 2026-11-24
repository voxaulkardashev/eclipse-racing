// Demo team sign-in (front end only, until real accounts exist).
//
// One demo account. Only a SHA-256 fingerprint of its email and password is stored, never the
// details themselves. Signing in works out the team overview page's address from the same
// details with a different salt, so that address isn't written anywhere in the site's code; the
// overview only shows itself in a browser session that signed in.
//
// To change the demo account, run:
//   node scripts/login-hash.mjs "<email>" "<password>"
// paste the printed DEMO_LOGIN_HASH below, and rename the overview page's folder in app/ to the
// printed folder name. The email ignores capitals and surrounding spaces; the password is exact.
export const DEMO_LOGIN_HASH = "f040d02d57f0c6b35c85e27adc26e62397eda3ac69aaf78640872400c6757a68";

// Set on a successful sign-in; the overview checks it.
export const MEMBER_FLAG = "er-member";

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** The overview page's path if the email and password match the demo account, else null. */
export async function signIn(email: string, password: string): Promise<string | null> {
  if (typeof crypto === "undefined" || !crypto.subtle) return null;
  const joined = `${email.trim().toLowerCase()}|${password}`;
  if ((await sha256(joined)) !== DEMO_LOGIN_HASH) return null;
  return `/${(await sha256(`overview|${joined}`)).slice(0, 16)}/`;
}

/** Forget the signed-in state for this browser session. */
export function signOut() {
  try {
    sessionStorage.removeItem(MEMBER_FLAG);
  } catch {
    /* storage blocked: nothing to clear */
  }
}
