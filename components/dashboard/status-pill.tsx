import { CircleAlert, CircleCheck, CircleMinus, TriangleAlert } from "lucide-react";
import type { Status } from "@/lib/dashboard/indicators";
import { cn } from "@/lib/utils";

const map = {
  good: { label: "On track", icon: CircleCheck, color: "var(--status-good)" },
  watch: { label: "Watch", icon: TriangleAlert, color: "var(--status-watch)" },
  act: { label: "Act", icon: CircleAlert, color: "var(--status-act)" },
  na: { label: "No data", icon: CircleMinus, color: "var(--muted)" },
} as const;

/** Status always pairs colour with an icon and a word — never colour alone. */
export function StatusPill({ status, className }: { status: Status; className?: string }) {
  const s = map[status];
  const I = s.icon;
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-sunken px-2.5 py-0.5 text-xs font-semibold text-ink-2", className)}>
      <I className="size-3.5" style={{ color: s.color }} aria-hidden />
      {s.label}
    </span>
  );
}
