import type { Metadata } from "next";
import TestLab from "./TestLab";
import { eclipseFont } from "./font";
import "./lab.css";

// Beta test page: not linked from the site, kept out of search engines. Delete app/test/ to remove it.
export const metadata: Metadata = {
  title: "Test lab",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return (
    <div className={eclipseFont.variable}>
      <TestLab />
    </div>
  );
}
