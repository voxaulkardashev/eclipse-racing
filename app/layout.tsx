import type { Metadata, Viewport } from "next";
import "@fontsource-variable/big-shoulders-display";
import "@fontsource-variable/archivo/wdth.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import PageTurn from "@/components/motion/PageTurn";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://eclipseracing.co.uk"),
  title: {
    default: "Eclipse Racing · Official programme",
    template: "%s · Eclipse Racing",
  },
  description: "Eclipse Racing is a STEM Racing team in the Professional Class. Follow the team, the car and the season.",
};

export const viewport: Viewport = {
  themeColor: "#141414",
};

// Runs before paint: marks whether motion is allowed so reveals can start hidden without a flash,
// while pages without JavaScript stay fully visible.
const motionFlag = `document.documentElement.classList.add(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'motion-reduce':'motion-ok')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <Reveal />
        <PageTurn />
        <Cursor />
      </body>
    </html>
  );
}
