# Post-SNCU Linkage: SNCU · Step-down · CLMC · NRC

**One Baby — One Continuum of Care.**
A guideline explorer and monitoring dashboard for the *State Guidelines for Post-SNCU Discharge Follow-up, Breastfeeding Support & Referral of Newborns and Young Infants* (Uttar Pradesh, Draft for Review, 29 Sep 2026).

Built with Next.js 16, React 19, Tailwind CSS v4, lucide icons, Embla and Recharts, in a soft **claymorphism** design with **light and dark** modes.

## What's inside

| Page | What it does |
|---|---|
| **Home** `/` | Hero, moving key-message marquee, background and objectives, three-route pathway, auto-playing module carousel, dashboard snapshot, Health × ICDS convergence, FAQ |
| **Pathway** `/pathway` | Section 5 flowchart, eligibility groups A/B/C, key principles, handover, CLMC↔Step-down steps, follow-up → NRC chain |
| **Modules** `/modules` | One page each for SNCU, Step-down, CLMC, Lactation Counsellor, SNCU Follow-up, NRC and the Community team |
| **Discharge check** `/discharge-check` | Walk MEDICAL · FEED · GROW · TRANSITION · FOLLOW-UP and see the suggested route and documentation gaps (teaching aid) |
| **Roles** `/roles` | Responsibilities matrix and FEED · GROW · CHECK · REFER |
| **Dashboard** `/dashboard` | The 16 monthly data points as rates, cascades, trend and facility comparison; enter data or import/export CSV; data stays in your browser |
| **Guideline** `/guideline` | All 15 sections with a sticky table of contents, glossary and .docx download |

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |

Requires Node 20.9 or newer.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, go to **Add New → Project** and import the repo. Next.js is detected automatically, and no settings or environment variables are required.
3. Optional: set `NEXT_PUBLIC_SITE_URL` to your custom domain for canonical metadata.

Every page is statically prerendered, and there is no database.

## Using the dashboard

1. Open `/dashboard`. It starts on **Demo data**: illustrative numbers for six generic facilities.
2. Click **Add month** to enter a facility's monthly report, or **Template** then **Import CSV** to load many at once.
3. Your entries appear under **My data**. They are saved in this browser only, so use **Export CSV** to share them with the district or state team.
4. Filter by facility and month range. Status pills use adjustable review bands (≥90% on track, ≥75% watch), which are not guideline targets.

## Project structure

```
app/            routes and global styles (design tokens)
components/     ui/ (reusable clay kit) · layout/ · carousel/ · pathway/ · tools/ · dashboard/
lib/content/    guideline transcription, modules, supplementary content
lib/dashboard/  indicators, metrics, demo data, CSV, storage hook
memory-bank/    INDEX · PRD · TRD · DESIGNS · CHANGELOG · modules/
docs/source/    original guideline (.docx)
AGENT.md        rules for AI agents and contributors
```

## Content note

The guideline text is transcribed faithfully in `lib/content/guideline.ts`. Context added for programme teams (glossary, convergence with HBNC/HBYC, Poshan Tracker, MAA, VHSND, practice notes, FAQs) is marked **Supplementary**. The guideline uses **CLMC** (Comprehensive Lactation Management Centre), and so does the app.

This site summarises a draft guideline for programme teams. It is **not** a clinical decision tool. Clinical admission and referral criteria follow the latest approved Government of India and Uttar Pradesh protocols.
