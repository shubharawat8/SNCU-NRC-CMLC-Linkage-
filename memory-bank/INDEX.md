# Memory Bank — Index

The memory bank is the project's long-term memory. Read it before changing the app; update it in the same commit as any change it describes.

| File | What it holds | Update when |
|---|---|---|
| [PRD.md](./PRD.md) | Product requirements: problem, users, goals, scope, features, success measures | Scope, audience or a feature changes |
| [TRD.md](./TRD.md) | Technical requirements: stack, architecture, data model, routes, quality gates, deployment | Dependencies, structure, data model or deployment change |
| [DESIGNS.md](./DESIGNS.md) | Claymorphism design system: tokens, components, data-viz rules, accessibility, motion | Any visual change, new component or token |
| [CHANGELOG.md](./CHANGELOG.md) | Dated record of what changed and why | Every change that ships |
| [modules/](./modules/) | One file per care-level module (SNCU, Step-down, CLMC, Counsellor, Follow-up, NRC, Community) plus the dashboard and discharge-check feature modules | That module's content or behaviour changes |

## Module files

**Care-level modules** (content comes from `lib/content/modules.ts`)

- [modules/sncu.md](./modules/sncu.md)
- [modules/step-down.md](./modules/step-down.md)
- [modules/clmc.md](./modules/clmc.md)
- [modules/breastfeeding-counsellor.md](./modules/breastfeeding-counsellor.md)
- [modules/sncu-follow-up.md](./modules/sncu-follow-up.md)
- [modules/nrc.md](./modules/nrc.md)
- [modules/community.md](./modules/community.md)

**Feature modules**

- [modules/dashboard.md](./modules/dashboard.md): monitoring dashboard (Section 13)
- [modules/discharge-check.md](./modules/discharge-check.md): pre-discharge assessment tool (Section 6)

## Source of truth

- Source document: `docs/source/SNCU_CLMC_NRC_Linkage_Guideline_29_Sep_2026.docx` (Draft for Review, 29 Sep 2026). It is also served at `/guideline.docx`.
- Transcribed content: `lib/content/guideline.ts`. Keep it faithful to the source.
- Supplementary context (glossary, convergence, FAQs, practice notes): `lib/content/enrichment.ts` and `practiceNotes` in `lib/content/modules.ts`. The UI always shows these with a **Supplementary** badge.

## Naming note

The guideline spells it **CLMC** (Comprehensive Lactation Management Centre). The repository name uses "CMLC". Inside the app, always use **CLMC**.
