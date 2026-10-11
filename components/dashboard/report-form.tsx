"use client";

import { useEffect, useRef, useState } from "react";
import { TriangleAlert, X } from "lucide-react";
import { dataPoints, emptyValues, stageLabels, type MonthlyReport, type Values } from "@/lib/dashboard/indicators";
import { consistencyIssues } from "@/lib/dashboard/metrics";
import { ClayButton } from "@/components/ui/clay-button";

const labelOf = (k: string) => dataPoints.find((d) => d.key === k)?.label ?? k;
const stages = [...new Set(dataPoints.map((d) => d.stage))];
const input = "clay-inset w-full !rounded-xl px-3 py-2 text-ink outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--ring)]";

/** Native <dialog> form for one facility-month of the Section 13.1 data set. */
export function ReportForm({ open, onClose, onSave, initial }: { open: boolean; onClose: () => void; onSave: (r: MonthlyReport) => void; initial?: MonthlyReport | null }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [facility, setFacility] = useState("");
  const [district, setDistrict] = useState("");
  const [month, setMonth] = useState("");
  const [values, setValues] = useState<Values>(emptyValues());

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      // Seed the form each time the dialog opens.
       
      setFacility(initial?.facility ?? "");
      setDistrict(initial?.district ?? "");
      setMonth(initial?.month ?? new Date().toISOString().slice(0, 7));
      setValues(initial?.values ?? emptyValues());
       
      d.showModal();
    }
    if (!open && d.open) d.close();
  }, [open, initial]);

  const issues = consistencyIssues(values);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: "", facility: facility.trim(), district: district.trim() || "—", month, values });
    onClose();
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="report-form-title"
      className="m-auto w-[min(56rem,calc(100vw-2rem))] max-h-[90dvh] overflow-y-auto rounded-[2rem] bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <form onSubmit={submit} className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="report-form-title" className="font-display text-2xl font-semibold">Monthly report</h2>
            <p className="text-sm text-muted">Section 13.1 data set · saved only in this browser</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="clay-sm grid size-10 place-items-center !rounded-full"><X className="size-5" /></button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-semibold">Facility (Medical College/SNCU)
            <input required value={facility} onChange={(e) => setFacility(e.target.value)} className={`${input} mt-1.5`} placeholder="e.g. District Hospital SNCU" />
          </label>
          <label className="text-sm font-semibold">District
            <input value={district} onChange={(e) => setDistrict(e.target.value)} className={`${input} mt-1.5`} />
          </label>
          <label className="text-sm font-semibold">Reporting month
            <input required type="month" value={month} onChange={(e) => setMonth(e.target.value)} className={`${input} mt-1.5`} />
          </label>
        </div>

        {stages.map((s) => (
          <fieldset key={s} className="mt-7">
            <legend className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--ring)]">{stageLabels[s]}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              {dataPoints.filter((d) => d.stage === s).map((d) => (
                <label key={d.key} className="text-sm">
                  <span className="font-semibold">{d.label}</span>
                  <span className="block text-xs text-muted">{d.info}</span>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    required
                    value={values[d.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [d.key]: Math.max(0, Math.round(Number(e.target.value) || 0)) }))}
                    className={`${input} tabular mt-1.5`}
                  />
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        {issues.length > 0 && (
          <div role="status" className="mt-6 rounded-2xl bg-[var(--tone-followup-soft)] p-4 text-sm">
            <p className="flex items-center gap-2 font-semibold"><TriangleAlert className="size-4 text-[var(--tone-followup)]" aria-hidden /> Please double-check</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2">
              {issues.map((i) => <li key={i.child}>{labelOf(i.child)} is higher than {labelOf(i.parent)}.</li>)}
            </ul>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <ClayButton type="button" variant="soft" onClick={onClose}>Cancel</ClayButton>
          <ClayButton type="submit">Save report</ClayButton>
        </div>
      </form>
    </dialog>
  );
}
