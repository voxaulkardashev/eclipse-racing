import type { Metadata } from "next";
import LoginGate from "./LoginGate";

// The team login. Not linked anywhere and hidden from search engines; it is reached through the
// contact form's combination (lib/knock.ts). Front end only until accounts exist.
export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginGate />;
}
