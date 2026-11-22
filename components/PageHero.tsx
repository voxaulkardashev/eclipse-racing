type Props = { title: React.ReactNode; children?: React.ReactNode };

/** Title block at the top of each inner page. */
export default function PageHero({ title, children }: Props) {
  return (
    <header className="page-header container">
      <h1>{title}</h1>
      {children && <div className="lede muted">{children}</div>}
    </header>
  );
}
