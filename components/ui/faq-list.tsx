import { ChevronDown } from "lucide-react";

/** Native <details> accordion — accessible and works without JS. */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {items.map((f) => (
        <details key={f.q} className="clay-sm group p-5 open:pb-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <ChevronDown className="mt-0.5 size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="mt-3 leading-relaxed text-ink-2">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
