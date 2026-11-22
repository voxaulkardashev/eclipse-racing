import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container not-found">
      <h1>Page not found</h1>
      <p className="muted">
        <Link href="/">Go to the home page</Link>
      </p>
    </section>
  );
}
