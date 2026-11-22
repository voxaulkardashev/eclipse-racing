// Mockup helpers: flat placeholders for content the team still has to supply.

type BoxProps = {
  label: string;
  ratio?: string; // CSS aspect-ratio, e.g. "16 / 9"
};

/** Grey box standing in for a photo, render or logo. */
export function ImageBox({ label, ratio = "16 / 9" }: BoxProps) {
  return (
    <div className="ph-image" style={{ aspectRatio: ratio }} role="img" aria-label={`Placeholder: ${label}`}>
      <span>{label}</span>
    </div>
  );
}

/** Grey bracketed text marking copy still to be written, e.g. <Ph>[Car name]</Ph>. */
export function Ph({ children }: { children: React.ReactNode }) {
  return <span className="ph-text">{children}</span>;
}
