import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CareModule } from "@/lib/content/modules";
import { Icon } from "./icon";
import { IconBadge } from "./icon-badge";
import { cn } from "@/lib/utils";

export function ModuleCard({ module: m, className }: { module: CareModule; className?: string }) {
  return (
    <Link
      href={`/modules/${m.slug}`}
      className={cn("clay group flex h-full flex-col gap-4 p-6 transition-transform duration-300 hover:-translate-y-1.5", `tone-${m.tone}`, className)}
    >
      <div className="flex items-start justify-between gap-3">
        <IconBadge tone={m.tone} size="lg">
          <Icon name={m.icon} className="size-7" />
        </IconBadge>
        <ArrowRight className="size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-tone" aria-hidden />
      </div>
      <div>
        <p className="font-display text-xl font-semibold">{m.name}</p>
        <p className="text-xs font-semibold uppercase tracking-wide text-tone">{m.fullName}</p>
      </div>
      <p className="text-sm leading-relaxed text-ink-2">{m.oneLiner}</p>
    </Link>
  );
}
