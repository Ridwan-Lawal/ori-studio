import type { ReactNode } from "react";

export function SectionHeading({
  id, eyebrow, children,
}: { id: string; eyebrow?: string; children: ReactNode }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="text-eyebrow section-eyebrow">{eyebrow}</p>}
      <h2 id={id} className="text-section">{children}</h2>
    </div>
  );
}
