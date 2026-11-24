// The contact form doubles as a discreet door to the team sign-in page.
//
// Filling in the four fields with the team's combination and pressing "Send message" opens the
// sign-in page. Two things are derived from the combination in the browser:
//   - its fingerprint, compared with KNOCK_HASH to recognise it;
//   - the sign-in page's address: a 16-character folder name worked out from the combination
//     with a different salt. That address is not written anywhere in the site's code, so only
//     someone who types the combination can find the page.
// This hides the door; it is not security. The real protection is the login itself, once
// accounts exist.
//
// To change the combination, run:
//   node scripts/knock-hash.mjs "<name>" "<email>" "<about>" "<message>"
// paste the printed KNOCK_HASH below, and rename the sign-in page's folder in app/ to the printed
// folder name. Capitals and extra spaces are ignored.
export const KNOCK_HASH = "1ea976dbea07d21e00c3595cec73960135535671739cff0b7c7cf1a892260659";

// Set on a correct knock; the sign-in page only shows itself when it is present this session.
export const KNOCK_FLAG = "er-knock";

// Must match scripts/knock-hash.mjs.
const normalise = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** The sign-in page's path (e.g. "/0123abcd4567ef89/") if the fields are the combination, else null. */
export async function openDoor(fields: string[]): Promise<string | null> {
  if (typeof crypto === "undefined" || !crypto.subtle) return null;
  const joined = fields.map(normalise).join("|");
  if ((await sha256(joined)) !== KNOCK_HASH) return null;
  return `/${(await sha256(`door|${joined}`)).slice(0, 16)}/`;
}
