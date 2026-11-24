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
import Intro from "@/components/motion/Intro";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { RESPECT_REDUCED_MOTION } from "@/lib/motion";

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
// while pages without JavaScript stay fully visible. Also shows the loading screen on the first
// page of a browser session, with a 7s safety net so it can never block the page.
const bootScript = `(function(){var d=document.documentElement;d.classList.add(${RESPECT_REDUCED_MOTION}&&window.matchMedia('(prefers-reduced-motion: reduce)').matches?'motion-reduce':'motion-ok');try{if(!sessionStorage.getItem('er-intro')){d.classList.add('intro');setTimeout(function(){d.classList.remove('intro')},7000)}}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SmoothScroll />
        <Intro />
        <Reveal />
        <PageTurn />
        <ScrollProgress />
        <Cursor />
      </body>
    </html>
  );
}
