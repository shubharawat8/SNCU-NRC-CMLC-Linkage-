import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Wrapping chain of chips joined by chevrons: A › B › C. */
export function StepChain({ steps, tone = "sncu", className }: { steps: readonly string[]; tone?: string; className?: string }) {
  return (
    <ol className={cn("flex flex-wrap items-center gap-x-1.5 gap-y-3", `tone-${tone}`, className)}>
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-1.5">
          <span className="clay-sm !rounded-full bg-tone-soft px-4 py-2 text-sm font-semibold text-ink">{s}</span>
          {i < steps.length - 1 && <ChevronRight className="size-4 text-tone" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}
