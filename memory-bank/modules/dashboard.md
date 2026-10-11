# Feature module: Linkage Dashboard

> Route `/dashboard` · guideline Section 13 · client component `components/dashboard/dashboard.tsx`

## Purpose
Turn the 16 monthly data points reported by the Breastfeeding/Lactation Counsellor at each Medical College/SNCU (Section 13.1) into a view of the whole continuum: discharge, feeding support, follow-up, referral, counter-referral and community linkage.

## Data sources
| Source | Where | Notes |
|---|---|---|
| Demo data | `lib/dashboard/demo-data.ts` | 6 generic facilities × 6 months (Apr–Sep 2026), seeded, labelled illustrative |
| My data | `localStorage` via `lib/dashboard/use-reports.ts` | Upsert by facility + month; edit, delete, clear all; never uploaded |

## Inputs
- **Add month** opens a native `<dialog>` form (`report-form.tsx`) with facility, district, month and the 16 counts grouped by stage. It shows live consistency warnings.
- **Import CSV** accepts the template columns; invalid rows are skipped with a message.
- **Template** downloads an empty CSV with the exact header.

## Views
1. Headline tiles: graduates, feeding difficulty identified, NRC/other referrals, community linkage.
2. Continuum rates: 8 derived ratios, each with a status pill and a numerator/denominator.
3. Discharge & feeding cascade (series-1) and follow-up & referral cascade (series-2).
4. Monthly trend: assessment coverage, follow-up attendance, referral completion.
5. By-facility table with status per rate.
6. All 16 data points table (accessible table view).
7. Data checks: child count greater than parent count.
8. My reports manager (My data only).

## Derived rates (`lib/dashboard/indicators.ts`)
| Key | Formula |
|---|---|
| assessmentCoverage | bfAssessed ÷ graduates |
| counsellingCoverage | counselled ÷ feedingDifficulty |
| feedingPlanCoverage | feedingPlan ÷ feedingDifficulty |
| bfEstablishedRate | bfEstablished ÷ feedingDifficulty |
| followUpRate | followUpAttended ÷ graduates |
| referralCompletion | referralCompleted ÷ nrcReferred |
| counterReferralRate | counterReferral ÷ referralCompleted |
| communityLinkage | communityLinked ÷ graduates |

Status bands: on track ≥ 0.90, watch ≥ 0.75, otherwise act (`thresholds`). These are **not** guideline targets; change them in one place.

## Extending
- New data point: add it to `dataPoints` (key, label, info, stage), the CSV header updates automatically, then add it to a cascade if relevant.
- New rate: add it to `rates`; the rate cards render it automatically.
- Shared backend (roadmap): replace `useMyReports` with an API-backed hook that keeps the same `MonthlyReport` shape.
