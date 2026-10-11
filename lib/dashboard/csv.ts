import { dataPoints, emptyValues, type MonthlyReport } from "./indicators";

const header = ["month", "district", "facility", ...dataPoints.map((d) => d.key)];

const escape = (s: string) => (/[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);

export const toCsv = (reports: MonthlyReport[]) =>
  [header.join(","), ...reports.map((r) => [r.month, r.district, r.facility, ...dataPoints.map((d) => String(r.values[d.key]))].map(escape).join(","))].join("\n");

/** Minimal RFC-4180 line parser (quotes, escaped quotes, commas). */
const parseLine = (line: string): string[] => {
  const cells: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") { cells.push(cur); cur = ""; }
    else cur += c;
  }
  cells.push(cur);
  return cells.map((s) => s.trim());
};

export type CsvResult = { reports: MonthlyReport[]; errors: string[] };

export const fromCsv = (text: string): CsvResult => {
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.trim());
  const errors: string[] = [];
  if (!lines.length) return { reports: [], errors: ["File is empty."] };
  const cols = parseLine(lines[0]);
  const missing = header.filter((h) => !cols.includes(h));
  if (missing.length) return { reports: [], errors: [`Missing columns: ${missing.join(", ")}`] };
  const idx = (k: string) => cols.indexOf(k);
  const reports: MonthlyReport[] = [];
  lines.slice(1).forEach((line, i) => {
    const c = parseLine(line);
    const month = c[idx("month")];
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) { errors.push(`Row ${i + 2}: month must be YYYY-MM`); return; }
    const values = emptyValues();
    for (const d of dataPoints) {
      const n = Number(c[idx(d.key)]);
      if (!Number.isFinite(n) || n < 0) { errors.push(`Row ${i + 2}: ${d.key} must be a non-negative number`); return; }
      values[d.key] = Math.round(n);
    }
    const facility = c[idx("facility")] || "Unnamed facility";
    const district = c[idx("district")] || "—";
    reports.push({ id: `${facility}-${month}`, facility, district, month, values });
  });
  return { reports, errors };
};

export const downloadText = (filename: string, text: string, type = "text/csv") => {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
