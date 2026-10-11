import type { MonthlyReport, Values } from "./indicators";

/**
 * Illustrative demo data only — generic facility names, synthetic numbers.
 * Deterministic (seeded) so server and client render identically.
 */
const facilities = [
  { facility: "Demo Medical College 1", district: "Demo District A", size: 120, quality: 0.95 },
  { facility: "Demo Medical College 2", district: "Demo District B", size: 95, quality: 0.86 },
  { facility: "Demo District Hospital 3", district: "Demo District C", size: 70, quality: 0.78 },
  { facility: "Demo Medical College 4", district: "Demo District D", size: 140, quality: 0.9 },
  { facility: "Demo District Hospital 5", district: "Demo District E", size: 55, quality: 0.7 },
  { facility: "Demo Medical College 6", district: "Demo District F", size: 105, quality: 0.82 },
];

export const demoMonths = ["2026-04", "2026-05", "2026-06", "2026-07", "2026-08", "2026-09"];

const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const build = (): MonthlyReport[] => {
  const rand = mulberry32(2026);
  const out: MonthlyReport[] = [];
  facilities.forEach((f, fi) => {
    demoMonths.forEach((month, mi) => {
      // quality improves gently month on month, with noise
      const q = Math.min(0.99, f.quality + mi * 0.012 + (rand() - 0.5) * 0.06);
      const take = (base: number, p: number) => Math.max(0, Math.min(base, Math.round(base * p)));
      const graduates = Math.round(f.size * (0.9 + rand() * 0.2));
      const bfAssessed = take(graduates, q + 0.03);
      const feedingDifficulty = take(bfAssessed, 0.24 + rand() * 0.08);
      const counselled = take(feedingDifficulty, q + 0.02);
      const feedingPlan = take(feedingDifficulty, q - 0.04);
      const stepDown = take(feedingDifficulty, 0.35 + rand() * 0.1);
      const clmcLinked = take(feedingDifficulty, q - 0.08);
      const bfEstablished = take(feedingDifficulty, q - 0.12);
      const followUpAttended = take(graduates, q - 0.14);
      const fuFeedingDifficulty = take(followUpAttended, 0.06 + rand() * 0.03);
      const poorWeightGain = take(followUpAttended, 0.05 + rand() * 0.03);
      const samIdentified = take(poorWeightGain, 0.3 + rand() * 0.2);
      const nrcReferred = Math.max(samIdentified, take(poorWeightGain, 0.5));
      const referralCompleted = take(nrcReferred, q - 0.1);
      const counterReferral = take(referralCompleted, q - 0.15);
      const communityLinked = take(graduates, q - 0.1);
      const values: Values = {
        graduates, bfAssessed, feedingDifficulty, counselled, feedingPlan, stepDown, clmcLinked, bfEstablished,
        followUpAttended, fuFeedingDifficulty, poorWeightGain, samIdentified, nrcReferred, referralCompleted,
        counterReferral, communityLinked,
      };
      out.push({ id: `demo-${fi}-${month}`, facility: f.facility, district: f.district, month, values });
    });
  });
  return out;
};

export const demoReports: MonthlyReport[] = build();
