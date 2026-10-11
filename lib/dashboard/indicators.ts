/**
 * The 16 monthly data points of Section 13.1, reported by the
 * Breastfeeding/Lactation Counsellor at each Medical College/SNCU.
 */
export const dataPoints = [
  { key: "graduates", label: "SNCU graduates", info: "Total number discharged during the reporting period.", stage: "discharge" },
  { key: "bfAssessed", label: "Breastfeeding assessment", info: "Number assessed for breastfeeding/feeding before discharge.", stage: "discharge" },
  { key: "feedingDifficulty", label: "Feeding difficulty", info: "Number identified with breastfeeding/feeding difficulty.", stage: "discharge" },
  { key: "counselled", label: "Breastfeeding counselling/support", info: "Number receiving counselling or hands-on support.", stage: "discharge" },
  { key: "feedingPlan", label: "Documented feeding plan", info: "Number provided a documented feeding plan at discharge.", stage: "discharge" },
  { key: "stepDown", label: "Step-down referral", info: "Number referred/shifted to Step-down Unit.", stage: "transition" },
  { key: "clmcLinked", label: "CLMC linkage", info: "Number linked with CLMC/Breastfeeding Counsellor.", stage: "transition" },
  { key: "bfEstablished", label: "Breastfeeding established", info: "Number successfully establishing breastfeeding before discharge/transfer, as applicable.", stage: "transition" },
  { key: "followUpAttended", label: "SNCU follow-up", info: "Number attending scheduled SNCU follow-up.", stage: "follow-up" },
  { key: "fuFeedingDifficulty", label: "Feeding difficulty at follow-up", info: "Number with persistent feeding difficulty.", stage: "follow-up" },
  { key: "poorWeightGain", label: "Poor/no weight gain", info: "Number identified with poor/no weight gain.", stage: "follow-up" },
  { key: "samIdentified", label: "SAM identified", info: "Number identified with SAM during follow-up.", stage: "follow-up" },
  { key: "nrcReferred", label: "NRC/other referral", info: "Number referred to NRC/appropriate facility.", stage: "referral" },
  { key: "referralCompleted", label: "Referral completion", info: "Number completing the referral.", stage: "referral" },
  { key: "counterReferral", label: "Counter-referral", info: "Number for whom counter-referral information is received.", stage: "referral" },
  { key: "communityLinked", label: "Community linkage", info: "Number linked back to ASHA/ANM/AWW for continued follow-up.", stage: "referral" },
] as const;

export type DataKey = (typeof dataPoints)[number]["key"];
export type Values = Record<DataKey, number>;

export type MonthlyReport = {
  id: string;
  facility: string;
  district: string;
  /** YYYY-MM */
  month: string;
  values: Values;
};

export const emptyValues = (): Values =>
  Object.fromEntries(dataPoints.map((d) => [d.key, 0])) as Values;

export const stageLabels: Record<string, string> = {
  discharge: "At SNCU discharge",
  transition: "Step-down & CLMC",
  "follow-up": "SNCU follow-up",
  referral: "Referral & counter-referral",
};

/**
 * Derived rates. The guideline lists data points, not targets or formulas —
 * these ratios are the dashboard's suggested reading of the data, and are
 * labelled as such in the UI.
 */
export const rates = [
  { key: "assessmentCoverage", label: "Assessed before discharge", num: "bfAssessed", den: "graduates", hint: "Breastfeeding assessment ÷ SNCU graduates" },
  { key: "counsellingCoverage", label: "Feeding difficulty counselled", num: "counselled", den: "feedingDifficulty", hint: "Counselling/support ÷ feeding difficulty" },
  { key: "feedingPlanCoverage", label: "Feeding plan documented", num: "feedingPlan", den: "feedingDifficulty", hint: "Documented feeding plan ÷ feeding difficulty" },
  { key: "bfEstablishedRate", label: "Breastfeeding established", num: "bfEstablished", den: "feedingDifficulty", hint: "Breastfeeding established ÷ feeding difficulty" },
  { key: "followUpRate", label: "Attended SNCU follow-up", num: "followUpAttended", den: "graduates", hint: "Follow-up attended ÷ SNCU graduates" },
  { key: "referralCompletion", label: "Referral completed", num: "referralCompleted", den: "nrcReferred", hint: "Referral completion ÷ NRC/other referral" },
  { key: "counterReferralRate", label: "Counter-referral received", num: "counterReferral", den: "referralCompleted", hint: "Counter-referral ÷ referral completion" },
  { key: "communityLinkage", label: "Linked back to community", num: "communityLinked", den: "graduates", hint: "Community linkage ÷ SNCU graduates" },
] as const satisfies readonly { key: string; label: string; num: DataKey; den: DataKey; hint: string }[];

export type RateKey = (typeof rates)[number]["key"];

/**
 * Review thresholds for status badges. Not from the guideline — a
 * configurable starting point for district review meetings.
 */
export const thresholds = { good: 0.9, watch: 0.75 } as const;

export type Status = "good" | "watch" | "act" | "na";

export const statusOf = (r: number | null): Status =>
  r === null ? "na" : r >= thresholds.good ? "good" : r >= thresholds.watch ? "watch" : "act";

/** Consistency rules: a child count should not exceed its parent count. */
export const consistencyRules: { child: DataKey; parent: DataKey }[] = [
  { child: "bfAssessed", parent: "graduates" },
  { child: "feedingDifficulty", parent: "bfAssessed" },
  { child: "counselled", parent: "feedingDifficulty" },
  { child: "feedingPlan", parent: "feedingDifficulty" },
  { child: "bfEstablished", parent: "feedingDifficulty" },
  { child: "followUpAttended", parent: "graduates" },
  { child: "referralCompleted", parent: "nrcReferred" },
  { child: "counterReferral", parent: "referralCompleted" },
];
