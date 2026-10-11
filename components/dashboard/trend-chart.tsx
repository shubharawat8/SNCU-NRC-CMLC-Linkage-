"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { monthLabel, pct } from "@/lib/dashboard/metrics";
import { TooltipShell } from "./chart-card";

export type TrendSeries = { key: string; label: string; color: string };

/**
 * Monthly rates (0–100%). ≤3 series in fixed categorical order, legend above
 * that carries each series' latest value, so identity never relies on colour.
 */
export function TrendChart({ data, series }: { data: Record<string, number | string | null>[]; series: TrendSeries[] }) {
  const last = data[data.length - 1];
  return (
    <div>
      <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-2" aria-label="Legend">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className="h-1 w-5 rounded-full" style={{ background: s.color }} aria-hidden />
            {s.label}
            {last?.[s.key] != null && <span className="tabular font-semibold text-ink">{pct(last[s.key] as number)}</span>}
          </li>
        ))}
      </ul>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
            <CartesianGrid vertical={false} stroke="var(--grid)" />
            <XAxis dataKey="month" tickFormatter={monthLabel} tickLine={false} axisLine={{ stroke: "var(--axis)" }} tick={{ fill: "var(--muted)", fontSize: 12 }} />
            <YAxis domain={[0, 1]} tickFormatter={(v) => `${Math.round(v * 100)}%`} tickLine={false} axisLine={false} tick={{ fill: "var(--muted)", fontSize: 12 }} width={48} />
            <Tooltip
              cursor={{ stroke: "var(--axis)", strokeDasharray: "4 4" }}
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <TooltipShell title={monthLabel(String(label))}>
                    <ul className="space-y-1">
                      {series.map((s) => {
                        const v = payload.find((p) => p.dataKey === s.key)?.value as number | null | undefined;
                        return (
                          <li key={s.key} className="flex items-center justify-between gap-4">
                            <span className="flex items-center gap-2 text-ink-2"><span className="size-2.5 rounded-full" style={{ background: s.color }} />{s.label}</span>
                            <span className="tabular font-semibold text-ink">{pct(v ?? null, 1)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </TooltipShell>
                );
              }}
            />
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                dot={{ r: 4, fill: s.color, stroke: "var(--surface)", strokeWidth: 2 }}
                activeDot={{ r: 6, stroke: "var(--surface)", strokeWidth: 2 }}
                connectNulls
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
