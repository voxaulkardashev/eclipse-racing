// Placeholders for content the team still has to supply, drawn as print would show them.

type PhotoProps = {
  caption: string; // what the photo should show, e.g. "Team at the workshop"
  ratio?: string; // CSS aspect-ratio
  cursor?: string; // optional cursor label
  className?: string;
};

/** A halftone-screened photo slot with a programme-style caption. */
export function Photo({ caption, ratio = "4 / 3", cursor, className = "" }: PhotoProps) {
  return (
    <figure className={`photo ${className}`} data-cursor={cursor}>
      <div className="photo__plate" style={{ aspectRatio: ratio }} role="img" aria-label={`Photo to come: ${caption}`} />
      <figcaption className="photo__caption">
        Photo: <Ph>[{caption}]</Ph>
      </figcaption>
    </figure>
  );
}

/** A value that may still be a placeholder: bracketed text like "[TBC]" shows as <Ph>, anything else plainly. */
export function Val({ children }: { children: string }) {
  return children.startsWith("[") ? <Ph>{children}</Ph> : <>{children}</>;
}

/** Copy still to be written, shown in brackets, e.g. <Ph>[Car name]</Ph>. */
export function Ph({ children }: { children: React.ReactNode }) {
  return <span className="ph">{children}</span>;
}
