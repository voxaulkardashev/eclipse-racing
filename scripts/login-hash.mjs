#!/usr/bin/env node
// Prints the values for the demo team sign-in:
//   1. the fingerprint to paste into DEMO_LOGIN_HASH in lib/demoLogin.ts
//   2. the hidden folder name the team overview page must live in (app/<folder>/)
// Usage: node scripts/login-hash.mjs "<email>" "<password>"
// The email ignores capitals and spaces around it; the password is exact.
// Never commit the email/password themselves. When you change them, also rename the folder.
// This is a front-end demo; real accounts will replace it.
import { createHash } from "node:crypto";

const [email, password] = process.argv.slice(2);
if (email === undefined || password === undefined) {
  console.error('Usage: node scripts/login-hash.mjs "<email>" "<password>"');
  process.exit(1);
}
// Must match lib/demoLogin.ts.
const joined = `${email.trim().toLowerCase()}|${password}`;
const sha = (s) => createHash("sha256").update(s, "utf8").digest("hex");
console.log("DEMO_LOGIN_HASH:", sha(joined));
console.log("folder:         ", "app/" + sha("overview|" + joined).slice(0, 16) + "/");
