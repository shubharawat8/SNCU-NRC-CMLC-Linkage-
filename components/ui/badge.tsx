import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/content/modules";

export function Badge({ tone, className, children }: { tone?: Tone; className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tone ? `tone-${tone} bg-tone-soft text-tone` : "bg-sunken text-ink-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks content that is not part of the guideline text. */
export function SupplementaryBadge() {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-[var(--muted)] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
      Supplementary
    </span>
  );
}
