import { CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function CheckList({ items, className, tone = "sncu" }: { items: readonly string[]; className?: string; tone?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li key={item} className={cn("flex gap-3 leading-relaxed text-ink-2", `tone-${tone}`)}>
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-tone" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
