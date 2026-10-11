import { cn } from "@/lib/utils";

export function ChartCard({ title, subtitle, children, className, action }: { title: string; subtitle?: React.ReactNode; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  return (
    <figure className={cn("clay flex flex-col p-5 sm:p-6", className)}>
      <figcaption className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg font-semibold">{title}</p>
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
        {action}
      </figcaption>
      {children}
    </figure>
  );
}

/** Shared clay tooltip shell for Recharts custom tooltips. */
export function TooltipShell({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="clay-sm min-w-44 !rounded-2xl p-3 text-sm">
      <p className="mb-1.5 font-semibold text-ink">{title}</p>
      {children}
    </div>
  );
}
