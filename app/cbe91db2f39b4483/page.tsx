import type { Metadata } from "next";
import LoginGate from "./LoginGate";

// The team sign-in. Its folder name is worked out from the contact form's combination
// (lib/knock.ts, scripts/knock-hash.mjs), so it isn't linked or written anywhere in the site's
// code, and it is hidden from search engines. Front end only until accounts exist.
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginGate />;
}
