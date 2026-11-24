// The contact form doubles as a discreet door to the team login page.
//
// Filling in the four fields with the team's combination and pressing "Send message" opens
// /login/. Only a SHA-256 fingerprint of the combination is stored here, so the words never
// appear in the site's code. This hides the door; it is not security. The real protection is the
// login itself, once accounts exist.
//
// To change the combination, run:
//   node scripts/knock-hash.mjs "<name>" "<email>" "<about>" "<message>"
// and paste the result below. Capitals and extra spaces are ignored.
export const KNOCK_HASH = "1ea976dbea07d21e00c3595cec73960135535671739cff0b7c7cf1a892260659";

// Set on a correct knock; the login page only shows itself when it is present this session.
export const KNOCK_FLAG = "er-knock";

// Must match normalise() in scripts/knock-hash.mjs.
const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

export async function isKnock(fields: string[]): Promise<boolean> {
  if (typeof crypto === "undefined" || !crypto.subtle) return false;
  const data = new TextEncoder().encode(fields.map(normalise).join("|"));
  const digest = await crypto.subtle.digest("SHA-256", data);
  const hex = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  return hex === KNOCK_HASH;
}
