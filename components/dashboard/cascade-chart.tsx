"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fmt, pct } from "@/lib/dashboard/metrics";
import { TooltipShell } from "./chart-card";

export type CascadeRow = { label: string; value: number; of?: { label: string; value: number } };

/**
 * Horizontal cascade: one series, one hue, values labelled at the bar end.
 * Bars share a baseline so lengths compare directly.
 */
export function CascadeChart({ rows, color }: { rows: CascadeRow[]; color: string }) {
  const height = rows.length * 44 + 24;
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} layout="vertical" margin={{ top: 0, right: 56, bottom: 0, left: 0 }} barCategoryGap={10}>
          <CartesianGrid horizontal={false} stroke="var(--grid)" strokeWidth={1} />
          <XAxis type="number" hide domain={[0, "dataMax"]} />
          <YAxis type="category" dataKey="label" width={168} tickLine={false} axisLine={false} tick={{ fill: "var(--ink-2)", fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "var(--sunken)", radius: 8 }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const row = payload[0].payload as CascadeRow;
              return (
                <TooltipShell title={row.label}>
                  <p className="tabular text-ink">{fmt(row.value)} infants</p>
                  {row.of && <p className="text-muted">{pct(row.of.value ? row.value / row.of.value : null, 1)} of {row.of.label.toLowerCase()}</p>}
                </TooltipShell>
              );
            }}
          />
          <Bar dataKey="value" fill={color} radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={false}>
            <LabelList dataKey="value" position="right" formatter={(v) => fmt(Number(v))} style={{ fill: "var(--ink)", fontSize: 12, fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
