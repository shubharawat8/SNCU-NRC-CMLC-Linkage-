# AGENT.md: Working Agreement for AI Agents and Contributors

This repo is a Next.js site and dashboard for the **State Guidelines for Post-SNCU Discharge Follow-up, Breastfeeding Support & Referral of Newborns and Young Infants** (SNCU · Step-down · CLMC · NRC; Uttar Pradesh draft, 29 Sep 2026).

## 1. Read first
1. `memory-bank/INDEX.md`: map of all project knowledge.
2. `memory-bank/PRD.md` (what and why), `memory-bank/TRD.md` (how), `memory-bank/DESIGNS.md` (look and feel).
3. The relevant `memory-bank/modules/*.md` for the area you are touching.

## 2. Golden rules
- **Content fidelity.** `lib/content/guideline.ts` mirrors the source `.docx`. Do not paraphrase clinical meaning, and do not invent criteria, targets, visit frequencies or statistics.
- **Mark additions.** Anything not in the guideline goes in `lib/content/enrichment.ts` or `practiceNotes`, and is rendered with `<SupplementaryBadge />`.
- **Say CLMC, not CMLC**, in all UI and content. The repo name is the only exception.
- **The NRC principle is sacred:** "breastfeeding not yet established, by itself, is not an automatic indication for NRC referral." Never weaken it in copy or logic.
- **No patient data and no server storage.** The dashboard stores aggregate counts in the viewer's browser only.
- **Demo data stays generic.** Never attach synthetic numbers to real facility or district names.

## 3. Code conventions
- TypeScript strict; import via `@/…`.
- Server components by default; add `"use client"` only for interactivity (state, effects, browser APIs).
- Build UI from `components/ui` primitives (`ClayCard`, `ClayButton`, `Badge`, `IconBadge`, …) before writing new markup.
- Colour comes from tokens only (`text-ink`, `bg-surface`, `tone-<name>` + `text-tone`/`bg-tone-soft`, `var(--series-n)`). No raw hex in components except inside `globals.css`.
- Icons: `lucide-react`. In content files, use names registered in `components/ui/icon.tsx`.
- Charts: follow `memory-bank/DESIGNS.md` §6. That means one axis, at most 3 series in fixed order, a status icon with a label, a tooltip and a table view.
- Wrap every `localStorage` access in try/catch.
- Respect `prefers-reduced-motion` for any new animation.

## 4. Before you push
```bash
npm run typecheck && npm run lint && npm run build
```
Then smoke-test light, dark and 390px mobile on the pages you touched.

## 5. Keep the memory bank current
In the same commit as your change:
- add a `memory-bank/CHANGELOG.md` entry;
- update PRD, TRD or DESIGNS if scope, architecture or visuals changed;
- update or add the `memory-bank/modules/<slug>.md` for any module you changed.

## 6. Common tasks
| Task | Where |
|---|---|
| Edit guideline text | `lib/content/guideline.ts` |
| Add or edit a care module | `lib/content/modules.ts` (the page is generated automatically) + `memory-bank/modules/` |
| Add a nav link | `components/layout/nav-links.ts` |
| Add a data point or rate | `lib/dashboard/indicators.ts` |
| Change review bands | `thresholds` in `lib/dashboard/indicators.ts` |
| Change a theme token | `app/globals.css` + DESIGNS.md |
