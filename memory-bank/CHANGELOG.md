# Changelog

All notable changes are recorded here, newest first. Format: [Keep a Changelog](https://keepachangelog.com/). Versioning: SemVer.

## [1.0.0] — 2026-10-11

### Added
- Next.js 16 App Router project with TypeScript, Tailwind CSS v4 and a claymorphism design system (light, dark and system themes via `next-themes`).
- Content layer transcribed from *SNCU_CMLC_NRC_LINKAGE_Guideline_29_Sep_2026.docx* (`lib/content/guideline.ts`), plus supplementary context (glossary, Health × ICDS convergence, FAQs) clearly badged.
- Pages: Home (hero, moving marquee, module carousel, dashboard teaser, convergence, FAQ), Pathway, Modules index and 7 module pages, Discharge check, Roles, Dashboard, Guideline reader with TOC and .docx download, 404.
- Linkage dashboard: demo data and browser-local "My data", monthly report form with consistency warnings, CSV import/export/template, facility and month filters, KPI tiles, 8 derived rates with status, discharge and referral cascades, monthly trend, facility table, 16-point table view, data checks, print.
- Reusable UI kit (`components/ui`), Embla carousel, CSS marquee, `PathwayFlow` diagram.
- Memory bank (INDEX, PRD, TRD, DESIGNS, CHANGELOG, modules/), root `AGENT.md` and `README.md`.

### Notes
- The guideline uses **CLMC**; the repository name uses "CMLC". The app uses CLMC throughout.
- Dashboard review bands (90% / 75%) are adjustable starting points, not guideline targets.
