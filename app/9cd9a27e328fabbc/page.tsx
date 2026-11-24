import type { Metadata } from "next";
import Overview from "./Overview";

// The team overview behind the demo sign-in. Its folder name is worked out from the demo account
// (lib/demoLogin.ts, scripts/login-hash.mjs), so it isn't linked or written anywhere in the site's
// code, and it is hidden from search engines. Front end only, with example data.
export const metadata: Metadata = {
  title: "Overview",
  robots: { index: false, follow: false },
};

export default function OverviewPage() {
  return <Overview />;
}
