import { cn } from "@/lib/utils";

export function StatTile({ label, value, hint, tone = "sncu", icon, className }: { label: string; value: React.ReactNode; hint?: React.ReactNode; tone?: string; icon?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("clay-sm flex flex-col gap-2 p-5", `tone-${tone}`, className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink-2">{label}</p>
        {icon && <span className="text-tone">{icon}</span>}
      </div>
      <p className="font-display text-3xl font-semibold text-ink">{value}</p>
      {hint && <div className="text-xs text-muted">{hint}</div>}
    </div>
  );
}
