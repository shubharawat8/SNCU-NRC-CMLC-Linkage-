# TRD: Technical Requirements

## 1. Stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** (App Router), React 19 | All routes are statically prerendered (SSG) |
| Language | TypeScript 5.9 (strict) | Path alias `@/*` points to the repo root |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) | Tokens and clay utilities live in `app/globals.css` |
| Theming | `next-themes` (`attribute="data-theme"`) | light / dark / system; Tailwind `dark:` variant is bound to `[data-theme=dark]` |
| Icons | `lucide-react` | Content files reference icons by name through `components/ui/icon.tsx` |
| Carousel | `embla-carousel-react` + autoplay plugin | Plus a CSS-only `Marquee` for the continuous moving strip |
| Charts | `recharts` 3 | Custom clay tooltips; colours come from CSS variables |
| Fonts | `next/font/google`: Plus Jakarta Sans (body), Fredoka (display) | Self-hosted at build time |
| Lint | ESLint 9 flat config + `eslint-config-next` | `npm run lint` |
| Hosting | Vercel | Zero configuration |

## 2. Directory layout

```
app/                      routes (App Router)
  layout.tsx              fonts, metadata, ThemeProvider, Navbar, Footer
  globals.css             design tokens, clay utilities, motion, print
  page.tsx                home
  pathway/ modules/ modules/[slug]/ discharge-check/ roles/ dashboard/ guideline/
components/
  ui/                     reusable primitives (ClayCard, ClayButton, Badge, IconBadge, Callout, CheckList,
                          SectionHeader, PageHeader, StatTile, StepChain, NumberedSteps, ModuleCard, FaqList, Icon)
  layout/                 Navbar, Footer, ThemeToggle, ThemeProvider, Logo, nav-links
  carousel/               Carousel (Embla), Marquee (CSS)
  pathway/                PathwayFlow (Section 5 diagram)
  tools/                  DischargeCheck (client)
  dashboard/              Dashboard, CascadeChart, TrendChart, ReportForm, StatusPill, ChartCard
lib/
  content/guideline.ts    faithful transcription of the guideline
  content/modules.ts      care-level module definitions
  content/enrichment.ts   supplementary glossary, convergence, FAQs, highlights
  dashboard/indicators.ts 16 data points, derived rates, thresholds, consistency rules
  dashboard/metrics.ts    sum, rates, formatting, grouping
  dashboard/demo-data.ts  seeded synthetic data (deterministic)
  dashboard/csv.ts        CSV import/export
  dashboard/use-reports.ts localStorage-backed hook
docs/source/              original .docx
public/guideline.docx     downloadable copy
memory-bank/              PRD, TRD, DESIGNS, CHANGELOG, modules/
```

## 3. Data model

```ts
type MonthlyReport = {
  id: string;          // `${facility.toLowerCase()}|${month}` for user data
  facility: string;
  district: string;
  month: string;       // YYYY-MM
  values: Record<DataKey, number>; // the 16 Section 13.1 data points
};
```

The 16 keys, in order: `graduates, bfAssessed, feedingDifficulty, counselled, feedingPlan, stepDown, clmcLinked, bfEstablished, followUpAttended, fuFeedingDifficulty, poorWeightGain, samIdentified, nrcReferred, referralCompleted, counterReferral, communityLinked`.

**Derived rates** (`lib/dashboard/indicators.ts → rates`) are numerator over denominator, shown as `null`/"—" when the denominator is 0.

**Consistency rules** flag a child count that exceeds its parent count (for example *assessed > graduates*). They warn but never block saving.

**CSV** columns are `month,district,facility,` followed by the 16 keys. RFC-4180 quoting is supported. Invalid rows are skipped and reported.

## 4. Storage and privacy

- "My data" lives in `localStorage["post-sncu-linkage.reports.v1"]`. Every access is wrapped in try/catch, and the UI warns when storage is blocked.
- Nothing is sent to any server. There are no analytics, cookies or patient-level data.
- Demo data is generated deterministically (seeded PRNG), so the server and client render identically.

## 5. Rendering

- Content pages are server components. Client components are limited to the navbar, theme toggle, carousel, discharge check and dashboard.
- `/modules/[slug]` uses `generateStaticParams` with `dynamicParams = false`.
- The theme toggle uses `useSyncExternalStore` to avoid a hydration mismatch. The carousel respects `prefers-reduced-motion` the same way.

## 6. Quality gates (run before every push)

```bash
npm run typecheck
npm run lint
npm run build
```

Manual smoke test: light, dark and mobile (390px) for `/`, `/pathway`, `/dashboard`, `/discharge-check`; add a report, import a CSV, toggle the theme.

## 7. Deployment (Vercel)

1. Import the GitHub repo in Vercel. The framework is auto-detected as Next.js and the defaults work (build `next build`, output `.next`).
2. Optional env var `NEXT_PUBLIC_SITE_URL` sets the canonical URL for metadata. If unset, it falls back to `VERCEL_PROJECT_PRODUCTION_URL`.
3. Node 20.9 or newer (see `engines`).
