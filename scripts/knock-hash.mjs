#!/usr/bin/env node
// Prints the fingerprint (SHA-256) for a contact-form login combination.
// Usage: node scripts/knock-hash.mjs "<your name>" "<email>" "<about>" "<message>"
// "about" must be one of the dropdown options exactly: Sponsorship, Press, School visit, Something else.
// Paste the printed value into KNOCK_HASH in lib/knock.ts. Never commit the words themselves.
import { createHash } from "node:crypto";

const parts = process.argv.slice(2);
if (parts.length !== 4) {
  console.error('Usage: node scripts/knock-hash.mjs "<name>" "<email>" "<about>" "<message>"');
  process.exit(1);
}
// Must match normalise() in lib/knock.ts.
const normalise = (s) => s.trim().toLowerCase().replace(/\s+/g, " ");
console.log(createHash("sha256").update(parts.map(normalise).join("|"), "utf8").digest("hex"));
