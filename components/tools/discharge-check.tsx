"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CircleAlert, CircleCheck, Printer, RotateCcw, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { ClayButton } from "@/components/ui/clay-button";
import { importantNotice } from "@/lib/content/guideline";

type YesNo = "yes" | "no" | null;

const feedFlags = [
  "Mother has not established breastfeeding",
  "Weak/ineffective suck or unable to breastfeed effectively",
  "Mother requires intensive breastfeeding support",
  "Assisted feeding required as clinically indicated",
  "Mother needs support with expression of breast milk",
];
const growFlags = [
  "Persistent feeding difficulty despite breastfeeding support",
  "Poor/no weight gain",
  "SAM identified",
];
const followUpItems = [
  "Weight and relevant growth information recorded",
  "Individualized feeding plan documented",
  "Follow-up date and place fixed",
  "Next point of care documented",
  "Community team (ASHA · ANM · AWW) informed — handover done",
];

function YesNoField({ legend, hint, value, onChange }: { legend: string; hint?: string; value: YesNo; onChange: (v: YesNo) => void }) {
  return (
    <fieldset>
      <legend className="font-semibold">{legend}</legend>
      {hint && <p className="text-sm text-muted">{hint}</p>}
      <div className="clay-inset mt-3 inline-flex gap-1 !rounded-full p-1">
        {(["yes", "no"] as const).map((v) => (
          <label key={v} className={cn("cursor-pointer rounded-full px-5 py-2 text-sm font-semibold capitalize text-ink-2 transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-[var(--ring)]", value === v && "clay-sm !rounded-full text-[var(--ring)]")}>
            <input type="radio" className="sr-only" checked={value === v} onChange={() => onChange(v)} name={legend} />
            {v}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Checks({ items, state, toggle, tone }: { items: string[]; state: Set<string>; toggle: (s: string) => void; tone: string }) {
  return (
    <ul className={cn("mt-3 grid gap-2", `tone-${tone}`)}>
      {items.map((i) => {
        const on = state.has(i);
        return (
          <li key={i}>
            <label className={cn("flex cursor-pointer items-start gap-3 rounded-2xl px-4 py-3 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-[var(--ring)]", on ? "bg-tone-soft text-ink" : "bg-sunken text-ink-2")}>
              <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(i)} />
              <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2", on ? "border-tone bg-tone text-white" : "border-[var(--muted)]")} aria-hidden>
                {on && <CircleCheck className="size-4" />}
              </span>
              {i}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

const useSet = () => {
  const [s, set] = useState<Set<string>>(new Set());
  const toggle = (k: string) => set((p) => { const n = new Set(p); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  return [s, toggle, () => set(new Set())] as const;
};

/**
 * Walks the Section 6 checklist and suggests the Section 5 route.
 * A teaching aid for the guideline's logic — not a clinical decision tool.
 */
export function DischargeCheck() {
  const [stable, setStable] = useState<YesNo>(null);
  const [bfOk, setBfOk] = useState<YesNo>(null);
  const [thermal, setThermal] = useState<YesNo>(null);
  const [feed, toggleFeed, resetFeed] = useSet();
  const [grow, toggleGrow, resetGrow] = useSet();
  const [fu, toggleFu, resetFu] = useSet();

  const result = useMemo(() => {
    if (stable === null || bfOk === null || thermal === null) return null;
    if (stable === "no") return { route: 0, title: "Continue SNCU care", tone: "sncu", body: "The infant is not yet clinically stable as per applicable protocol. Medical stabilisation comes first; repeat this check before discharge." };
    if (grow.size > 0)
      return { route: 3, title: "Route 3 — Clinical + nutritional assessment", tone: "nrc", body: "Arrange clinical and nutritional assessment (ANM/Medical Officer/Paediatrician, as applicable). Refer to NRC or another appropriate facility only if applicable admission/referral criteria are met, with counter-referral and ASHA + ANM + AWW follow-up planned." };
    if (bfOk === "no" || thermal === "yes")
      return {
        route: 2,
        title: "Route 2 — Feeding / transition support",
        tone: "clmc",
        body: [
          bfOk === "no" && "Link the mother–baby pair to the Breastfeeding/Lactation Counsellor and CLMC for assessment and hands-on support.",
          thermal === "yes" && "Shift to the designated Step-down Ward/Unit (where available) for temperature maintenance and transition care.",
          "Reassess feeding until breastfeeding is established, then discharge with follow-up.",
        ].filter(Boolean).join(" "),
      };
    return { route: 1, title: "Route 1 — Feeding adequate", tone: "sncu", body: "SNCU discharge → SNCU follow-up → ASHA + ANM + AWW community follow-up." };
  }, [stable, bfOk, thermal, grow]);

  const missing = followUpItems.filter((i) => !fu.has(i));
  const showNrcGuard = bfOk === "no" && grow.size === 0 && stable === "yes";

  const reset = () => { setStable(null); setBfOk(null); setThermal(null); resetFeed(); resetGrow(); resetFu(); };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr]">
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()} aria-label="Discharge assessment">
        <section className="clay tone-sncu p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-tone">Medical</p>
          <div className="mt-3"><YesNoField legend="Is the infant clinically stable as per applicable protocol?" value={stable} onChange={setStable} /></div>
        </section>

        <section className="clay tone-clmc p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-tone">Feed</p>
          <div className="mt-3"><YesNoField legend="Is breastfeeding established and effective?" value={bfOk} onChange={setBfOk} /></div>
          {bfOk === "no" && (
            <>
              <p className="mt-5 text-sm font-semibold">Which apply? <span className="font-normal text-muted">(Group A — for the feeding plan)</span></p>
              <Checks items={feedFlags} state={feed} toggle={toggleFeed} tone="clmc" />
            </>
          )}
        </section>

        <section className="clay tone-stepdown p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-tone">Transition</p>
          <div className="mt-3"><YesNoField legend="Does the infant need continued thermal/transition care?" hint="Support to maintain body temperature or transition to independent thermal stability (Group B)." value={thermal} onChange={setThermal} /></div>
        </section>

        <section className="clay tone-nrc p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-tone">Grow</p>
          <p className="mt-3 font-semibold">Any of these present? <span className="font-normal text-muted">(Group C)</span></p>
          <Checks items={growFlags} state={grow} toggle={toggleGrow} tone="nrc" />
        </section>

        <section className="clay tone-community p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-tone">Follow-up</p>
          <p className="mt-3 font-semibold">Before the infant leaves, is this done?</p>
          <Checks items={followUpItems} state={fu} toggle={toggleFu} tone="community" />
        </section>
      </form>

      <aside className="lg:sticky lg:top-28 lg:self-start" aria-live="polite">
        <div className="clay p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Suggested next point of care</p>
          {result ? (
            <div className={cn("mt-4 rounded-3xl bg-tone-soft p-5", `tone-${result.tone}`)}>
              <p className="font-display text-xl font-semibold text-tone">{result.title}</p>
              <p className="mt-2 leading-relaxed text-ink">{result.body}</p>
              {result.route > 0 && (
                <Link href="/pathway" className="mt-3 inline-block text-sm font-semibold text-tone underline-offset-4 hover:underline">See this route on the pathway →</Link>
              )}
            </div>
          ) : (
            <p className="clay-inset mt-4 p-5 text-ink-2">Answer the three yes/no questions to see the route.</p>
          )}

          {showNrcGuard && (
            <div className="mt-4 flex gap-3 rounded-2xl bg-[var(--tone-nrc-soft)] p-4 text-sm">
              <ShieldAlert className="size-5 shrink-0 text-[var(--tone-nrc)]" aria-hidden />
              <p>{importantNotice}</p>
            </div>
          )}

          {feed.size > 0 && (
            <div className="mt-5">
              <p className="text-sm font-semibold">Feeding plan should address</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-2">{[...feed].map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
          )}

          <div className="mt-5">
            <p className="text-sm font-semibold">Before discharge</p>
            {missing.length === 0 ? (
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-[var(--status-good-ink)]"><CircleCheck className="size-4" /> Documentation and handover complete</p>
            ) : (
              <ul className="mt-2 space-y-1.5 text-sm text-ink-2">
                {missing.map((m) => <li key={m} className="flex gap-2"><CircleAlert className="mt-0.5 size-4 shrink-0 text-[var(--status-act)]" aria-hidden /><span><span className="sr-only">To do: </span>{m}</span></li>)}
              </ul>
            )}
          </div>

          <div className="no-print mt-6 flex flex-wrap gap-3">
            <ClayButton type="button" onClick={() => window.print()}><Printer className="size-4" /> Print summary</ClayButton>
            <ClayButton type="button" variant="soft" onClick={reset}><RotateCcw className="size-4" /> Reset</ClayButton>
          </div>
        </div>
        <p className="mt-4 px-2 text-xs leading-relaxed text-muted">
          A teaching aid that mirrors the guideline&apos;s logic. It does not replace clinical judgement or the applicable state/NHM admission and referral criteria.
        </p>
      </aside>
    </div>
  );
}
