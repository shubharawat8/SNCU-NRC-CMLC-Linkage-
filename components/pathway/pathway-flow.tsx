import Link from "next/link";
import { ArrowDown, Infinity as InfinityIcon, Stethoscope } from "lucide-react";
import { pathwayEntry, pathwayTracks, continuumStatement } from "@/lib/content/guideline";
import { cn } from "@/lib/utils";

const trackIcon = ["", "1", "2", "3"];

/**
 * The Section 5 flowchart as a responsive clay diagram:
 * SNCU decision node → three parallel tracks → shared continuum banner.
 */
export function PathwayFlow({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative">
      {/* Entry node */}
      <div className="mx-auto max-w-xl">
        <div className="clay tone-sncu bg-tone-soft p-6 text-center">
          <span className="clay-sm mx-auto mb-3 grid size-14 place-items-center !rounded-2xl text-tone">
            <Stethoscope className="size-7" aria-hidden />
          </span>
          <p className="font-display text-2xl font-semibold">{pathwayEntry.title}</p>
          <p className="text-ink-2">{pathwayEntry.detail}</p>
          <p className="mt-3 inline-block rounded-full bg-surface px-4 py-1.5 text-sm font-bold text-tone">{pathwayEntry.question}</p>
        </div>
      </div>

      {/* Branch connector (desktop) */}
      <svg aria-hidden className="mx-auto hidden h-14 w-full max-w-5xl md:block" viewBox="0 0 1000 56" preserveAspectRatio="none">
        <path d="M500 0 V24 M166 56 V24 H834 V56 M500 24 V56" fill="none" stroke="var(--muted)" strokeWidth="2.5" strokeDasharray="6 6" className="animate-flow" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="flex justify-center py-3 md:hidden" aria-hidden>
        <ArrowDown className="size-6 text-muted" />
      </div>

      {/* Three tracks */}
      <ol className="grid gap-6 md:grid-cols-3" aria-label="Pathway options after SNCU assessment">
        {pathwayTracks.map((t) => (
          <li key={t.id} className={cn("clay flex flex-col p-5", `tone-${t.tone}`)}>
            <div className="mb-4 flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tone font-display text-lg font-bold text-white dark:text-[var(--bg)]">
                {trackIcon[t.id]}
              </span>
              <p className="font-display text-lg font-semibold leading-snug">{t.label}</p>
            </div>
            <ol className="flex flex-1 flex-col">
              {t.steps.map((s, i) => {
                const body = (
                  <span className={cn("block rounded-2xl bg-tone-soft px-4 py-3 text-sm font-medium leading-snug text-ink", s.module && "transition-shadow hover:shadow-[inset_0_0_0_2px_var(--t)]")}>
                    {s.text}
                  </span>
                );
                return (
                  <li key={s.text}>
                    {s.module && !compact ? <Link href={`/modules/${s.module}`}>{body}</Link> : body}
                    {i < t.steps.length - 1 && <ArrowDown className="mx-auto my-1.5 size-4 text-tone" aria-hidden />}
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>

      {/* Continuum banner */}
      <div className="clay mt-8 flex flex-col items-center gap-4 bg-[linear-gradient(120deg,var(--tone-sncu-soft),var(--tone-clmc-soft),var(--tone-community-soft))] p-6 text-center sm:flex-row sm:text-left">
        <span className="clay-sm grid size-14 shrink-0 place-items-center !rounded-2xl text-[var(--ring)]">
          <InfinityIcon className="size-7" aria-hidden />
        </span>
        <div>
          <p className="font-display text-xl font-semibold">One baby — one continuum of care</p>
          <p className="text-ink-2">{continuumStatement}</p>
        </div>
      </div>
    </div>
  );
}
