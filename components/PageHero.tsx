type Props = { eyebrow: string; title: string; children?: React.ReactNode };

/** Banner at the top of each inner page. */
export default function PageHero({ eyebrow, title, children }: Props) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display">{title}</h1>
        {children && <div className="page-hero__lede">{children}</div>}
      </div>
    </section>
  );
}
