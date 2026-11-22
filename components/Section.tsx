import Link from "next/link";

type Props = {
  title: string;
  more?: { href: string; label: string };
  children: React.ReactNode;
};

/** A page section: title in a narrow left column, content on the right. */
export default function Section({ title, more, children }: Props) {
  return (
    <section className="section">
      <div className="container section__grid">
        <h2 className="section__title">{title}</h2>
        <div>
          {children}
          {more && (
            <p className="section__more">
              <Link href={more.href}>{more.label}</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
