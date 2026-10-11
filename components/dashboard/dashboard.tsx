"use client";

import { useMemo, useRef, useState } from "react";
import {
  Database, Download, FileSpreadsheet, FlaskConical, Pencil, Plus, Printer, Trash2, TriangleAlert, Upload,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ClayButton } from "@/components/ui/clay-button";
import { StatTile } from "@/components/ui/stat-tile";
import { Icon } from "@/components/ui/icon";
import { ChartCard } from "./chart-card";
import { CascadeChart, type CascadeRow } from "./cascade-chart";
import { TrendChart } from "./trend-chart";
import { StatusPill } from "./status-pill";
import { ReportForm } from "./report-form";
import { demoReports } from "@/lib/dashboard/demo-data";
import { dataPoints, rates, stageLabels, statusOf, thresholds, type DataKey, type MonthlyReport, type Values } from "@/lib/dashboard/indicators";
import { computeRates, consistencyIssues, fmt, groupBy, monthLabel, pct, sumValues } from "@/lib/dashboard/metrics";
import { downloadText, fromCsv, toCsv } from "@/lib/dashboard/csv";
import { useMyReports } from "@/lib/dashboard/use-reports";

type Source = "demo" | "mine";
const label = (k: DataKey) => dataPoints.find((d) => d.key === k)!.label;
const row = (v: Values, k: DataKey, of?: DataKey): CascadeRow => ({ label: label(k), value: v[k], of: of ? { label: label(of), value: v[of] } : undefined });

const trendSeries = [
  { key: "assessmentCoverage", label: "Assessed before discharge", color: "var(--series-1)" },
  { key: "followUpRate", label: "Attended SNCU follow-up", color: "var(--series-2)" },
  { key: "referralCompletion", label: "Referral completed", color: "var(--series-3)" },
];

const select = "clay-inset !rounded-full px-4 py-2 text-sm font-semibold text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring)]";

export function Dashboard() {
  const mine = useMyReports();
  const [source, setSource] = useState<Source>("demo");
  const [facility, setFacility] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<MonthlyReport | null>(null);
  const [importMsg, setImportMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const all = source === "demo" ? demoReports : mine.reports;
  const facilities = useMemo(() => [...new Set(all.map((r) => r.facility))].sort(), [all]);
  const months = useMemo(() => [...new Set(all.map((r) => r.month))].sort(), [all]);

  const filtered = useMemo(
    () => all.filter((r) => (facility === "all" || r.facility === facility) && (!from || r.month >= from) && (!to || r.month <= to)),
    [all, facility, from, to],
  );
  const totals = useMemo(() => sumValues(filtered), [filtered]);
  const r = useMemo(() => computeRates(totals), [totals]);

  const trend = useMemo(() => {
    const byMonth = groupBy(filtered, (x) => x.month);
    return Object.keys(byMonth).sort().map((m) => ({ month: m, ...computeRates(sumValues(byMonth[m])) }));
  }, [filtered]);

  const byFacility = useMemo(() => {
    const g = groupBy(filtered, (x) => x.facility);
    return Object.entries(g).map(([name, reps]) => {
      const v = sumValues(reps);
      return { name, district: reps[0].district, v, r: computeRates(v) };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [filtered]);

  const quality = useMemo(
    () => filtered.flatMap((rep) => consistencyIssues(rep.values).map((i) => ({ rep, ...i }))),
    [filtered],
  );

  const switchSource = (s: Source) => { setSource(s); setFacility("all"); setFrom(""); setTo(""); };

  const onImport = async (file: File) => {
    const { reports, errors } = fromCsv(await file.text());
    if (reports.length) { mine.upsert(reports); switchSource("mine"); }
    setImportMsg({ ok: errors.length === 0, text: `${reports.length} report(s) imported.${errors.length ? ` ${errors.length} row(s) skipped — ${errors.slice(0, 3).join("; ")}` : ""}` });
  };

  const empty = filtered.length === 0;

  return (
    <div className="space-y-8">
      {/* ── Toolbar ── */}
      <div className="clay no-print flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div role="radiogroup" aria-label="Data source" className="clay-inset flex gap-1 !rounded-full p-1">
            {([["demo", "Demo data", FlaskConical], ["mine", `My data (${mine.reports.length})`, Database]] as const).map(([v, l, I]) => (
              <button key={v} role="radio" aria-checked={source === v} onClick={() => switchSource(v)}
                className={cn("flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink-2", source === v && "clay-sm !rounded-full text-[var(--ring)]")}>
                <I className="size-4" aria-hidden />{l}
              </button>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <ClayButton onClick={() => { setEditing(null); setFormOpen(true); }}><Plus className="size-4" /> Add month</ClayButton>
            <ClayButton variant="soft" onClick={() => fileRef.current?.click()}><Upload className="size-4" /> Import CSV</ClayButton>
            <ClayButton variant="soft" onClick={() => downloadText(`post-sncu-linkage-${source}.csv`, toCsv(filtered))} disabled={empty}><Download className="size-4" /> Export CSV</ClayButton>
            <ClayButton variant="soft" onClick={() => downloadText("post-sncu-linkage-template.csv", toCsv([]))}><FileSpreadsheet className="size-4" /> Template</ClayButton>
            <ClayButton variant="ghost" onClick={() => window.print()} aria-label="Print dashboard"><Printer className="size-4" /></ClayButton>
            <input ref={fileRef} type="file" accept=".csv,text/csv" className="sr-only" tabIndex={-1} aria-hidden
              onChange={(e) => { const f = e.target.files?.[0]; if (f) onImport(f); e.target.value = ""; }} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3" aria-label="Filters">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-2">Facility
            <select value={facility} onChange={(e) => setFacility(e.target.value)} className={select}>
              <option value="all">All facilities ({facilities.length})</option>
              {facilities.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-2">From
            <select value={from} onChange={(e) => setFrom(e.target.value)} className={select}>
              <option value="">Earliest</option>
              {months.map((m) => <option key={m} value={m}>{monthLabel(m)}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-2">To
            <select value={to} onChange={(e) => setTo(e.target.value)} className={select}>
              <option value="">Latest</option>
              {months.map((m) => <option key={m} value={m}>{monthLabel(m)}</option>)}
            </select>
          </label>
        </div>
        {importMsg && (
          <p role="status" className={cn("rounded-2xl px-4 py-2 text-sm", importMsg.ok ? "bg-[var(--tone-community-soft)]" : "bg-[var(--tone-followup-soft)]")}>{importMsg.text}</p>
        )}
        {mine.persistError && <p role="alert" className="rounded-2xl bg-[var(--tone-nrc-soft)] px-4 py-2 text-sm">This browser blocked local storage — your entries will be lost when you leave the page. Export a CSV to keep them.</p>}
      </div>

      {source === "demo" ? (
        <p className="flex items-center gap-2 rounded-2xl border border-dashed border-[var(--muted)] px-4 py-3 text-sm text-ink-2">
          <FlaskConical className="size-4 shrink-0 text-[var(--ring)]" aria-hidden />
          <span>Illustrative demo data — synthetic numbers for six generic facilities. Switch to <strong>My data</strong> to enter or import real monthly reports.</span>
        </p>
      ) : (
        <p className="flex items-center gap-2 rounded-2xl border border-dashed border-[var(--muted)] px-4 py-3 text-sm text-ink-2">
          <Database className="size-4 shrink-0 text-[var(--ring)]" aria-hidden />
          <span>Your reports are stored only in this browser — nothing is uploaded. Export CSV to share with the district/state team.</span>
        </p>
      )}

      {empty ? (
        <div className="clay p-10 text-center">
          <p className="font-display text-xl font-semibold">{mine.ready || source === "demo" ? "No reports yet" : "Loading…"}</p>
          <p className="mt-2 text-ink-2">Add a monthly report or import a CSV (download the template for the exact columns).</p>
        </div>
      ) : (
        <>
          {/* ── Headline tiles ── */}
          <section aria-label="Headline numbers" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile label="SNCU graduates" value={fmt(totals.graduates)} tone="sncu" icon={<Icon name="hospital" className="size-5" />} hint={`${filtered.length} facility-month report(s)`} />
            <StatTile label="Feeding difficulty identified" value={fmt(totals.feedingDifficulty)} tone="clmc" icon={<Icon name="milk" className="size-5" />} hint={`${pct(totals.bfAssessed ? totals.feedingDifficulty / totals.bfAssessed : null)} of infants assessed`} />
            <StatTile label="Referred to NRC / other" value={fmt(totals.nrcReferred)} tone="nrc" icon={<Icon name="salad" className="size-5" />} hint={`${fmt(totals.samIdentified)} identified with SAM at follow-up`} />
            <StatTile label="Linked back to community" value={fmt(totals.communityLinked)} tone="community" icon={<Icon name="users" className="size-5" />} hint={`${fmt(totals.counterReferral)} counter-referrals received`} />
          </section>

          {/* ── Rates ── */}
          <section aria-labelledby="rates-h">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <h2 id="rates-h" className="font-display text-xl font-semibold">Continuum rates</h2>
              <p className="text-xs text-muted">Derived ratios · review bands: on track ≥ {thresholds.good * 100}%, watch ≥ {thresholds.watch * 100}% (adjustable starting points, not guideline targets)</p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {rates.map((x) => (
                <li key={x.key} className="clay-sm p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-ink-2">{x.label}</p>
                    <StatusPill status={statusOf(r[x.key])} />
                  </div>
                  <p className="mt-2 font-display text-3xl font-semibold">{pct(r[x.key])}</p>
                  <div className="clay-inset mt-3 h-2.5 !rounded-full" aria-hidden>
                    <div className="h-full rounded-full bg-[var(--series-1)]" style={{ width: `${Math.min(100, (r[x.key] ?? 0) * 100)}%` }} />
                  </div>
                  <p className="tabular mt-2 text-xs text-muted">{fmt(totals[x.num])} / {fmt(totals[x.den])} · {x.hint}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Cascades ── */}
          <div className="grid gap-6 xl:grid-cols-2">
            <ChartCard title="Discharge & feeding support" subtitle="SNCU discharge → Step-down & CLMC (Sections 13.2–13.3)">
              <CascadeChart color="var(--series-1)" rows={[
                row(totals, "graduates"), row(totals, "bfAssessed", "graduates"), row(totals, "feedingDifficulty", "bfAssessed"),
                row(totals, "counselled", "feedingDifficulty"), row(totals, "feedingPlan", "feedingDifficulty"), row(totals, "stepDown", "feedingDifficulty"),
                row(totals, "clmcLinked", "feedingDifficulty"), row(totals, "bfEstablished", "feedingDifficulty"),
              ]} />
            </ChartCard>
            <ChartCard title="Follow-up, referral & counter-referral" subtitle="SNCU follow-up → NRC linkage (Sections 13.4–13.5)">
              <CascadeChart color="var(--series-2)" rows={[
                row(totals, "followUpAttended"), row(totals, "fuFeedingDifficulty", "followUpAttended"), row(totals, "poorWeightGain", "followUpAttended"),
                row(totals, "samIdentified", "followUpAttended"), row(totals, "nrcReferred", "followUpAttended"), row(totals, "referralCompleted", "nrcReferred"),
                row(totals, "counterReferral", "referralCompleted"),
              ]} />
            </ChartCard>
          </div>

          {/* ── Trend ── */}
          {trend.length > 1 && (
            <ChartCard title="Monthly trend" subtitle="Three continuum rates by reporting month · legend shows the latest month">
              <TrendChart data={trend} series={trendSeries} />
            </ChartCard>
          )}

          {/* ── Facility table ── */}
          <ChartCard title="By facility" subtitle="Rates for the selected period">
            <div className="-mx-2 overflow-x-auto">
              <table className="w-full min-w-[56rem] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted">
                  <tr>
                    <th scope="col" className="px-3 py-2">Facility</th>
                    <th scope="col" className="px-3 py-2 text-right">Graduates</th>
                    {rates.filter((x) => ["assessmentCoverage", "feedingPlanCoverage", "followUpRate", "referralCompletion", "counterReferralRate", "communityLinkage"].includes(x.key)).map((x) => (
                      <th key={x.key} scope="col" className="px-3 py-2">{x.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {byFacility.map((f) => (
                    <tr key={f.name} className="border-t border-line">
                      <th scope="row" className="px-3 py-3 font-semibold">{f.name}<span className="block text-xs font-normal text-muted">{f.district}</span></th>
                      <td className="tabular px-3 py-3 text-right">{fmt(f.v.graduates)}</td>
                      {(["assessmentCoverage", "feedingPlanCoverage", "followUpRate", "referralCompletion", "counterReferralRate", "communityLinkage"] as const).map((k) => (
                        <td key={k} className="px-3 py-3">
                          <span className="tabular mr-2 font-semibold">{pct(f.r[k])}</span>
                          <StatusPill status={statusOf(f.r[k])} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartCard>

          {/* ── Full data table (table view of every chart) ── */}
          <ChartCard title="All 16 data points" subtitle="Totals for the selected facilities and months (Section 13.1)">
            <div className="grid gap-5 md:grid-cols-2">
              {Object.entries(stageLabels).map(([stage, title]) => (
                <table key={stage} className="clay-inset w-full self-start text-sm">
                  <caption className="px-4 pt-3 text-left text-xs font-bold uppercase tracking-[0.18em] text-[var(--ring)]">{title}</caption>
                  <tbody>
                    {dataPoints.filter((d) => d.stage === stage).map((d) => (
                      <tr key={d.key} className="border-t border-line first:border-0">
                        <th scope="row" className="px-4 py-2 text-left font-medium text-ink-2">{d.label}</th>
                        <td className="tabular px-4 py-2 text-right font-semibold">{fmt(totals[d.key])}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
          </ChartCard>

          {/* ── Data quality ── */}
          {quality.length > 0 && (
            <ChartCard title="Data checks" subtitle="Counts that exceed the count they belong to">
              <ul className="space-y-2 text-sm">
                {quality.slice(0, 20).map((q, i) => (
                  <li key={i} className="flex gap-2 text-ink-2">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[var(--status-watch)]" aria-hidden />
                    <span><strong className="text-ink">{q.rep.facility}</strong>, {monthLabel(q.rep.month)}: {label(q.child)} ({q.rep.values[q.child]}) &gt; {label(q.parent)} ({q.rep.values[q.parent]})</span>
                  </li>
                ))}
              </ul>
            </ChartCard>
          )}
        </>
      )}

      {/* ── Manage my data ── */}
      {source === "mine" && mine.reports.length > 0 && (
        <ChartCard title="My reports" subtitle="Stored in this browser" className="no-print"
          action={<ClayButton variant="ghost" onClick={() => { if (confirm("Delete all reports stored in this browser?")) mine.clear(); }}><Trash2 className="size-4" /> Clear all</ClayButton>}>
          <ul className="divide-y divide-[var(--line)]">
            {mine.reports.map((rep) => (
              <li key={rep.id} className="flex flex-wrap items-center gap-3 py-2.5 text-sm">
                <span className="font-semibold">{rep.facility}</span>
                <span className="text-muted">{rep.district} · {monthLabel(rep.month)}</span>
                <span className="tabular text-muted">{fmt(rep.values.graduates)} graduates</span>
                <span className="ml-auto flex gap-1">
                  <button className="rounded-full p-2 hover:bg-sunken" aria-label={`Edit ${rep.facility} ${rep.month}`} onClick={() => { setEditing(rep); setFormOpen(true); }}><Pencil className="size-4" /></button>
                  <button className="rounded-full p-2 hover:bg-sunken" aria-label={`Delete ${rep.facility} ${rep.month}`} onClick={() => mine.remove(rep.id)}><Trash2 className="size-4" /></button>
                </span>
              </li>
            ))}
          </ul>
        </ChartCard>
      )}

      <ReportForm open={formOpen} initial={editing} onClose={() => setFormOpen(false)} onSave={(rep) => { mine.upsert([rep], editing?.id); if (source !== "mine") switchSource("mine"); }} />
    </div>
  );
}
