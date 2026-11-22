import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://eclipseracing.co.uk"),
  title: {
    default: "Eclipse Racing | STEM Racing Professional Class",
    template: "%s | Eclipse Racing",
  },
  description: "Eclipse Racing is a STEM Racing team competing in the Professional Class.",
};

export const viewport: Viewport = {
  themeColor: "#0e0e0f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
