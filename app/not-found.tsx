import Link from "next/link";
import { DoubleRule } from "@/components/Print";

export default function NotFound() {
  return (
    <section className="container not-found">
      <h1 className="display" style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}>
        Page missing
      </h1>
      <DoubleRule />
      <p className="lede" style={{ marginTop: 24 }}>
        This page isn&apos;t in the programme. <Link href="/">Back to the cover</Link>
      </p>
    </section>
  );
}
