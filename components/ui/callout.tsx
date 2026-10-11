import { Info, TriangleAlert, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const kinds = {
  important: { icon: TriangleAlert, tone: "tone-nrc", label: "Important" },
  info: { icon: Info, tone: "tone-sncu", label: "Note" },
  tip: { icon: Lightbulb, tone: "tone-followup", label: "Tip" },
} as const;

export function Callout({ kind = "info", title, children, className }: { kind?: keyof typeof kinds; title?: string; children: React.ReactNode; className?: string }) {
  const k = kinds[kind];
  const I = k.icon;
  return (
    <div role="note" className={cn("clay-sm flex gap-4 p-5", k.tone, "bg-tone-soft", className)}>
      <I className="mt-0.5 size-6 shrink-0 text-tone" aria-hidden />
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-tone">{title ?? k.label}</p>
        <div className="mt-1 leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}
