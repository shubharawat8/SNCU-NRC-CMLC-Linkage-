import { dataPoints, emptyValues, rates, consistencyRules, type MonthlyReport, type Values, type RateKey, type DataKey } from "./indicators";

export const sumValues = (reports: MonthlyReport[]): Values => {
  const total = emptyValues();
  for (const r of reports) for (const d of dataPoints) total[d.key] += r.values[d.key] ?? 0;
  return total;
};

export const ratio = (num: number, den: number): number | null => (den > 0 ? num / den : null);

export const computeRates = (v: Values): Record<RateKey, number | null> =>
  Object.fromEntries(rates.map((r) => [r.key, ratio(v[r.num], v[r.den])])) as Record<RateKey, number | null>;

export const pct = (r: number | null, digits = 0) => (r === null ? "—" : `${(r * 100).toFixed(digits)}%`);

export const fmt = (n: number) => new Intl.NumberFormat("en-IN").format(n);

export const groupBy = <T, K extends string>(items: T[], key: (t: T) => K) => {
  const out = {} as Record<K, T[]>;
  for (const it of items) (out[key(it)] ??= []).push(it);
  return out;
};

export const monthLabel = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
};

export const consistencyIssues = (v: Values): { child: DataKey; parent: DataKey }[] =>
  consistencyRules.filter((r) => v[r.child] > v[r.parent]);
