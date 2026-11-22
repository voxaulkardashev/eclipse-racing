// Mockup helpers: clearly marked placeholders for content the team still has to supply.

type BoxProps = {
  label: string;
  ratio?: string; // CSS aspect-ratio, e.g. "16 / 9"
  className?: string;
  round?: boolean;
};

/** Striped box standing in for a photo, render or logo. */
export function ImageBox({ label, ratio = "16 / 9", className = "", round = false }: BoxProps) {
  return (
    <div
      className={`ph-image ${round ? "ph-image--round" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder: ${label}`}
    >
      <span>{label}</span>
    </div>
  );
}

/** Inline placeholder text, e.g. <Ph>Team mission statement</Ph>. */
export function Ph({ children }: { children: React.ReactNode }) {
  return <span className="ph-text">{children}</span>;
}

/** A paragraph-shaped block of grey lines for longer copy. */
export function Lines({ count = 3, label }: { count?: number; label?: string }) {
  return (
    <div className="ph-lines" aria-label={label ? `Placeholder: ${label}` : undefined}>
      {label && <span className="ph-lines__label">{label}</span>}
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="ph-line" style={{ width: i === count - 1 ? "62%" : "100%" }} />
      ))}
    </div>
  );
}
