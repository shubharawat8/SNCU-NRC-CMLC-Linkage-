"use client";

import { useCallback, useEffect, useState } from "react";
import type { MonthlyReport } from "./indicators";

const KEY = "post-sncu-linkage.reports.v1";

const read = (): MonthlyReport[] => {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const write = (reports: MonthlyReport[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(reports));
    return true;
  } catch {
    return false;
  }
};

export const reportKey = (r: Pick<MonthlyReport, "facility" | "month">) => `${r.facility.trim().toLowerCase()}|${r.month}`;

/**
 * The viewer's own monthly reports, kept only in this browser (localStorage).
 * Nothing is sent to a server. Upserts by facility + month.
 */
export function useMyReports() {
  const [reports, setReports] = useState<MonthlyReport[]>([]);
  const [ready, setReady] = useState(false);
  const [persistError, setPersistError] = useState(false);

  useEffect(() => {
    // Reading browser storage must happen after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReports(read());
    setReady(true);
  }, []);

  const commit = useCallback((next: MonthlyReport[]) => {
    setReports(next);
    setPersistError(!write(next));
  }, []);

  const upsert = useCallback(
    (incoming: MonthlyReport[], replaceId?: string) => {
      const map = new Map(reports.filter((r) => r.id !== replaceId).map((r) => [reportKey(r), r]));
      for (const r of incoming) map.set(reportKey(r), { ...r, id: reportKey(r) });
      commit([...map.values()].sort((a, b) => a.month.localeCompare(b.month) || a.facility.localeCompare(b.facility)));
    },
    [reports, commit],
  );

  const remove = useCallback((id: string) => commit(reports.filter((r) => r.id !== id)), [reports, commit]);
  const clear = useCallback(() => commit([]), [commit]);

  return { reports, ready, persistError, upsert, remove, clear };
}
