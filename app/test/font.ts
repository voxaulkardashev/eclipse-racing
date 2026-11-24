import localFont from "next/font/local";

// The team's ECLIPSE lettering (A-Z capitals and space only). Anything else, such as digits and
// punctuation, falls back to the site's current display face.
export const eclipseFont = localFont({
  src: "./ECLIPSE_1.6.ttf",
  variable: "--font-eclipse",
  display: "swap",
});
