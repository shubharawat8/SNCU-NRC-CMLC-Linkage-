import { cn } from "@/lib/utils";

/** Vertical clay timeline with numbered nodes. */
export function NumberedSteps({ steps, tone = "sncu", className }: { steps: readonly React.ReactNode[]; tone?: string; className?: string }) {
  return (
    <ol className={cn("relative space-y-5", `tone-${tone}`, className)}>
      <span aria-hidden className="absolute bottom-4 left-[1.15rem] top-4 w-1 rounded-full bg-tone-soft" />
      {steps.map((s, i) => (
        <li key={i} className="relative flex gap-4">
          <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-tone font-display font-bold text-white shadow-[3px_4px_10px_rgba(0,0,0,0.18),inset_2px_2px_4px_rgba(255,255,255,0.35)] dark:text-[var(--bg)]">
            {i + 1}
          </span>
          <div className="clay-sm flex-1 px-5 py-3.5 leading-relaxed text-ink-2">{s}</div>
        </li>
      ))}
    </ol>
  );
}
