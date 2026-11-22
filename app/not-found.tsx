import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="not-found container">
      <div>
        <Logo />
        <p className="eyebrow">404</p>
        <h1 className="h2">Off the racing line</h1>
        <p className="muted">We couldn&apos;t find that page.</p>
        <Link href="/" className="btn btn--primary">
          Back to the pits
        </Link>
      </div>
    </section>
  );
}
