#!/usr/bin/env node
// Prints the values for a contact-form door combination:
//   1. the fingerprint to paste into KNOCK_HASH in lib/knock.ts
//   2. the hidden folder name the team sign-in page must live in (app/<folder>/)
// Usage: node scripts/knock-hash.mjs "<name>" "<email>" "<about>" "<message>"
// "about" must be one of the dropdown options exactly: Sponsorship, Press, School visit, Something else.
// Never commit the words themselves. When you change the combination, also rename the folder.
import { createHash } from "node:crypto";

const parts = process.argv.slice(2);
if (parts.length !== 4) {
  console.error('Usage: node scripts/knock-hash.mjs "<name>" "<email>" "<about>" "<message>"');
  process.exit(1);
}
// Must match lib/knock.ts.
const normalise = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
const joined = parts.map(normalise).join("|");
const sha = (s) => createHash("sha256").update(s, "utf8").digest("hex");
console.log("KNOCK_HASH:", sha(joined));
console.log("folder:    ", "app/" + sha("door|" + joined).slice(0, 16) + "/");
