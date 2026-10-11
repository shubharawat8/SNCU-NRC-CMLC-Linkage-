# PRD: Post-SNCU Linkage (SNCU · Step-down · CLMC · NRC)

## 1. Problem

Some SNCU infants are medically stable but are still not ready to go home. Breastfeeding may not be established, the infant may need help with warmth, or growth may falter after discharge. The state draft guideline (*Post-SNCU Discharge Follow-up, Breastfeeding Support & Referral of Newborns and Young Infants*, 29 Sep 2026) sets out a pathway that links SNCU, Step-down care, CLMC/Breastfeeding Counsellors, NRC and community follow-up.

A Word document is hard to use as an operational reference, and there is nowhere to see whether the continuum is actually working month to month.

## 2. Users

| Persona | Needs |
|---|---|
| State / district programme officers (NHM, ICDS, development partners) | Understand the pathway quickly, brief others, review monthly performance across facilities |
| SNCU / Medical College teams (paediatricians, nurses, MOs) | Know the discharge checklist and the next point of care for each route |
| Breastfeeding / Lactation Counsellors | Know their role at each point of care; compile and share the 16 monthly data points |
| Step-down, CLMC and NRC staff | Understand where infants come from, where they go next and what to record |
| Frontline workers' supervisors (ANM, CHO, ICDS supervisors) | FEED · GROW · CHECK · REFER guidance; convergence with HBNC/HBYC, VHSND and Poshan Tracker |

## 3. Goals

1. Make every section of the guideline easy to find and read on a phone or a projector.
2. Make the **three-route pathway** and the key principle ("breastfeeding not established ≠ automatic NRC referral") impossible to miss.
3. Give each level of care a page of its own (module) covering its role, inputs, outputs, monitoring and records.
4. Provide a **monitoring dashboard** for the Section 13.1 data set: enter, import and export data, see rates, cascades, trends and facility comparisons.
5. Work well when deployed to Vercel with no backend, no login and no data leaving the browser.

**Non-goals (v1):** clinical decision support, patient-level records, server-side storage, authentication, Hindi UI. Hindi is on the roadmap.

## 4. Features

| # | Feature | Route | Source sections |
|---|---|---|---|
| F1 | Home: hero, moving key-message marquee, background and objectives, pathway preview, module carousel, dashboard teaser, Health × ICDS convergence, FAQ | `/` | 1, 2, 4, 5, 13 |
| F2 | Pathway: interactive three-route flowchart, eligibility groups A/B/C, principles, handover, CLMC↔Step-down steps, follow-up→NRC chain | `/pathway` | 3, 4, 5, 8, 10 |
| F3 | Modules: index and 7 module pages, statically generated | `/modules`, `/modules/[slug]` | 7–13 |
| F4 | Discharge check: MEDICAL/FEED/GROW/TRANSITION/FOLLOW-UP walkthrough → suggested route, documentation gaps, printable summary | `/discharge-check` | 3, 5, 6 |
| F5 | Roles: responsibilities matrix and community FEED/GROW/CHECK/REFER | `/roles` | 11, 12 |
| F6 | Dashboard: demo data and "My data" (localStorage), add/edit/delete monthly reports, CSV import/export/template, filters, KPI tiles, 8 derived rates with status, two cascades, trend, facility table, full 16-point table, data checks, print | `/dashboard` | 13 |
| F7 | Guideline reader: all 15 sections with sticky TOC, glossary, .docx download | `/guideline` | 1–15 |
| F8 | Light, dark and system themes; responsive down to 360px; reduced-motion support | global | n/a |

## 5. Content rules

- Guideline text is transcribed faithfully. No new clinical criteria, targets or visit frequencies are invented.
- Anything added for context is marked **Supplementary**.
- Dashboard review bands (≥90% on track, ≥75% watch) are labelled as adjustable starting points, **not** guideline targets.
- Demo data uses generic facility names ("Demo Medical College 1") and is labelled as illustrative.

## 6. Success measures

- A new reader can explain the three routes and the NRC principle after 2 minutes on `/pathway`.
- A counsellor can enter a month's report in under 3 minutes and export a CSV.
- Lighthouse scores of 90 or more for accessibility and best practices; no horizontal scroll at 390px.

## 7. Roadmap

- Hindi (हिन्दी) toggle for all content.
- Optional shared backend (for example Vercel Postgres or Google Sheets) for district-level aggregation, behind authentication.
- District filter and a choropleth once real district data exists.
- Printable one-page module job-aids.
- Update content when the draft guideline is finalised.
